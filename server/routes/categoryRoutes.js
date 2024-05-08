// categoryRoutes.js

const express = require('express');
const router = express.Router();

// Import Category model
const Category = require('../models/Category');

// Route to get all expense categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route to add a new expense category
router.post('/', async (req, res) => {
  try {
    const { name } = req.body;

    // Validate input data
    if (!name) {
      return res.status(400).json({ message: "Please provide a category name" });
    }

    // Create a new category
    const newCategory = new Category({ name });
    await newCategory.save();

    res.status(201).json({ message: "Category created successfully", category: newCategory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route to delete an expense category
router.delete('/:categoryId', async (req, res) => {
  try {
    const { categoryId } = req.params;

    // Find and delete the category by ID
    await Category.findByIdAndDelete(categoryId);

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
