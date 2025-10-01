const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 20,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
    min: 3,
    max: 90,
    required: true,
  },
  desease: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 20,
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"Doctor",
  
    required: true,
  
  },
},{timestamps:true});

const Patient= mongoose.model("Patient", patientSchema);

module.exports = Patient;
