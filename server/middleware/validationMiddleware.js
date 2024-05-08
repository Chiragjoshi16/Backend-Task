// middleware/validationMiddleware.js

const Joi = require('joi');

// Define Joi schema for user registration payload validation
const userRegistrationSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
});

// Define Joi schema for adding new expense category payload validation
const addCategorySchema = Joi.object({
  name: Joi.string().required()
});

// Define Joi schema for adding new expense payload validation
const addExpenseSchema = Joi.object({
  title: Joi.string().required(),
  date: Joi.date().required(),
  amount: Joi.number().min(0).required(),
  categoryId: Joi.string().hex().length(24).required()
});

// Middleware function to validate request payload
const validatePayload = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    next();
  };
};

module.exports = {
  validateUserRegistration: validatePayload(userRegistrationSchema),
  validateAddCategory: validatePayload(addCategorySchema),
  validateAddExpense: validatePayload(addExpenseSchema)
};
