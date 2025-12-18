const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  position: {
    type: String,
    required: true
  },
  bio: {
    type: String
  },
  image: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  social: {
    twitter: String,
    linkedin: String,
    discord: String,
    facebook: String
  },
  specialization: [{
    type: String
  }],
  experience: String,
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Team', teamSchema);
