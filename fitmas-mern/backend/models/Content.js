const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true
  },
  content: {
    type: String,
    required: [true, 'Content is required']
  },
  excerpt: {
    type: String,
    maxlength: [500, 'Excerpt cannot exceed 500 characters']
  },
  status: {
    type: String,
    enum: ['published', 'draft', 'private', 'trash'],
    default: 'draft'
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  metaTitle: {
    type: String,
    maxlength: [60, 'Meta title cannot exceed 60 characters']
  },
  metaDescription: {
    type: String,
    maxlength: [160, 'Meta description cannot exceed 160 characters']
  },
  featuredImage: {
    type: String
  },
  category: {
    type: String,
    default: 'page'
  },
  tags: [{
    type: String,
    trim: true
  }],
  order: {
    type: Number,
    default: 0
  },
  isHomepage: {
    type: Boolean,
    default: false
  },
  template: {
    type: String,
    default: 'default'
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Create slug from title before saving
contentSchema.pre('save', function(next) {
  if (this.isModified('title') && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9\s]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');
  }
  next();
});

// Index for search
contentSchema.index({ title: 'text', content: 'text', excerpt: 'text' });
contentSchema.index({ status: 1, createdAt: -1 });
contentSchema.index({ category: 1 });

// Virtual for reading time (approximate)
contentSchema.virtual('readingTime').get(function() {
  const wordsPerMinute = 200;
  const words = this.content.replace(/<[^>]*>/g, '').split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
});

// Virtual for URL
contentSchema.virtual('url').get(function() {
  return `/page/${this.slug}`;
});

module.exports = mongoose.model('Content', contentSchema);
