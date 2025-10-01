const { bool } = require("joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 20,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    min: 5,
    max: 100,
     unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 100,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default:false
  
  },
},{timestamps:true});

const User= mongoose.model("User", userSchema);

module.exports = User;
