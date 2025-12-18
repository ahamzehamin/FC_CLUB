const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot be more than 200 characters']
  },
  content: {
    type: String,
    required: [true, 'Content is required']
  },
  excerpt: {
    type: String,
    maxlength: [500, 'Excerpt cannot be more than 500 characters']
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Author is required']
  },
  featuredImage: {
    type: String
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true
  },
  category: {
    type: String,
    default: 'Fitness'
  },
  tags: [{
    type: String,
    trim: true
  }],
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft'
  },
  seoTitle: {
    type: String,
    maxlength: [60, 'SEO title cannot be more than 60 characters']
  },
  seoDescription: {
    type: String,
    maxlength: [160, 'SEO description cannot be more than 160 characters']
  },
  viewCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

module.exports = mongoose.model('Blog', blogSchema);
