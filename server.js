const express = require("express");

require("dotenv").config();

const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const { connectDB } = require("./config/db");
const { authRouter } = require("./routes/auth.routes");
const { todoRouter } = require("./routes/todo.routes");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/auth", authRouter);
app.use("/todos", todoRouter);

app.get("/", (req, res) => {
  res.send("Hello");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  try {
    connectDB();
    console.log(`Server is running on ${PORT}`);
  } catch (e) {
    console.log(e);
  }
});
