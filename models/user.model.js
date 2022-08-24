const { Schema, model } = require("mongoose");

const userSchema = Schema({
  name: String,
  email: { type: String, unique: true },
  password: {
    type: String,
  },
});

const UserModel = model("user", userSchema);

module.exports = { UserModel };
