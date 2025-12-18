const express = require('express');
const { getAllPricing, getPricingById, createPricing, updatePricing, deletePricing } = require('../controllers/pricingController');

const router = express.Router();

router.route('/')
  .get(getAllPricing)
  .post(createPricing);

router.route('/:id')
  .get(getPricingById)
  .put(updatePricing)
  .delete(deletePricing);

module.exports = router;
