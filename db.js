const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const dbInit = () => {
  const dbConnectionString = process.env.DB_CONNECTION_STRING;
  mongoose.connect(dbConnectionString, (error) => {
    if (error) {
      // eslint-disable-next-line no-console
      console.log({
        message: "connection error",
        error,
      });
    }
  });
};

module.exports = { dbInit };
