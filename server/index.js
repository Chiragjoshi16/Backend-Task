// index.js (or server.js, app.js)

const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables
const config = require('./config/config');

const validationMiddleware = require('./middleware/validationMiddleware');
const authMiddleware = require('./middleware/authMiddleware');

const app = express();

// Middleware
app.use(express.json());

// Routes
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const expenseRoutes = require('./routes/expenseRoutes'); // Import expenseRoutes
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/expenses', expenseRoutes); // Use expenseRoutes

// Connect to MongoDB

mongoose.connect(config.database.connectionString)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((error) => console.error("MongoDB connection error:", error));
