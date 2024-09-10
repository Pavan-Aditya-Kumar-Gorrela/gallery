require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const galleryRoutes = require('./routes/gallery');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads')); // Serve static files from the uploads directory

// Database connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.log('Database connection error: ', err);
});

// Routes
app.use('/api/gallery', galleryRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
