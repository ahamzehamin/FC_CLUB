import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import adminApi from '../services/authService';
import toast from 'react-hot-toast';
import './BlogList.css';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBlogs, setSelectedBlogs] = useState([]);
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    search: '',
    status: 'all',
    category: '',
    sortBy: 'createdAt',
    sortOrder: 'desc'
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  });

  useEffect(() => {
    fetchBlogs();
  }, [filters]);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();

      Object.keys(filters).forEach(key => {
        if (filters[key] !== '' && filters[key] !== 'all') {
          queryParams.append(key, filters[key]);
        }
      });

      const response = await adminApi.get(`/admin/blogs?${queryParams}`);
      if (response.data.success) {
        setBlogs(response.data.data);
        setPagination(response.data.pagination);
      }
    } catch (error) {
      console.error('Failed to fetch blogs:', error);
      toast.error('Failed to load blogs');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: key === 'page' ? value : 1 // Reset to page 1 when filtering
    }));
  };

  const handleSelectBlog = (blogId) => {
    setSelectedBlogs(prev =>
      prev.includes(blogId)
        ? prev.filter(id => id !== blogId)
        : [...prev, blogId]
    );
  };

  const handleSelectAll = () => {
    if (selectedBlogs.length === blogs.length) {
      setSelectedBlogs([]);
    } else {
      setSelectedBlogs(blogs.map(blog => blog._id));
    }
  };

  const handleBulkAction = async (action) => {
    if (selectedBlogs.length === 0) {
      toast.error('Please select blogs first');
      return;
    }

    try {
      if (action === 'delete') {
        if (!window.confirm(`Are you sure you want to delete ${selectedBlogs.length} blog(s)?`)) {
          return;
        }
      }

      const response = await adminApi.put('/admin/blogs/bulk', {
        blogIds: selectedBlogs,
        action: action === 'delete' ? 'delete' : 'status',
        value: action !== 'delete' ? action : undefined
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setSelectedBlogs([]);
        fetchBlogs();
      }
    } catch (error) {
      console.error('Bulk action failed:', error);
      toast.error(error.response?.data?.message || 'Bulk action failed');
    }
  };

  const handleDeleteBlog = async (blogId) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) {
      return;
    }

    try {
      const response = await adminApi.delete(`/admin/blogs/${blogId}`);
      if (response.data.success) {
        toast.success('Blog deleted successfully');
        fetchBlogs();
      }
    } catch (error) {
      console.error('Delete blog failed:', error);
      toast.error('Failed to delete blog');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      published: { class: 'badge-success', text: 'Published' },
      draft: { class: 'badge-warning', text: 'Draft' }
    };

    const config = statusConfig[status] || { class: 'badge-secondary', text: status };
    return <span className={`badge ${config.class}`}>{config.text}</span>;
  };

  return (
    <div className="blog-list-page">
      {/* Page Header */}
      <div className="page-header">
        <div className="page-title">
          <h1>Blog Management</h1>
          <p>Manage your blog posts and content</p>
        </div>
        <div className="page-actions">
          <Link to="/admin/blogs/add" className="btn btn-primary">
            <i className="fas fa-plus"></i>
            Add New Blog
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-card">
        <div className="filters-grid">
          <div className="filter-group">
            <label>Search</label>
            <input
              type="text"
              className="form-control"
              placeholder="Search blogs..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
            />
          </div>

          <div className="filter-group">
            <label>Status</label>
            <select
              className="form-control"
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Sort By</label>
            <select
              className="form-control"
              value={filters.sortBy}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
            >
              <option value="createdAt">Date Created</option>
              <option value="updatedAt">Date Updated</option>
              <option value="title">Title</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Order</label>
            <select
              className="form-control"
              value={filters.sortOrder}
              onChange={(e) => handleFilterChange('sortOrder', e.target.value)}
            >
              <option value="desc">Newest First</option>
              <option value="asc">Oldest First</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedBlogs.length > 0 && (
        <div className="bulk-actions">
          <span>{selectedBlogs.length} blog(s) selected</span>
          <div className="bulk-buttons">
            <button
              className="btn btn-sm btn-success"
              onClick={() => handleBulkAction('published')}
            >
              Publish
            </button>
            <button
              className="btn btn-sm btn-warning"
              onClick={() => handleBulkAction('draft')}
            >
              Move to Draft
            </button>
            <button
              className="btn btn-sm btn-danger"
              onClick={() => handleBulkAction('delete')}
            >
              Delete
            </button>
          </div>
        </div>
      )}

      {/* Blogs Table */}
      <div className="blogs-table-container">
        {loading ? (
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Loading blogs...</p>
          </div>
        ) : (
          <div className="blogs-table-wrapper">
            <table className="blogs-table">
              <thead>
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      checked={selectedBlogs.length === blogs.length && blogs.length > 0}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Author</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((blog) => (
                  <tr key={blog._id}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedBlogs.includes(blog._id)}
                        onChange={() => handleSelectBlog(blog._id)}
                      />
                    </td>
                    <td>
                      <div className="blog-title-cell">
                        {blog.featuredImage && (
                          <img
                            src={blog.featuredImage}
                            alt={blog.title}
                            className="blog-thumbnail"
                          />
                        )}
                        <div>
                          <h4>{blog.title}</h4>
                          {blog.excerpt && (
                            <p className="blog-excerpt">{blog.excerpt.substring(0, 100)}...</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td>{getStatusBadge(blog.status)}</td>
                    <td>{blog.author?.username || 'Unknown'}</td>
                    <td>{formatDate(blog.createdAt)}</td>
                    <td>
                      <div className="action-buttons">
                        <Link
                          to={`/admin/blogs/edit/${blog._id}`}
                          className="btn btn-sm btn-outline-primary"
                          title="Edit"
                        >
                          <i className="fas fa-edit"></i>
                        </Link>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDeleteBlog(blog._id)}
                          title="Delete"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {blogs.length === 0 && (
              <div className="empty-state">
                <i className="fas fa-blog"></i>
                <h3>No blogs found</h3>
                <p>Try adjusting your filters or create your first blog post.</p>
                <Link to="/admin/blogs/add" className="btn btn-primary">
                  Add New Blog
                </Link>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Pagination */}
      {pagination.pages > 1 && (
        <div className="pagination-container">
          <div className="pagination-info">
            Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} blogs
          </div>
          <div className="pagination-controls">
            <button
              className="btn btn-sm btn-outline-primary"
              disabled={pagination.page === 1}
              onClick={() => handleFilterChange('page', pagination.page - 1)}
            >
              <i className="fas fa-chevron-left"></i>
            </button>

            {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(pageNum => (
              <button
                key={pageNum}
                className={`btn btn-sm ${pageNum === pagination.page ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => handleFilterChange('page', pageNum)}
              >
                {pageNum}
              </button>
            ))}

            <button
              className="btn btn-sm btn-outline-primary"
              disabled={pagination.page === pagination.pages}
              onClick={() => handleFilterChange('page', pagination.page + 1)}
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogList;
