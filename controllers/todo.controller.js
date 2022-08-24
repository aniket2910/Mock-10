const { TodoModel } = require("../models/todo.model");

const getAllTodo = async (req, res) => {
  try {
    let user_id = req.user_data._id;
    let todos = await TodoModel.find(user_id, { delete: false });
    return res.status(200).json({ type: "success", data: todos });
  } catch (e) {
    return res.status(500).json({
      type: "error",
      message: "Internal Server Error",
    });
  }
};

const createTodo = async (req, res) => {
  try {
    let userId = req.user_data._id;
    let p = {
      ...req.body,
      userId,
    };
    let todo = await new TodoModel(p);
    todo.save((err, success) => {
      if (err) {
        return res
          .status(400)
          .json({ type: "error", message: "Something went wrong!" });
      }
      return res.status(201).json({
        type: "success",
        message: "Todo Created Successfully!",
      });
    });
  } catch (e) {
    return res.status(500).json({
      type: "error",
      message: "Internal Server Error",
    });
  }
};

const editTodo = async (req, res) => {
  try {
    const _id = req.params.id;
    const update_todo = await TodoModel.findByIdAndUpdate(_id, req.body);
    await update_todo.save();
    return res
      .status(200)
      .json({ type: "success", message: "Todo Updated Successfully" });
  } catch (e) {
    return res.status(500).json({
      type: "error",
      message: "Internal Server Error",
    });
  }
};

const deleteTodo = async (req, res) => {
  try {
    let _id = req.params.id;
    const delete_todo = await TodoModel.findByIdAndUpdate(_id, {
      delete: true,
    });
    await delete_todo.save();
    return res
      .status(200)
      .json({ type: "success", message: "Deleted Successfully" });
  } catch (e) {
    return res.status(500).json({
      type: "error",
      message: "Internal Server Error",
    });
  }
};

module.exports = { getAllTodo, editTodo, deleteTodo, createTodo };
