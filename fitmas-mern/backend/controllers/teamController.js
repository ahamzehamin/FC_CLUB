const Team = require('../models/Team');

// Get all team members
exports.getAllTeams = async (req, res) => {
  try {
    const teams = await Team.find({ isActive: true });
    res.json({ success: true, data: teams });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single team member by slug
exports.getTeamBySlug = async (req, res) => {
  try {
    const team = await Team.findOne({ slug: req.params.slug, isActive: true });
    if (!team) {
      return res.status(404).json({ success: false, message: 'Team member not found' });
    }
    res.json({ success: true, data: team });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create new team member
exports.createTeam = async (req, res) => {
  try {
    const team = await Team.create(req.body);
    res.status(201).json({ success: true, data: team });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Update team member
exports.updateTeam = async (req, res) => {
  try {
    const team = await Team.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!team) {
      return res.status(404).json({ success: false, message: 'Team member not found' });
    }
    res.json({ success: true, data: team });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete team member
exports.deleteTeam = async (req, res) => {
  try {
    const team = await Team.findByIdAndDelete(req.params.id);
    if (!team) {
      return res.status(404).json({ success: false, message: 'Team member not found' });
    }
    res.json({ success: true, message: 'Team member deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
