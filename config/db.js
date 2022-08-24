const { connect } = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await connect(
      "mongodb+srv://aniket2910:DgBNCSrqC3g1tLYQ@cluster0.hqr76ud.mongodb.net/todo-app?retryWrites=true&w=majority"
    );
    console.log("Connnected to MongoDB");
  } catch (e) {
    console.log(e);
  }
};

module.exports = { connectDB };
