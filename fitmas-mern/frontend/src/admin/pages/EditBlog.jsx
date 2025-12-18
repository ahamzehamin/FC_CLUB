import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import adminApi from '../services/authService';
import toast from 'react-hot-toast';
import './AddBlog.css';

const EditBlog = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    featuredImage: '',
    category: 'Fitness',
    tags: '',
    status: 'draft',
    seoTitle: '',
    seoDescription: ''
  });

  useEffect(() => {
    fetchCategories();
    fetchBlog();
  }, [id]);

  const fetchCategories = async () => {
    try {
      const response = await adminApi.get('/admin/blogs/categories');
      if (response.data.success) {
        setCategories(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const fetchBlog = async () => {
    try {
      setLoading(true);
      const response = await adminApi.get(`/admin/blogs/${id}`);

      if (response.data.success) {
        const blog = response.data.data;
        setFormData({
          title: blog.title || '',
          content: blog.content || '',
          excerpt: blog.excerpt || '',
          featuredImage: blog.featuredImage || '',
          category: blog.category || 'Fitness',
          tags: blog.tags ? blog.tags.join(', ') : '',
          status: blog.status || 'draft',
          seoTitle: blog.seoTitle || '',
          seoDescription: blog.seoDescription || ''
        });
      } else {
        toast.error('Blog not found');
        navigate('/admin/blogs');
      }
    } catch (error) {
      console.error('Failed to fetch blog:', error);
      toast.error('Failed to load blog');
      navigate('/admin/blogs');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setFormData(prev => ({
      ...prev,
      content: data
    }));
  };

  const handleFileUpload = async (file) => {
    if (!file) return;

    const formDataUpload = new FormData();
    formDataUpload.append('file', file);

    try {
      const response = await adminApi.post('/upload/single', formDataUpload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        setFormData(prev => ({
          ...prev,
          featuredImage: response.data.data.url
        }));
        toast.success('Image uploaded successfully');
      }
    } catch (error) {
      console.error('Upload failed:', error);
      toast.error('Failed to upload image');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      toast.error('Title is required');
      return;
    }

    if (!formData.content.trim()) {
      toast.error('Content is required');
      return;
    }

    setSaving(true);

    try {
      // Prepare tags array
      const tagsArray = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0);

      const blogData = {
        ...formData,
        tags: tagsArray
      };

      const response = await adminApi.put(`/admin/blogs/${id}`, blogData);

      if (response.data.success) {
        toast.success('Blog updated successfully!');
        navigate('/admin/blogs');
      }
    } catch (error) {
      console.error('Update blog failed:', error);
      toast.error(error.response?.data?.message || 'Failed to update blog');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveDraft = async () => {
    const draftData = {
      ...formData,
      status: 'draft',
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
    };

    setSaving(true);

    try {
      const response = await adminApi.put(`/admin/blogs/${id}`, draftData);

      if (response.data.success) {
        toast.success('Draft saved successfully!');
        // Stay on the same page
      }
    } catch (error) {
      console.error('Save draft failed:', error);
      toast.error('Failed to save draft');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="add-blog-page">
        <div className="page-header">
          <div className="page-title">
            <h1>Edit Blog</h1>
            <p>Loading blog content...</p>
          </div>
        </div>
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading blog...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="add-blog-page">
      {/* Page Header */}
      <div className="page-header">
        <div className="page-title">
          <h1>Edit Blog</h1>
          <p>Make changes to your blog post</p>
        </div>
        <div className="page-actions">
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={handleSaveDraft}
            disabled={saving}
          >
            Save Draft
          </button>
          <button
            type="submit"
            form="blogForm"
            className="btn btn-primary"
            disabled={saving}
          >
            {saving ? 'Updating...' : 'Update'}
          </button>
        </div>
      </div>

      <form id="blogForm" onSubmit={handleSubmit}>
        <div className="blog-editor-grid">
          {/* Main Content */}
          <div className="main-content">
            {/* Title */}
            <div className="form-group">
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter blog title..."
                className="blog-title-input"
                required
              />
            </div>

            {/* Content Editor */}
            <div className="form-group">
              <label>Content</label>
              <div className="editor-wrapper">
                <CKEditor
                  editor={ClassicEditor}
                  data={formData.content}
                  onChange={handleEditorChange}
                  config={{
                    toolbar: [
                      'heading', '|',
                      'bold', 'italic', 'link', 'bulletedList', 'numberedList', '|',
                      'indent', 'outdent', '|',
                      'imageUpload', 'blockQuote', 'insertTable', 'mediaEmbed', '|',
                      'undo', 'redo'
                    ],
                    image: {
                      toolbar: ['imageTextAlternative', 'imageStyle:full', 'imageStyle:side']
                    }
                  }}
                />
              </div>
            </div>

            {/* Excerpt */}
            <div className="form-group">
              <label>Excerpt</label>
              <textarea
                name="excerpt"
                value={formData.excerpt}
                onChange={handleInputChange}
                placeholder="Brief description of the blog post..."
                rows="3"
                className="form-control"
              />
              <small className="form-text">
                Excerpts are optional hand-crafted summaries of your content.
              </small>
            </div>
          </div>

          {/* Sidebar */}
          <div className="sidebar-content">
            {/* Publish Settings */}
            <div className="sidebar-card">
              <div className="card-header">
                <h3>Publish</h3>
              </div>
              <div className="card-body">
                <div className="form-group">
                  <label>Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="form-control"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>

                <div className="publish-actions">
                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-block"
                    onClick={handleSaveDraft}
                    disabled={saving}
                  >
                    Save Draft
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={saving}
                  >
                    {saving ? 'Updating...' : 'Update'}
                  </button>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            <div className="sidebar-card">
              <div className="card-header">
                <h3>Featured Image</h3>
              </div>
              <div className="card-body">
                {formData.featuredImage ? (
                  <div className="image-preview">
                    <img
                      src={formData.featuredImage}
                      alt="Featured"
                      className="preview-image"
                    />
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger remove-image"
                      onClick={() => setFormData(prev => ({ ...prev, featuredImage: '' }))}
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="image-upload">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="file-input"
                      id="featuredImage"
                    />
                    <label htmlFor="featuredImage" className="upload-label">
                      <i className="fas fa-cloud-upload-alt"></i>
                      <span>Upload Featured Image</span>
                    </label>
                  </div>
                )}
              </div>
            </div>

            {/* Categories */}
            <div className="sidebar-card">
              <div className="card-header">
                <h3>Categories</h3>
              </div>
              <div className="card-body">
                <div className="form-group">
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="form-control"
                  >
                    <option value="Fitness">Fitness</option>
                    <option value="Health">Health</option>
                    <option value="Nutrition">Nutrition</option>
                    <option value="Training">Training</option>
                    <option value="Lifestyle">Lifestyle</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="sidebar-card">
              <div className="card-header">
                <h3>Tags</h3>
              </div>
              <div className="card-body">
                <div className="form-group">
                  <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    placeholder="fitness, health, training"
                    className="form-control"
                  />
                  <small className="form-text">
                    Separate tags with commas
                  </small>
                </div>
              </div>
            </div>

            {/* SEO Settings */}
            <div className="sidebar-card">
              <div className="card-header">
                <h3>SEO Settings</h3>
              </div>
              <div className="card-body">
                <div className="form-group">
                  <label>SEO Title</label>
                  <input
                    type="text"
                    name="seoTitle"
                    value={formData.seoTitle}
                    onChange={handleInputChange}
                    placeholder="SEO title"
                    className="form-control"
                    maxLength="60"
                  />
                  <small className="char-count">
                    {formData.seoTitle.length}/60 characters
                  </small>
                </div>

                <div className="form-group">
                  <label>SEO Description</label>
                  <textarea
                    name="seoDescription"
                    value={formData.seoDescription}
                    onChange={handleInputChange}
                    placeholder="SEO description"
                    className="form-control"
                    rows="3"
                    maxLength="160"
                  />
                  <small className="char-count">
                    {formData.seoDescription.length}/160 characters
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditBlog;
