const Pricing = require('../models/Pricing');

// Get all pricing plans
exports.getAllPricing = async (req, res) => {
  try {
    const pricing = await Pricing.find({ isActive: true });
    res.json({ success: true, data: pricing });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get pricing plan by id
exports.getPricingById = async (req, res) => {
  try {
    const pricing = await Pricing.findById(req.params.id);
    if (!pricing) {
      return res.status(404).json({ success: false, message: 'Pricing plan not found' });
    }
    res.json({ success: true, data: pricing });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create new pricing plan
exports.createPricing = async (req, res) => {
  try {
    const pricing = await Pricing.create(req.body);
    res.status(201).json({ success: true, data: pricing });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Update pricing plan
exports.updatePricing = async (req, res) => {
  try {
    const pricing = await Pricing.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!pricing) {
      return res.status(404).json({ success: false, message: 'Pricing plan not found' });
    }
    res.json({ success: true, data: pricing });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete pricing plan
exports.deletePricing = async (req, res) => {
  try {
    const pricing = await Pricing.findByIdAndDelete(req.params.id);
    if (!pricing) {
      return res.status(404).json({ success: false, message: 'Pricing plan not found' });
    }
    res.json({ success: true, message: 'Pricing plan deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
