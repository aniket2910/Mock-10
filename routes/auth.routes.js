const { Router } = require("express");
const {
  signUpUser,
  loginUser,
  getUser,
} = require("../controllers/auth.controller");

const authRouter = Router();
authRouter.post("/signup", signUpUser);

authRouter.post("/login", loginUser);

authRouter.get("/user", getUser);

module.exports = { authRouter };
