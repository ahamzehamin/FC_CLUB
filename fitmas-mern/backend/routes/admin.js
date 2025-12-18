const express = require('express');
const {
  getDashboardStats,
  getBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  bulkUpdateBlogs,
  getCategories
} = require('../controllers/adminController');

const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// All admin routes require authentication and admin role
router.use(protect);
router.use(authorize('admin'));

// Dashboard routes
router.get('/dashboard/stats', getDashboardStats);

// Blog management routes
router.get('/blogs', getBlogs);
router.post('/blogs', createBlog);
router.put('/blogs/:id', updateBlog);
router.delete('/blogs/:id', deleteBlog);
router.put('/blogs/bulk', bulkUpdateBlogs);
router.get('/blogs/categories', getCategories);

module.exports = router;
