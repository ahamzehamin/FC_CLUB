const Blog = require('../models/Blog');
const User = require('../models/User');
const Content = require('../models/Content');

// @desc    Get dashboard statistics
// @route   GET /api/admin/dashboard/stats
// @access  Private (Admin only)
const getDashboardStats = async (req, res) => {
  try {
    // Get blog statistics
    const totalBlogs = await Blog.countDocuments();
    const publishedBlogs = await Blog.countDocuments({ status: 'published' });
    const draftBlogs = await Blog.countDocuments({ status: 'draft' });

    // Get content statistics
    const totalContents = await Content.countDocuments();
    const publishedContents = await Content.countDocuments({ status: 'published' });
    const draftContents = await Content.countDocuments({ status: 'draft' });

    // Get recent blogs
    const recentBlogs = await Blog.find()
      .populate('author', 'username profile.firstName profile.lastName')
      .sort({ createdAt: -1 })
      .limit(3)
      .select('title status createdAt viewCount');

    // Get recent content
    const recentContents = await Content.find()
      .populate('author', 'username profile.firstName profile.lastName')
      .sort({ createdAt: -1 })
      .limit(3)
      .select('title status createdAt');

    // Get total users
    const totalUsers = await User.countDocuments({ role: { $ne: 'admin' } });

    // Get blog views statistics (simplified - could be enhanced with analytics)
    const totalViews = await Blog.aggregate([
      { $group: { _id: null, totalViews: { $sum: '$viewCount' } } }
    ]);

    res.json({
      success: true,
      data: {
        blogs: {
          total: totalBlogs,
          published: publishedBlogs,
          drafts: draftBlogs
        },
        contents: {
          total: totalContents,
          published: publishedContents,
          drafts: draftContents
        },
        users: totalUsers,
        views: totalViews[0]?.totalViews || 0,
        recentBlogs,
        recentContents
      }
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

// @desc    Get all blogs for admin (with pagination and filters)
// @route   GET /api/admin/blogs
// @access  Private (Admin only)
const getBlogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Build filter object
    let filter = {};

    // Status filter
    if (req.query.status && req.query.status !== 'all') {
      filter.status = req.query.status;
    }

    // Search filter
    if (req.query.search) {
      filter.$or = [
        { title: { $regex: req.query.search, $options: 'i' } },
        { content: { $regex: req.query.search, $options: 'i' } },
        { excerpt: { $regex: req.query.search, $options: 'i' } }
      ];
    }

    // Category filter
    if (req.query.category) {
      filter.category = req.query.category;
    }

    // Author filter (if provided)
    if (req.query.author) {
      filter.author = req.query.author;
    }

    // Date range filter
    if (req.query.startDate || req.query.endDate) {
      filter.createdAt = {};
      if (req.query.startDate) {
        filter.createdAt.$gte = new Date(req.query.startDate);
      }
      if (req.query.endDate) {
        filter.createdAt.$lte = new Date(req.query.endDate);
      }
    }

    // Get blogs with filters
    const blogs = await Blog.find(filter)
      .populate('author', 'username profile.firstName profile.lastName')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Get total count for pagination
    const total = await Blog.countDocuments(filter);

    res.json({
      success: true,
      data: blogs,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get blogs error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

// @desc    Create a new blog
// @route   POST /api/admin/blogs
// @access  Private (Admin only)
const createBlog = async (req, res) => {
  try {
    const { title, content, excerpt, featuredImage, category, tags, status, seoTitle, seoDescription } = req.body;

    // Generate slug from title if not provided
    let slug = req.body.slug;
    if (!slug) {
      slug = title.toLowerCase()
        .replace(/[^a-zA-Z0-9\s]/g, '')
        .replace(/\s+/g, '-')
        .trim();
    }

    // Check if slug already exists
    const existingBlog = await Blog.findOne({ slug });
    if (existingBlog) {
      slug = `${slug}-${Date.now()}`;
    }

    const blog = await Blog.create({
      title,
      content,
      excerpt,
      featuredImage,
      slug,
      category: category || 'Fitness',
      tags: tags || [],
      status: status || 'draft',
      seoTitle,
      seoDescription,
      author: req.user._id
    });

    // Populate author info
    await blog.populate('author', 'username profile.firstName profile.lastName');

    res.status(201).json({
      success: true,
      message: 'Blog created successfully',
      data: blog
    });
  } catch (error) {
    console.error('Create blog error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

// @desc    Update a blog
// @route   PUT /api/admin/blogs/:id
// @access  Private (Admin only)
const updateBlog = async (req, res) => {
  try {
    const { title, content, excerpt, featuredImage, category, tags, status, seoTitle, seoDescription } = req.body;

    let slug = req.body.slug;

    // Generate new slug if title changed and slug not provided
    if (!slug && title) {
      slug = title.toLowerCase()
        .replace(/[^a-zA-Z0-9\s]/g, '')
        .replace(/\s+/g, '-')
        .trim();
    }

    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content,
        excerpt,
        featuredImage,
        slug,
        category,
        tags,
        status,
        seoTitle,
        seoDescription,
        updatedAt: new Date()
      },
      { new: true, runValidators: true }
    ).populate('author', 'username profile.firstName profile.lastName');

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }

    res.json({
      success: true,
      message: 'Blog updated successfully',
      data: blog
    });
  } catch (error) {
    console.error('Update blog error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

// @desc    Delete a blog
// @route   DELETE /api/admin/blogs/:id
// @access  Private (Admin only)
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
    }

    await Blog.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Blog deleted successfully'
    });
  } catch (error) {
    console.error('Delete blog error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

// @desc    Bulk update blogs
// @route   PUT /api/admin/blogs/bulk
// @access  Private (Admin only)
const bulkUpdateBlogs = async (req, res) => {
  try {
    const { blogIds, action, value } = req.body;

    if (!blogIds || !Array.isArray(blogIds) || blogIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Blog IDs are required'
      });
    }

    let updateData = {};

    switch (action) {
      case 'status':
        if (!['draft', 'published'].includes(value)) {
          return res.status(400).json({
            success: false,
            message: 'Invalid status value'
          });
        }
        updateData.status = value;
        break;

      case 'category':
        updateData.category = value;
        break;

      case 'delete':
        // Bulk delete
        const deleteResult = await Blog.deleteMany({ _id: { $in: blogIds } });
        return res.json({
          success: true,
          message: `${deleteResult.deletedCount} blogs deleted successfully`
        });

      default:
        return res.status(400).json({
          success: false,
          message: 'Invalid action'
        });
    }

    updateData.updatedAt = new Date();

    const result = await Blog.updateMany(
      { _id: { $in: blogIds } },
      updateData
    );

    res.json({
      success: true,
      message: `${result.modifiedCount} blogs updated successfully`
    });
  } catch (error) {
    console.error('Bulk update error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

// @desc    Get blog categories
// @route   GET /api/admin/blogs/categories
// @access  Private (Admin only)
const getCategories = async (req, res) => {
  try {
    const categories = await Blog.distinct('category');
    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

module.exports = {
  getDashboardStats,
  getBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  bulkUpdateBlogs,
  getCategories
};
