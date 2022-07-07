const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true, //validation
  },
  dateOfBirth: {
    type: Date,
  },
  mobile: {
    type: Number,
  },
  status: {
    type: Boolean,
  },
  password: {
    type: String,
    required: true, //validation
  },
  accountType: {
    type: String,
    default: "user",
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
