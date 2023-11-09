const mongoose = require("mongoose");
const Register = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  // confirmpassword: {
  //   type: String,
  //   required: true,
  // },
  contactno: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("RegisterSchema", Register);
