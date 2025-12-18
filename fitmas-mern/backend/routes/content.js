const express = require('express');
const {
  getContents,
  getContent,
  createContent,
  updateContent,
  deleteContent,
  bulkUpdateContent,
  getContentBySlug,
  getContentCategories
} = require('../controllers/contentController');

const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/public/:slug', getContentBySlug);

// Admin routes (protected)
router.use(protect); // All routes below require authentication
router.use(authorize('admin', 'editor')); // Require admin or editor role

router.route('/')
  .get(getContents)
  .post(createContent);

router.get('/categories', getContentCategories);

router.put('/bulk', bulkUpdateContent);

router.route('/:id')
  .get(getContent)
  .put(updateContent)
  .delete(deleteContent);

module.exports = router;
