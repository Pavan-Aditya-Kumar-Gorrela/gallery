const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  imageUrl: { type: String, required: true },
  uploadDate: { type: Date, default: Date.now },
  tags: [String]
});

module.exports = mongoose.model('Image', imageSchema);
