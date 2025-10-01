const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 20,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
    min: 25,
    max: 70,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 50,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
  },
  specialty: {
    type: String,
    minlength: 3,
    maxlength: 20,
    required: true,
    trim: true,
  },
  
},{timestamps:true});



const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;
