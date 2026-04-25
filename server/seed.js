import mongoose from "mongoose";
import _ from "lodash";
import Users from "./src/models/user.model.js";
import config from "./src/config/config.js";

const users = [
  {
    firstName: "Mak",
    lastName: "Ovcina",
    email: "mak.ovcina@test.com",
    password: "12345678",
    role: "mentor",
  },
  {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@test.com",
    password: "12345678",
    role: "student",
  },
  {
    firstName: "Larry",
    lastName: "Bird",
    email: "harry.lattam@test.com",
    password: "12345678",
    role: "student",
  },
  {
    firstName: "paragon",
    lastName: "paragon",
    email: "paragon@paragon.ba",
    password: "Paragon202!",
    role: "admin",
  },

  {
    firstName: "Luka",
    lastName: "Ovcina",
    email: "luka.ovcina@test.com",
    password: "12345678",
    role: "mentor",
  },
];

const role = ["student", "mentor", "admin"];

for (let i = 0; i < 5; i++) {
  users.push({
    firstName: `user${i}`,
    lastName: `lastName${i}`,
    email: `user${i}@test.com`,
    password: "12345678",
    role: role[Math.floor(Math.random() * role.length)],
  });
}

const seedUsers = async () => {
  try {
    await mongoose.connect(config.mongoUri);
    console.log("MongoDB connected");

    await Users.deleteMany({});
    await Users.insertMany(users);
    console.log("Users inserted");

  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.connection.close();
  }
};

seedUsers();