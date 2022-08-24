const { connect } = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await connect(process.env.monogoURL);
    console.log("Connnected to MongoDB");
  } catch (e) {
    console.log(e);
  }
};

module.exports = { connectDB };
