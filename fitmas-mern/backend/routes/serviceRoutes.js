const express = require('express');
const { getAllServices, getServiceBySlug, createService, updateService, deleteService } = require('../controllers/serviceController');

const router = express.Router();

router.route('/')
  .get(getAllServices)
  .post(createService);

router.route('/:slug')
  .get(getServiceBySlug);

router.route('/admin/:id')
  .put(updateService)
  .delete(deleteService);

module.exports = router;
