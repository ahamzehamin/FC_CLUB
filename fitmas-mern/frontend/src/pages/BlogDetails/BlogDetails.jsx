import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const BlogDetails = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  useEffect(() => {
    fetchBlogDetails();
  }, [slug]);

  const fetchBlogDetails = async () => {
    try {
      const response = await axios.get(`/api/blogs/${slug}`);
      setBlog(response.data.data);
      // Fetch related blogs
      const relatedResponse = await axios.get(`/api/blogs?limit=3`);
      setRelatedBlogs(relatedResponse.data.data.filter(b => b.slug !== slug).slice(0, 3));
    } catch (error) {
      console.error('Error fetching blog details:', error);
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

  if (loading) {
    return (
      <div className="blog-details-page">
        <div className="breadcumb-wrapper" style={{ backgroundImage: "url('/assets/img/bg/breadcrumb-bg.png')" }}>
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="breadcumb-content">
                  <h1 className="breadcumb-title">Loading Article...</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="space">
          <div className="container text-center">
            <div className="loading"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="blog-details-page">
        <div className="breadcumb-wrapper" style={{ backgroundImage: "url('/assets/img/bg/breadcrumb-bg.png')" }}>
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="breadcumb-content">
                  <h1 className="breadcumb-title">Article Not Found</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="space">
          <div className="container text-center">
            <p>The article you're looking for doesn't exist.</p>
            <Link to="/blog" className="btn style2 mt-3">View All Articles</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-details-page">
      <div className="breadcumb-wrapper" style={{ backgroundImage: "url('/assets/img/bg/breadcrumb-bg.png')" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcumb-content">
                <h1 className="breadcumb-title">{blog.title}</h1>
                <ul className="breadcumb-menu">
                  <li><a href="/">HOME</a></li>
                  <li><a href="/blog">BLOG</a></li>
                  <li className="active">{blog.title}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space">
        <div className="container">
          <div className="row gy-40">
            <div className="col-lg-8">
              <div className="blog-details-content">
                <div className="blog-meta">
                  <span className="blog-category" style={{ backgroundColor: '#007bff', color: 'white', padding: '4px 8px', borderRadius: '4px' }}>
                    {blog.category}
                  </span>
                  <span><i className="fas fa-calendar"></i> {formatDate(blog.createdAt)}</span>
                  <span><i className="fas fa-user"></i> by {blog.author}</span>
                  <span><i className="fas fa-eye"></i> 2.5K views</span>
                </div>

                <div className="blog-featured-img mb-30">
                  <img src={`/assets/img/blog/${blog.image}`} alt={blog.title} className="img-fluid" />
                </div>

                <div className="blog-text">
                  <h2>Introduction</h2>
                  <p className="blog-excerpt">{blog.excerpt}</p>

                  <h3>Main Content</h3>
                  <div dangerouslySetInnerHTML={{ __html: blog.content }} />

                  <h3>Key Takeaways</h3>
                  <ul>
                    <li>Understanding the fundamentals of fitness training</li>
                    <li>Importance of proper nutrition and recovery</li>
                    <li>Building sustainable exercise habits</li>
                    <li>Monitoring progress and adjusting goals</li>
                  </ul>

                  {blog.tags && blog.tags.length > 0 && (
                    <div className="blog-tags">
                      <h4>Tags:</h4>
                      <div className="tags-list">
                        {blog.tags.map((tag, idx) => (
                          <span key={idx} className="tag">#{tag}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="blog-share text-center">
                  <h4>Share this article:</h4>
                  <div className="social-share">
                    <a href="#" className="share-btn facebook">
                      <i className="fab fa-facebook"></i>
                    </a>
                    <a href="#" className="share-btn twitter">
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a href="#" className="share-btn linkedin">
                      <i className="fab fa-linkedin"></i>
                    </a>
                    <a href="#" className="share-btn pinterest">
                      <i className="fab fa-pinterest"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="blog-sidebar">
                <div className="sidebar-widget">
                  <h3 className="widget-title">Author</h3>
                  <div className="author-info">
                    <img src={`/assets/img/team/team-author.png`} alt={blog.author} className="author-img" />
                    <h4>{blog.author}</h4>
                    <p>Fitness expert and certified trainer with 10+ years of experience in helping individuals achieve their health goals.</p>
                  </div>
                </div>

                <div className="sidebar-widget">
                  <h3 className="widget-title">Recent Posts</h3>
                  <div className="recent-posts">
                    {relatedBlogs.slice(0, 3).map((relatedBlog) => (
                      <div key={relatedBlog._id} className="recent-post-item">
                        <img src={`/assets/img/blog/${relatedBlog.image}`} alt={relatedBlog.title} />
                        <div className="recent-post-content">
                          <h5><Link to={`/blog/${relatedBlog.slug}`}>{relatedBlog.title}</Link></h5>
                          <span>{formatDate(relatedBlog.createdAt)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="sidebar-widget">
                  <h3 className="widget-title">Categories</h3>
                  <ul className="category-list">
                    <li><Link to="/blog/category/fitness">Fitness (12)</Link></li>
                    <li><Link to="/blog/category/nutrition">Nutrition (8)</Link></li>
                    <li><Link to="/blog/category/training">Training (15)</Link></li>
                    <li><Link to="/blog/category/health">Health (6)</Link></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Articles */}
      {relatedBlogs.length > 0 && (
        <div className="space-bottom bg-smoke3">
          <div className="container">
            <div className="title-area text-center">
              <span className="sub-title">Related Articles</span>
              <h2 className="sec-title">You Might Also Like</h2>
            </div>
            <div className="row">
              {relatedBlogs.map((relatedBlog) => (
                <div key={relatedBlog._id} className="col-md-6 col-lg-4">
                  <div className="blog-card">
                    <div className="blog-img">
                      <img src={`/assets/img/blog/${relatedBlog.image}`} alt={relatedBlog.title} />
                    </div>
                    <div
                      className="blog-content"
                      style={{ backgroundImage: "url('/assets/img/blog/blog_card1_bg.png')" }}
                    >
                      <div className="blog-meta">
                        <a href={`/blog/category/${relatedBlog.category}`} className="blog-category">
                          <i className="fas fa-tag"></i> {relatedBlog.category}
                        </a>
                        <span><i className="fal fa-calendar"></i> {formatDate(relatedBlog.createdAt)}</span>
                      </div>
                      <h3 className="blog-title box-title">
                        <Link to={`/blog/${relatedBlog.slug}`}>{relatedBlog.title}</Link>
                      </h3>
                      <p className="blog-text">{relatedBlog.excerpt}</p>
                      <Link to={`/blog/${relatedBlog.slug}`} className="link-btn">
                        Read More <i className="fas fa-arrow-right"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Newsletter Section */}
      <div className="space" style={{ backgroundColor: '#007bff' }}>
        <div className="container">
          <div className="newsletter-area text-center text-white">
            <h2>Subscribe to Our Newsletter</h2>
            <p>Get the latest fitness tips and health insights delivered to your inbox weekly.</p>
            <div className="newsletter-form mt-40">
              <input type="email" placeholder="Enter your email address" />
              <button type="submit" className="btn" style={{ backgroundColor: 'white', color: '#007bff' }}>
                Subscribe Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
