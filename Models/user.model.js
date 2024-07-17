const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    hashedPassword: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("users", userSchema);
