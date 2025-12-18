const Content = require('../models/Content');

// @desc    Get all content
// @route   GET /api/admin/content
// @access  Private/Admin
exports.getContents = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Build filter object
    const filter = {};
    if (req.query.status && req.query.status !== 'all') {
      filter.status = req.query.status;
    }
    if (req.query.category && req.query.category !== 'all') {
      filter.category = req.query.category;
    }

    // Search functionality
    if (req.query.search) {
      filter.$text = { $search: req.query.search };
    }

    // Sorting
    const sortOptions = {};
    if (req.query.sortBy) {
      const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;
      sortOptions[req.query.sortBy] = sortOrder;
    } else {
      sortOptions.createdAt = -1;
    }

    const contents = await Content.find(filter)
      .populate('author', 'username profile.firstName profile.lastName')
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)
      .select('-__v');

    const total = await Content.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);

    res.status(200).json({
      success: true,
      data: contents,
      pagination: {
        page,
        limit,
        total,
        pages: totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Get contents error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Get single content
// @route   GET /api/admin/content/:id
// @access  Private/Admin
exports.getContent = async (req, res) => {
  try {
    const content = await Content.findById(req.params.id)
      .populate('author', 'username profile.firstName profile.lastName');

    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'Content not found'
      });
    }

    res.status(200).json({
      success: true,
      data: content
    });
  } catch (error) {
    console.error('Get content error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Create new content
// @route   POST /api/admin/content
// @access  Private/Admin
exports.createContent = async (req, res) => {
  try {
    const contentData = {
      ...req.body,
      author: req.user._id,
      tags: req.body.tags ? req.body.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0) : []
    };

    const content = await Content.create(contentData);

    await content.populate('author', 'username profile.firstName profile.lastName');

    res.status(201).json({
      success: true,
      data: content,
      message: 'Content created successfully'
    });
  } catch (error) {
    console.error('Create content error:', error);
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Content with this slug already exists'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Update content
// @route   PUT /api/admin/content/:id
// @access  Private/Admin
exports.updateContent = async (req, res) => {
  try {
    const updateData = {
      ...req.body,
      tags: req.body.tags ? req.body.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0) : []
    };

    const content = await Content.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true
      }
    ).populate('author', 'username profile.firstName profile.lastName');

    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'Content not found'
      });
    }

    res.status(200).json({
      success: true,
      data: content,
      message: 'Content updated successfully'
    });
  } catch (error) {
    console.error('Update content error:', error);
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Content with this slug already exists'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// @desc    Delete content
// @route   DELETE /api/admin/content/:id
// @access  Private/Admin
exports.deleteContent = async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);

    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'Content not found'
      });
    }

    await Content.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Content deleted successfully'
    });
  } catch (error) {
    console.error('Delete content error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Bulk operations on content
// @route   PUT /api/admin/content/bulk
// @access  Private/Admin
exports.bulkUpdateContent = async (req, res) => {
  try {
    const { contentIds, action, value } = req.body;

    if (!contentIds || !Array.isArray(contentIds) || contentIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Content IDs are required'
      });
    }

    let updateData = {};
    let message = '';

    switch (action) {
      case 'publish':
        updateData = { status: 'published' };
        message = `${contentIds.length} content(s) published successfully`;
        break;
      case 'unpublish':
        updateData = { status: 'draft' };
        message = `${contentIds.length} content(s) moved to draft`;
        break;
      case 'trash':
        updateData = { status: 'trash' };
        message = `${contentIds.length} content(s) moved to trash`;
        break;
      case 'delete':
        await Content.deleteMany({ _id: { $in: contentIds } });
        return res.status(200).json({
          success: true,
          message: `${contentIds.length} content(s) deleted permanently`
        });
      default:
        return res.status(400).json({
          success: false,
          message: 'Invalid action'
        });
    }

    await Content.updateMany(
      { _id: { $in: contentIds } },
      updateData
    );

    res.status(200).json({
      success: true,
      message
    });
  } catch (error) {
    console.error('Bulk update content error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get content by slug (for public access)
// @route   GET /api/content/:slug
// @access  Public
exports.getContentBySlug = async (req, res) => {
  try {
    const content = await Content.findOne({
      slug: req.params.slug,
      status: 'published'
    }).populate('author', 'username profile.firstName profile.lastName');

    if (!content) {
      return res.status(404).json({
        success: false,
        message: 'Content not found'
      });
    }

    res.status(200).json({
      success: true,
      data: content
    });
  } catch (error) {
    console.error('Get content by slug error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get content categories
// @route   GET /api/admin/content/categories
// @access  Private/Admin
exports.getContentCategories = async (req, res) => {
  try {
    const categories = await Content.distinct('category', { status: { $ne: 'trash' } });

    res.status(200).json({
      success: true,
      data: categories
    });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};
