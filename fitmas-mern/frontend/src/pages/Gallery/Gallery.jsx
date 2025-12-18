import React, { useState, useEffect } from 'react';

const Gallery = ({ variant }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories] = useState(['all', 'gym', 'classes', 'events', 'facility']);

  // Static gallery images for demo purposes
  const galleryImages = [
    { id: 1, src: '/assets/img/gallery/gallery-1.jpg', category: 'gym', title: 'Main Gym Area' },
    { id: 2, src: '/assets/img/gallery/gallery-2.jpg', category: 'classes', title: 'Group Fitness Class' },
    { id: 3, src: '/assets/img/gallery/gallery-3.jpg', category: 'facility', title: 'Cardio Equipment' },
    { id: 4, src: '/assets/img/gallery/gallery-4.jpg', category: 'events', title: 'Fitness Challenge' },
    { id: 5, src: '/assets/img/gallery/gallery-5.jpg', category: 'gym', title: 'Weight Training Area' },
    { id: 6, src: '/assets/img/gallery/gallery-6.jpg', category: 'classes', title: 'Yoga Session' },
    { id: 7, src: '/assets/img/gallery/gallery-7.jpg', category: 'facility', title: 'Locker Rooms' },
    { id: 8, src: '/assets/img/gallery/gallery-8.jpg', category: 'events', title: 'Member Celebration' },
    { id: 9, src: '/assets/img/gallery/gallery-9.jpg', category: 'gym', title: 'Free Weights' }
  ];

  const [filteredImages, setFilteredImages] = useState(galleryImages);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredImages(galleryImages);
    } else {
      setFilteredImages(galleryImages.filter(img => img.category === selectedCategory));
    }
  }, [selectedCategory]);

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="gallery-page">
      <div className="breadcumb-wrapper" style={{ backgroundImage: "url('/assets/img/bg/breadcrumb-bg.png')" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcumb-content">
                <h1 className="breadcumb-title">Gallery</h1>
                <ul className="breadcumb-menu">
                  <li><a href="/">HOME</a></li>
                  <li className="active">GALLERY</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="gallery-area space">
        <div className="container">
          <div className="title-area text-center">
            <span className="sub-title">Our Gallery</span>
            <h2 className="sec-title">See Our Fitness Center</h2>
            <p className="sec-text">Explore our modern facilities, equipment, and vibrant community</p>
          </div>

          {/* Filter Buttons */}
          <div className="gallery-filter text-center mb-50">
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

          {/* Gallery Grid */}
          <div className="gallery-grid">
            <div className="row g-3">
              {filteredImages.map((image) => (
                <div key={image.id} className="col-lg-4 col-md-6">
                  <div className="gallery-item" onClick={() => openModal(image)}>
                    <div className="gallery-img">
                      <img src={image.src} alt={image.title} />
                      <div className="gallery-overlay">
                        <div className="gallery-icon">
                          <i className="fas fa-plus"></i>
                        </div>
                        <div className="gallery-content">
                          <h4>{image.title}</h4>
                          <span className="category-tag">{image.category}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {filteredImages.length === 0 && (
            <div className="text-center">
              <p>No images found in this category.</p>
              <button
                className="btn style2 mt-3"
                onClick={() => setSelectedCategory('all')}
              >
                View All Images
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal for Image Preview */}
      {selectedImage && (
        <div className="gallery-modal" onClick={closeModal}>
          <div className="modal-overlay-gallery" onClick={closeModal}></div>
          <div className="modal-content-gallery">
            <button className="close-modal" onClick={closeModal}>
              <i className="fas fa-times"></i>
            </button>
            <div className="modal-body">
              <img src={selectedImage.src} alt={selectedImage.title} />
              <div className="modal-info">
                <h3>{selectedImage.title}</h3>
                <p>Category: <span className="category-highlight">{selectedImage.category}</span></p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Why Choose Us Section */}
      <div className="space-bottom bg-gradient">
        <div className="container">
          <div className="title-area text-center mb-40">
            <h2 className="sec-title text-white">Experience the Fitmas Difference</h2>
            <p className="sec-text text-white">Modern equipment, expert trainers, and a supportive community</p>
          </div>
          <div className="row gy-4">
            <div className="col-lg-4 col-md-6">
              <div className="feature-card">
                <div className="feature-card_icon">
                  <i className="fas fa-dumbbell"></i>
                </div>
                <h6 className="feature-card_subtitle">Modern Equipment</h6>
                <p className="feature-card_text">State-of-the-art fitness equipment for all your training needs.</p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="feature-card">
                <div className="feature-card_icon">
                  <i className="fas fa-users"></i>
                </div>
                <h6 className="feature-card_subtitle">Community Focused</h6>
                <p className="feature-card_text">Join a supportive community of fitness enthusiasts.</p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="feature-card">
                <div className="feature-card_icon">
                  <i className="fas fa-certificate"></i>
                </div>
                <h6 className="feature-card_subtitle">Certified Trainers</h6>
                <p className="feature-card_text">Learn from certified professionals with years of experience.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
