// expenseController.js

const Expense = require('../models/Expense');

// Controller function for adding a new expense
const addExpense = async (req, res) => {
  try {
    const { title, date, amount, categoryId } = req.body;

    // Create a new expense
    const newExpense = new Expense({
      title,
      date,
      amount,
      category: categoryId // Assuming categoryId is provided in the request body
    });

    // Save the expense to the database
    await newExpense.save();

    res.status(201).json({ message: "Expense added successfully", expense: newExpense });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller function for retrieving expenses
const getExpenses = async (req, res) => {
  try {
    // Retrieve all expenses from the database
    const expenses = await Expense.find();

    res.status(200).json(expenses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  addExpense,
  getExpenses
};
