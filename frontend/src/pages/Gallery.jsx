import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Gallery.css";
import { FaSearch, FaTimes, FaExpand, FaCompress, FaArrowLeft, FaArrowRight } from "react-icons/fa";

const images = [
  "https://ld-wp73.template-help.com/woocommerce/prod_16812/v4/wp-content/uploads/2020/02/03.png",
  "https://ld-wp73.template-help.com/woocommerce/prod_16812/v4/wp-content/uploads/2020/02/img01.jpg",
  "https://ld-wp73.template-help.com/woocommerce/prod_16812/v4/wp-content/uploads/2020/02/service01.jpg",
  "https://ld-wp73.template-help.com/woocommerce/prod_16812/v4/wp-content/uploads/2020/02/04.png",
  "https://ld-wp73.template-help.com/woocommerce/prod_16812/v4/wp-content/uploads/2020/02/05.jpg",
  "https://ld-wp73.template-help.com/woocommerce/prod_16812/v4/wp-content/uploads/2020/02/02.png",
];

const Gallery = () => {
  const [showSlideshow, setShowSlideshow] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const openSlideshow = (index) => {
    setCurrentImageIndex(index);
    setShowSlideshow(true);
    setIsZoomed(false);
  };

  const closeSlideshow = () => {
    setShowSlideshow(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    setIsZoomed(false);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    setIsZoomed(false);
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <div className="gallery-container">
      <div className="gallery-grid">
        {images.map((src, index) => (
          <div key={index} className="gallery-item">
            <img src={src} alt={`Gallery ${index}`} className="gallery-image" />
            <button className="gallery-button" onClick={() => openSlideshow(index)}>
              <div className="search-icon-container">
                <FaSearch className="search-icon" />
              </div>
            </button>
          </div>
        ))}
      </div>

      {showSlideshow && (
        <div className="slideshow-overlay">
          <button className="close-btn" onClick={closeSlideshow}>
            <FaTimes />
          </button>

          <button className="nav-btn prev-btn" onClick={prevImage}>
            <FaArrowLeft />
          </button>

          <div className="slideshow-content">
            <img
              src={images[currentImageIndex]}
              alt="Slideshow"
              className={`slideshow-image ${isZoomed ? "zoomed" : ""}`}
            />
          </div>
          <button className="zoom-btn" onClick={toggleZoom}>
              {isZoomed ? <FaCompress /> : <FaExpand />}
            </button>
          <button className="nav-btn next-btn" onClick={nextImage}>
            <FaArrowRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default Gallery;
