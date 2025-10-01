const Joi = require("joi");

// validate create 
const createdoctorSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().min(5).max(50).required(),
  age: Joi.number().min(25).max(70).required(),
  specialty: Joi.string().min(3).max(20).required(),
});

// validate update
const updatedoctorSchema = Joi.object({
  name: Joi.string().min(3).max(20).optional(),
  email: Joi.string().email().min(5).max(50).optional(),
  age: Joi.number().min(25).max(70).optional(),
  specialty: Joi.string().min(3).max(20).optional(),
});

function Validate(schema, data) {
  const { error } = schema.validate(data);
  if (error) return error.details[0].message;
  return null;
}

module.exports = { createdoctorSchema, updatedoctorSchema, Validate };
