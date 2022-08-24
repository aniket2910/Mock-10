const { Router } = require("express");
const {
  getAllTodo,
  createTodo,
  editTodo,
  deleteTodo,
} = require("../controllers/todo.controller");
const { requireAuth } = require("../middleware/requireAuth.middleware");
const todoRouter = Router();

todoRouter.get("/", requireAuth, getAllTodo);

todoRouter.post("/create", requireAuth, createTodo);

todoRouter.patch("/edit/:id", requireAuth, editTodo);

todoRouter.patch("/delete/:id", requireAuth, deleteTodo);

module.exports = { todoRouter };
