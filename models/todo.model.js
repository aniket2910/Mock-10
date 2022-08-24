const { Schema, model } = require("mongoose");

const todoSchema = Schema({
  name: String,
  tag: { enum: ["Personal", "Family", "Official"] },
  status: { enum: ["Pending", "Completed"] },
  userId: { type: String },
  delete: { type: Boolean, default: false },
});

const TodoModel = model("todo", todoSchema);

module.exports = { TodoModel };
