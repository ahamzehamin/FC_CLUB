const mongoose = require('mongoose');

const pricingSchema = new mongoose.Schema({
  planName: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true
  },
  duration: {
    type: String,
    default: 'month'
  },
  description: {
    type: String,
    required: true
  },
  features: [{
    type: String,
    required: true
  }],
  icon: {
    type: String,
    required: true
  },
  isPopular: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Pricing', pricingSchema);
