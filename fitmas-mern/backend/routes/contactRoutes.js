const express = require('express');
const { createContact, getAllContacts, getContactById, updateContactStatus, deleteContact } = require('../controllers/contactController');

const router = express.Router();

// Public routes
router.route('/')
  .post(createContact);

// Admin routes (would need authentication middleware)
router.route('/admin')
  .get(getAllContacts);

router.route('/admin/:id')
  .get(getContactById)
  .put(updateContactStatus)
  .delete(deleteContact);

module.exports = router;
