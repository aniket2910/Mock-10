const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user.model");

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res
      .status(401)
      .json({ type: "error", message: "You must logged in!" });
  }
  const token = authorization.split(" ")[1];
  jwt.verify(token, "SECRETKEY", (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ type: "error", message: "Please Re-Login" });
    }
    const { user_id } = decoded;
    UserModel.findById({ _id: user_id })
      .then((user) => {
        if (user == null) {
          return res
            .status(404)
            .json({ type: "error", message: "User not found!" });
        }
        req.user_data = user;
        next();
      })
      .catch((e) => {
        return res
          .status(404)
          .json({ type: "error", message: "Something Went Wrong!" });
      });
  });
};

module.exports = { requireAuth };
