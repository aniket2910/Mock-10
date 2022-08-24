const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { UserModel } = require("../models/user.model");
const signUpUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(400).json({
        type: "error",
        message: "User already Exist!",
      });
    }
    bcrypt.genSalt(5, function (err, salt) {
      bcrypt.hash(password, salt, function (err, hash) {
        if (err)
          return res
            .status(500)
            .json({ type: "error", message: "Something Went Wrong!" });

        const user = new UserModel({
          name,
          email,
          password: hash,
        });
        user.save((err, success) => {
          if (err) {
            return res
              .status(500)
              .json({ type: "error", message: "Something Went Wrong!" });
          } else {
            return res.status(201).json({
              type: "success",
              message: "User Registered Successfully!",
            });
          }
        });
      });
    });
  } catch (e) {
    return req.status(500).json({
      type: "error",
      message: "Internal Server Error",
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  //   console.log(email, password);
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      //   console.log(user);
      bcrypt.compare(password, user?.password, function (err, result) {
        if (err)
          return res
            .status(400)
            .json({ type: "warning", message: "Invalid Credentials" });
        if (result) {
          const token = jwt.sign(
            {
              name: user?.name,
              emal: user?.email,
              user_id: user?._id,
            },
            "SECRETKEY",
            {
              expiresIn: "1d",
            }
          );
          return res.status(200).json({
            type: "success",
            message: "User Login Successfully!",
            token,
          });
        } else {
          return res
            .status(400)
            .json({ type: "warning", message: "Invalid Credentials" });
        }
      });
    } else {
      return res
        .status(400)
        .json({ type: "warning", message: "Invalid Credentials" });
    }
  } catch (e) {
    return res.status(500).json({
      type: "error",
      message: "Internal Server Error",
    });
  }
};

const getUser = async (req, res) => {
  try {
    let _id = req.user_data._id;
    let user = await UserModel.find({ _id });
    return res.status(200).json({
      type: "success",
      data: user,
    });
  } catch (e) {
    return res.status(500).json({
      type: "error",
      message: "Internal Server Error",
    });
  }
};

module.exports = { signUpUser, loginUser, getUser };
