const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi); 

const createpatientSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  desease: Joi.string().min(3).max(20).required(),
  age: Joi.number().min(3).max(90).required(),
  doctor: Joi.objectId().required(),  
});

const updatepatientSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  desease: Joi.string().min(3).max(20),
  age: Joi.number().min(3).max(90),
  doctor: Joi.objectId(),
});

function Validate(schema, data) {
  const { error } = schema.validate(data);
  if (error) return error.details[0].message;
  return null;
}

module.exports = { createpatientSchema, updatepatientSchema, Validate };
