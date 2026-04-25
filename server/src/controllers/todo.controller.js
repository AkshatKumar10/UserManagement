import Todo from "../models/todo.model.js";
import dbErrorHandler from "./helpers/dbErrorHandler.js";

const create = async (req, res) => {
  try {
    const todo = new Todo({
      ...req.body,
      user: req.profile._id,
    });
    await todo.save();
    return res.status(200).json({
      message: "Task created successfully",
      todo,
    });
  } catch (err) {
    return res.status(400).json({
      error: dbErrorHandler.getErrorMessage(err),
    });
  }
};

const listByUser = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.profile._id }).sort("-created");
    res.json(todos);
  } catch (err) {
    return res.status(400).json({
      error: dbErrorHandler.getErrorMessage(err),
    });
  }
};

const update = async (req, res) => {
  try {
    let todo = req.todo;
    todo.completed = req.body.completed !== undefined ? req.body.completed : todo.completed;
    todo.text = req.body.text || todo.text;
    await todo.save();
    res.json(todo);
  } catch (err) {
    return res.status(400).json({
      error: dbErrorHandler.getErrorMessage(err),
    });
  }
};

const remove = async (req, res) => {
  try {
    let todo = req.todo;
    await todo.remove();
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    return res.status(400).json({
      error: dbErrorHandler.getErrorMessage(err),
    });
  }
};

const todoByID = async (req, res, next, id) => {
  try {
    const todo = await Todo.findById(id);
    if (!todo)
      return res.status(404).json({
        error: "Task not found",
      });
    req.todo = todo;
    next();
  } catch (err) {
    return res.status(400).json({
      error: "Could not retrieve task",
    });
  }
};

export default {
  create,
  listByUser,
  update,
  remove,
  todoByID,
};
