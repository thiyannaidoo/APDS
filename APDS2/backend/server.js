const express = require('express');
const connectDB = require('./config/db.js');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const helmet = require('helmet');

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000', //  React app URL
  credentials: true,
}));
app.use(morgan('dev')); // Log all requests to the console
app.use(helmet()); // Use Helmet to set secure HTTP headers

// Routes
app.use('/api/auth', require('./routes/authRoutes'));

// 404 Route Not Found
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// General Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server Error' });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server running on port ${PORT}'));