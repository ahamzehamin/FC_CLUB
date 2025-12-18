import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories] = useState(['all', 'fitness', 'nutrition', 'training', 'health']);

  useEffect(() => {
    fetchBlogs();
  }, [selectedCategory]);

  const fetchBlogs = async () => {
    try {
      let url = '/api/blogs';
      if (selectedCategory !== 'all') {
        url = `/api/blogs/category/${selectedCategory}`;
      }
      const response = await axios.get(url);
      setBlogs(response.data.data || []);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="blog-page">
      <div className="breadcumb-wrapper" style={{ backgroundImage: "url('/assets/img/bg/breadcrumb-bg.png')" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcumb-content">
                <h1 className="breadcumb-title">Blog Posts</h1>
                <ul className="breadcumb-menu">
                  <li><a href="/">HOME</a></li>
                  <li className="active">BLOG</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space">
        <div className="container">
          <div className="title-area text-center">
            <span className="sub-title">Fitness Articles</span>
            <h2 className="sec-title">Read Our Latest Articles</h2>
            <p className="sec-text">Stay updated with the latest fitness tips, nutrition advice, and health insights</p>
          </div>

          {/* Category Filter */}
          <div className="blog-filter text-center mb-50">
            <div className="filter-buttons">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="text-center">
              <div className="loading"></div>
            </div>
          ) : (
            <>
              {blogs.length > 0 ? (
                <div className="row global-carousel blog-slider" data-slide-show="3">
                  {blogs.map((blog) => (
                    <div key={blog._id} className="col-md-6 col-lg-4">
                      <div className="blog-card">
                        <div className="blog-img">
                          <img src={`/assets/img/blog/${blog.image}`} alt={blog.title} />
                        </div>
                        <div
                          className="blog-content"
                          style={{ backgroundImage: "url('/assets/img/blog/blog_card1_bg.png')" }}
                        >
                          <div className="blog-meta">
                            <a href={`/blog/category/${blog.category}`} className="blog-category">
                              <i className="fas fa-tag"></i> {blog.category}
                            </a>
                            <span><i className="fal fa-calendar"></i> {formatDate(blog.createdAt)}</span>
                            <span><i className="far fa-user"></i> by {blog.author}</span>
                          </div>
                          <h3 className="blog-title box-title">
                            <a href={`/blog/${blog.slug}`}>{blog.title}</a>
                          </h3>
                          <p className="blog-text">{blog.excerpt}</p>
                          <div className="blog-tags">
                            {blog.tags && blog.tags.slice(0, 3).map((tag, idx) => (
                              <span key={idx} className="tag">#{tag}</span>
                            ))}
                          </div>
                          <a href={`/blog/${blog.slug}`} className="link-btn">
                            Read More <i className="fas fa-arrow-right"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center">
                  <p>No blog posts available in this category.</p>
                  {selectedCategory !== 'all' && (
                    <button
                      className="btn style2 mt-3"
                      onClick={() => setSelectedCategory('all')}
                    >
                      View All Posts
                    </button>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="space bg-smoke3">
        <div className="container">
          <div className="newsletter-area">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="newsletter-content">
                  <h3>Subscribe to Our Newsletter</h3>
                  <p>Get the latest fitness tips and health advice delivered to your inbox weekly.</p>
                </div>
              </div>
              <div className="col-lg-6">
                <form className="newsletter-form">
                  <div className="form-group">
                    <input type="email" placeholder="Enter your email" required />
                    <button type="submit" className="btn style2">Subscribe</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
