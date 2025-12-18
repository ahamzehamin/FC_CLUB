const express = require('express');
const { getAllBlogs, getBlogBySlug, getBlogsByCategory, createBlog, updateBlog, deleteBlog } = require('../controllers/blogController');

const router = express.Router();

router.route('/')
  .get(getAllBlogs)
  .post(createBlog);

router.route('/category/:category')
  .get(getBlogsByCategory);

router.route('/:slug')
  .get(getBlogBySlug);

router.route('/admin/:id')
  .put(updateBlog)
  .delete(deleteBlog);

module.exports = router;
