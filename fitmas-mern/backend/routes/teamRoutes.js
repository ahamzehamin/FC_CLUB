const express = require('express');
const { getAllTeams, getTeamBySlug, createTeam, updateTeam, deleteTeam } = require('../controllers/teamController');

const router = express.Router();

router.route('/')
  .get(getAllTeams)
  .post(createTeam);

router.route('/:slug')
  .get(getTeamBySlug);

router.route('/admin/:id')
  .put(updateTeam)
  .delete(deleteTeam);

module.exports = router;
