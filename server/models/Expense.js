// models/Expense.js

const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  amount: { type: Number, required: true },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }
});

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;
