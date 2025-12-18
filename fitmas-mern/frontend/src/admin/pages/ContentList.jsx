import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import authService from '../services/authService';

const ContentList = () => {
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContents, setSelectedContents] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    page: 1,
    limit: 10
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  });

  useEffect(() => {
    fetchContents();
  }, [filters]);

  const fetchContents = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        page: filters.page,
        limit: filters.limit,
        status: filters.status,
        search: filters.search
      });

      const response = await authService.api.get(`/admin/content?${queryParams}`);
      setContents(response.data.data);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error('Error fetching contents:', error);
      toast.error('Failed to fetch contents');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this content?')) {
      return;
    }

    try {
      await authService.api.delete(`/admin/content/${id}`);
      toast.success('Content deleted successfully');
      fetchContents();
    } catch (error) {
      console.error('Error deleting content:', error);
      toast.error('Failed to delete content');
    }
  };

  const handleBulkAction = async (action) => {
    if (selectedContents.length === 0) {
      toast.error('Please select at least one content');
      return;
    }

    try {
      await authService.api.put('/admin/content/bulk', {
        contentIds: selectedContents,
        action
      });

      toast.success(`Selected contents ${action === 'publish' ? 'published' : action === 'unpublish' ? 'moved to draft' : 'moved to trash'}`);
      setSelectedContents([]);
      fetchContents();
    } catch (error) {
      console.error('Error performing bulk action:', error);
      toast.error('Failed to perform bulk action');
    }
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedContents(contents.map(content => content._id));
    } else {
      setSelectedContents([]);
    }
  };

  const handleSelectContent = (id, checked) => {
    if (checked) {
      setSelectedContents([...selectedContents, id]);
    } else {
      setSelectedContents(selectedContents.filter(contentId => contentId !== id));
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      published: 'badge-success',
      draft: 'badge-warning',
      private: 'badge-info',
      trash: 'badge-danger'
    };

    return (
      <span className={`badge ${statusClasses[status] || 'badge-secondary'}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  if (loading && contents.length === 0) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="content-wrapper">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="mb-1">Content Management</h4>
          <p className="text-muted mb-0">Manage your static content pages</p>
        </div>
        <Link to="/admin/content/add" className="btn btn-primary">
          <i className="fas fa-plus me-2"></i>Add Content
        </Link>
      </div>

      {/* Filters */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Search content..."
                value={filters.search}
                onChange={(e) => setFilters({...filters, search: e.target.value, page: 1})}
              />
            </div>
            <div className="col-md-3">
              <select
                className="form-select"
                value={filters.status}
                onChange={(e) => setFilters({...filters, status: e.target.value, page: 1})}
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="private">Private</option>
                <option value="trash">Trash</option>
              </select>
            </div>
            <div className="col-md-2">
              <select
                className="form-select"
                value={filters.limit}
                onChange={(e) => setFilters({...filters, limit: parseInt(e.target.value), page: 1})}
              >
                <option value={10}>10 per page</option>
                <option value={25}>25 per page</option>
                <option value={50}>50 per page</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedContents.length > 0 && (
        <div className="card mb-3">
          <div className="card-body">
            <div className="d-flex align-items-center">
              <span className="me-3">{selectedContents.length} selected</span>
              <button
                className="btn btn-sm btn-success me-2"
                onClick={() => handleBulkAction('publish')}
              >
                Publish
              </button>
              <button
                className="btn btn-sm btn-warning me-2"
                onClick={() => handleBulkAction('unpublish')}
              >
                Move to Draft
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => handleBulkAction('trash')}
              >
                Move to Trash
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Content Table */}
      <div className="card">
        <div className="card-body">
          {contents.length === 0 ? (
            <div className="text-center py-5">
              <i className="fas fa-file-alt fa-3x text-muted mb-3"></i>
              <h5 className="text-muted">No content found</h5>
              <p className="text-muted">Get started by creating your first content page.</p>
              <Link to="/admin/content/add" className="btn btn-primary">
                <i className="fas fa-plus me-2"></i>Create Content
              </Link>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>
                      <input
                        type="checkbox"
                        checked={selectedContents.length === contents.length && contents.length > 0}
                        onChange={(e) => handleSelectAll(e.target.checked)}
                      />
                    </th>
                    <th>Title</th>
                    <th>Status</th>
                    <th>Category</th>
                    <th>Modified</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {contents.map((content) => (
                    <tr key={content._id}>
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedContents.includes(content._id)}
                          onChange={(e) => handleSelectContent(content._id, e.target.checked)}
                        />
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          {content.featuredImage && (
                            <img
                              src={content.featuredImage}
                              alt={content.title}
                              className="rounded me-3"
                              style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                            />
                          )}
                          <div>
                            <h6 className="mb-0">{content.title}</h6>
                            {content.excerpt && (
                              <small className="text-muted">
                                {content.excerpt.length > 50
                                  ? `${content.excerpt.substring(0, 50)}...`
                                  : content.excerpt}
                              </small>
                            )}
                          </div>
                        </div>
                      </td>
                      <td>{getStatusBadge(content.status)}</td>
                      <td>
                        <span className="badge bg-light text-dark">
                          {content.category || 'page'}
                        </span>
                      </td>
                      <td>{formatDate(content.updatedAt)}</td>
                      <td>
                        <div className="btn-group" role="group">
                          <Link
                            to={`/admin/content/edit/${content._id}`}
                            className="btn btn-sm btn-outline-primary"
                            title="Edit"
                          >
                            <i className="fas fa-edit"></i>
                          </Link>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(content._id)}
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
            </div>
          )}

          {/* Pagination */}
          {pagination.pages > 1 && (
            <div className="d-flex justify-content-between align-items-center mt-3">
              <div className="text-muted">
                Showing {(pagination.page - 1) * pagination.limit + 1} to{' '}
                {Math.min(pagination.page * pagination.limit, pagination.total)} of{' '}
                {pagination.total} entries
              </div>
              <nav>
                <ul className="pagination pagination-sm mb-0">
                  <li className={`page-item ${!pagination.hasPrev ? 'disabled' : ''}`}>
                    <button
                      className="page-link"
                      onClick={() => setFilters({...filters, page: pagination.page - 1})}
                      disabled={!pagination.hasPrev}
                    >
                      Previous
                    </button>
                  </li>
                  {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((page) => (
                    <li key={page} className={`page-item ${page === pagination.page ? 'active' : ''}`}>
                      <button
                        className="page-link"
                        onClick={() => setFilters({...filters, page})}
                      >
                        {page}
                      </button>
                    </li>
                  ))}
                  <li className={`page-item ${!pagination.hasNext ? 'disabled' : ''}`}>
                    <button
                      className="page-link"
                      onClick={() => setFilters({...filters, page: pagination.page + 1})}
                      disabled={!pagination.hasNext}
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentList;
