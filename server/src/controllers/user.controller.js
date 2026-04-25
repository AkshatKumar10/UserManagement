/* eslint-disable no-underscore-dangle */
import jwt from "jsonwebtoken";
import _ from "lodash";
import User from "../models/user.model.js";
import dbErrorHandler from "./helpers/dbErrorHandler.js";
import config from "../config/config.js";

const createUser = (req, res, next) => {
  const user = new User(req.body);
  user.save((err, result) => {
    if (err) {
      res.send({ error: dbErrorHandler.getErrorMessage(err) });
    } else {
      res.send({ message: "Successfuly created a new user." });
    }
  });
};

const read = (req, res) => {
  User.findOne({ _id: req.profile.id }, (err, user) => {
    const token = jwt.sign(
      {
        _id: user._id,
        email: user.email,
        name: `${user.firstName} ${user.lastName}`,
        status: user.status,
        role: user.role,
      },
      config.secret
    );

    return res.send({
      token,
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        userImage: user.userImage,
      },
      message: "User found!",
    });
  });
};

const update = async (req, res, next) => {
  let user = req.profile;
  user = _.extend(user, req.body);

  await User.findOneAndUpdate({ _id: req.profile._id }, { ...user }).exec();

  return res.send({
    message: "Data updated",
    data: user,
    token: req.cookies.userJwtToken,
  });
};

const remove = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.profile.id },
    { status: "deactivated" }
  ).exec((err, user) => {
    if (user) {
      return res.send({ message: "Profile deleted" });
    } else {
      return res.send({ error: dbErrorHandler.getErrorMessage(err) });
    }
  });
};

const getUsers = (req, res) => {
  User.find({}, (error, user) => {
    const users = req.body.filterTerm
      ? user
          .filter(
            (item) =>
              (item.status === "active" &&
                ((
                  item.firstName.toLowerCase() +
                  " " +
                  item.lastName.toLowerCase()
                ).includes(req.body.filterTerm) ||
                  (
                    item.lastName.toLowerCase() +
                    " " +
                    item.firstName.toLowerCase()
                  ).includes(req.body.filterTerm))) ||
              (item.status === "active" &&
                item.email.toLowerCase().includes(req.body.filterTerm))
          )
          .slice(req.body.firstValue, req.body.lastValue)
      : req.body.role && req.body.accountStatus
      ? user
          .filter(
            (item) =>
              item.role === req.body.role &&
              item.status === req.body.accountStatus
          )
          .slice(req.body.firstValue, req.body.lastValue)
      : req.body.role
      ? user
          .filter((item) => item.role === req.body.role)
          .slice(req.body.firstValue, req.body.lastValue)
      : req.body.accountStatus
      ? user
          .filter((item) => item.status === req.body.accountStatus)
          .slice(req.body.firstValue, req.body.lastValue)
      : user.slice(req.body.firstValue, req.body.lastValue);

    if (error) {
      return res.send({ error: dbErrorHandler(error) });
    } else {
      return res.send({
        data: users,
        totalNumOfUsers:
          req.body.role && req.body.accountStatus
            ? user.filter(
                (item) =>
                  item.role === req.body.role &&
                  item.status === req.body.accountStatus
              ).length
            : req.body.filterTerm
            ? user.filter(
                (item) =>
                  (
                    item.firstName.toLowerCase() +
                    " " +
                    item.lastName.toLowerCase()
                  ).includes(req.body.filterTerm) ||
                  (
                    item.lastName.toLowerCase() +
                    " " +
                    item.firstName.toLowerCase()
                  ).includes(req.body.filterTerm)
              ).length
            : req.body.role
            ? user.filter((item) => item.role === req.body.role).length
            : req.body.accountStatus
            ? user.filter((item) => item.status === req.body.accountStatus)
                .length
            : user.length,
      });
    }
  });
};
const assignUserRole = (req, res, next) => {
  User.findOneAndUpdate({ _id: req.profile.id }, { role: req.body.role }).exec(
    (err, user) => {
      if (user) {
        return res.send({ message: "User role was updated" });
      } else {
        return res.send({ error: dbErrorHandler.getErrorMessage(err) });
      }
    }
  );
};

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Special Admin Check
    if (email === "admin@gmail.com" && password === "admin123") {
      const token = jwt.sign(
        {
          _id: "admin_id",
          email: "admin@gmail.com",
          name: "Admin User",
          role: "admin",
          status: "active",
        },
        config.secret
      );

      res.cookie("userJwtToken", token, { httpOnly: true });
      return res.json({
        token,
        user: {
          _id: "admin_id",
          firstName: "Admin",
          lastName: "User",
          email: "admin@gmail.com",
          role: "admin",
        },
        message: "Admin logged in successfully",
      });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: "User not found" });

    if (!user.authenticate(password)) {
      return res.status(401).send({ error: "Email and password don't match." });
    }

    if (user.status === "deactivated") {
      return res.status(401).json({ error: "Account deactivated" });
    }

    const role = user.role || "student";

    const token = jwt.sign(
      {
        _id: user._id,
        email: user.email,
        name: `${user.firstName} ${user.lastName}`,
        role: role,
        status: user.status,
      },
      config.secret
    );

    res.cookie("userJwtToken", token, { httpOnly: true });

    return res.json({
      token,
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: role,
        userImage: user.userImage,
      },
      message: "Logged in successfully",
    });
  } catch (err) {
    return res.status(401).json({ error: "Could not sign in" });
  }
};

const signout = (req, res) => {
  res.clearCookie("userJwtToken");
  return res.status(200).json({
    message: "signed out",
  });
};

const userByID = (req, res, next, id) => {
  if (id === "admin_id") {
    req.profile = {
      _id: "admin_id",
      firstName: "Admin",
      lastName: "User",
      email: "admin@gmail.com",
      role: "admin",
    };
    return next();
  }
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.json({ error: "User not found!" });
    }
    req.profile = user;
    next();
  });
};

export default {
  createUser,
  read,
  update,
  remove,
  getUsers,
  assignUserRole,
  userByID,
  signin,
  signout,
};
