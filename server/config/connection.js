const mongoose = require("mongoose");
const env = require('dotenv')

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/gamenonstop"
);

module.exports = mongoose.connection;
