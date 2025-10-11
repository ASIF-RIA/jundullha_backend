// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRouter = require('./routes/auth');
const bannerRouter = require('./routes/banner');

// Define constants
const PORT = 3000;
const DB = "mongodb+srv://jundullha:asif2003@cluster0.ysxz9bx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create Express app
const app = express();

// Middleware
app.use(cors()); // Allow requests from frontend (e.g., Flutter Web)
app.use(express.json()); // Parse incoming JSON
app.use('/api', authRouter); // Mount all routes under /api
app.use('/api', bannerRouter);

// Connect to MongoDB
mongoose.connect(DB)
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});
