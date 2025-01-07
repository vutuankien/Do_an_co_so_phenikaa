import { useState } from "react";
import { assets, productThemes } from "./../assets/assets";
import "./Home.css";

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragStartX, setDragStartX] = useState(null);
  const [activeNavbar, setActiveNavbar] = useState("Best sellers");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantities, setQuantities] = useState({});

  const slides = [
    { id: 1, image: assets.banner_img1, alt: "Slide 1" },
    { id: 2, image: assets.banner_img2, alt: "Slide 2" },
    { id: 3, image: assets.banner_img3, alt: "Slide 3" },
  ];

  const texts = [
    "FAN FAVE LIPPIES IN NEW, SUPER RICH COLORS",
    "BEST MAKEUP SECRETS & LOOKS FOR A DATE NIGHT",
    "BEST TIPS TO ACHIEVE PERFECT WINTERFACE",
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + slides.length) % slides.length
    );
  };

  const handleDragStart = (e) => {
    setDragStartX(e.clientX || e.touches[0].clientX);
  };

  const handleDragEnd = (e) => {
    const endX = e.clientX || e.changedTouches[0].clientX;
    if (dragStartX !== null) {
      const deltaX = dragStartX - endX;
      if (deltaX > 50) {
        nextSlide();
      } else if (deltaX < -50) {
        prevSlide();
      }
    }
    setDragStartX(null);
  };

  const handleNavbarClick = (title) => {
    setActiveNavbar(title);
  };

  const handleZoom = (product) => {
    console.log(`Zoom vào sản phẩm: ${product.title}`);
    alert(`Zoom vào sản phẩm: ${product.title}`);
  };

  const handleLike = (product) => {
    console.log(`Thích sản phẩm: ${product.title}`);
    alert(`Thêm vào danh sách yêu thích: ${product.title}`);
  };

  const handleView = (product) => {
    setSelectedProduct(product);
  };
  const handleCloseDetail = () => {
    setSelectedProduct(null);
  };

  const handleAddToCart = (product) => {
    const quantity = quantities[product.id] || 1;
    console.log(`Thêm sản phẩm: ${product.title}, Số lượng: ${quantity}`);
    alert(`Thêm sản phẩm vào giỏ: ${product.title}, Số lượng: ${quantity}`);
  };

  const handleQuantityChange = (e, product) => {
    const quantity = Math.max(1, parseInt(e.target.value) || 1);
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [product.id]: quantity,
    }));
    console.log(`Số lượng sản phẩm ${product.title}:`, quantity);
  };

  return (
    <div className="home-container">
      <div
        className="banner-container"
        onMouseDown={handleDragStart}
        onMouseUp={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchEnd={handleDragEnd}
      >
        {slides.map((slide, index) => (
          <img
            key={slide.id}
            src={slide.image}
            alt={slide.alt}
            className={index === currentIndex ? "active" : ""}
          />
        ))}
        <div className={`text-box text-box-${currentIndex + 1}`}>
          {texts[currentIndex]}
          <button className="discover-btn">Discover Now</button>
        </div>
        <button onClick={prevSlide} className="control prev">
          &#10094;
        </button>
        <button onClick={nextSlide} className="control next">
          &#10095;
        </button>
      </div>
      <div className="image-content-container">
        <div className="image-content">
          <img src={assets.image_content1} alt="img-content1" />
          <a href="">
            <div className="image-content-title">
              <h1>FACE</h1>
              MAKEUP
            </div>
          </a>
        </div>
        <div className="image-content">
          <img src={assets.image_content2} alt="img-content1" />
          <a href="">
            <div className="image-content-title">
              <h1>EYE</h1>
              MAKEUP
            </div>
          </a>
        </div>
        <div className="image-content">
          <img src={assets.image_content3} alt="img-content1" />
          <a href="">
            <div className="image-content-title">
              <h1>LIP</h1>
              MAKEUP
            </div>
          </a>
        </div>
        <div className="image-content">
          <img src={assets.image_content4} alt="img-content1" />
          <a href="">
            <div className="image-content-title">
              <h1>GIFT SET</h1>
              MAKEUP KITS
            </div>
          </a>
        </div>
      </div>
      <div className="product-container">
        <div className="product-container-navbar">
          {["Best sellers", "New arrivals", "Items sale"].map((title) => {
            const isActive = activeNavbar === title;
            return (
              <div
                key={title}
                className={`navbar-title ${isActive ? "active" : ""}`}
                onClick={() => handleNavbarClick(title)}
              >
                <span>{title}</span>
              </div>
            );
          })}
        </div>
        <div className="product-container-card">
          {productThemes[activeNavbar]?.map((product) => (
            <div key={product.id} className="product-card">
              {product.onSale && (
                <div className="product-sale-label">Sale!</div>
              )}
              <img
                src={product.image}
                alt={product.title}
                className="product-image"
              />

              <div className="hover-buttons">
                <div className="hover-btn-function">
                  <button
                    onClick={() => handleZoom(product)}
                    className="hover-btn zoom-btn"
                  >
                    <img src={assets.zoom_icon} alt="zoom-icon" />
                  </button>
                  <button
                    onClick={() => handleLike(product)}
                    className="hover-btn like-btn"
                  >
                    <img src={assets.like_icon} alt="like-icon" />
                  </button>
                  <button
                    onClick={() => handleView(product)}
                    className="hover-btn view-btn"
                  >
                    <img src={assets.eye_icon} alt="eye-icon" />
                  </button>
                </div>
              </div>
              <div className="product-info">
                <p className="product-category">{product.category}</p>
                <h3 className="product-title">{product.title}</h3>
                <div className="product-price">
                  {product.onSale ? (
                    <>
                      <span className="original-price">{product.price}</span>
                      <span className="sale-price">{product.salePrice}</span>
                    </>
                  ) : (
                    <span>{product.price}</span>
                  )}
                </div>
              </div>
              <div className="product-footer">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="add-to-cart-btn"
                >
                  <img src={assets.cart_icon2} alt="add-cart-button" />
                  ADD TO CART
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedProduct && (
        <div className="product-detail-modal">
          <div className="modal-content">
            <button className="close-btn" onClick={handleCloseDetail}>
              &times;
            </button>
            <div className="modal-content-image">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.title}
                className="detail-image"
              />
            </div>
            <div className="modal-main-content">
              <div className="product-info">
                {selectedProduct.onSale && (
                  <div className="product-sale-label2">Sale!</div>
                )}
                <h3 className="product-title2">{selectedProduct.title}</h3>
                <div className="product-price2">
                  {selectedProduct.onSale ? (
                    <>
                      <span className="original-price">
                        {selectedProduct.price}
                      </span>
                      <span className="sale-price">
                        {selectedProduct.salePrice}
                      </span>
                    </>
                  ) : (
                    <span>{selectedProduct.price}</span>
                  )}
                </div>
              </div>
              <div className="add-cart-container">
                <input
                  type="number"
                  min="1"
                  value={quantities[selectedProduct.id] || 1}
                  className="quantity-input"
                  onChange={(e) => handleQuantityChange(e, selectedProduct)}
                />

                <button
                  onClick={() => handleAddToCart(selectedProduct)}
                  className="add-to-cart-btn2"
                >
                  <img src={assets.cart_icon2} alt="add-cart-button2" />
                  ADD TO CART
                </button>
              </div>
              <div className="product-actions">
                <button
                  onClick={() => handleLike(selectedProduct)}
                  className="action-btn zoom-btn"
                >
                  <img src={assets.zoom_icon} alt="zoom-icon" />
                  ADD TO COMPARE
                </button>
                <button
                  onClick={() => handleLike(selectedProduct)}
                  className="action-btn zoom-btn"
                >
                  <img src={assets.like_icon} alt="like-icon" />
                  ADD TO WISHLIST
                </button>
              </div>
              <div className="product-description">
                <p className="product-category">
                  <h1>Categories:</h1> {selectedProduct.category}
                </p>

                <p className="product-category">
                  <h1>Tags: </h1> {selectedProduct.tags}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="popular-brand-container">
        <h1 className="popular-brand-title">Popular Brands</h1>
        <div className="brands">
          <a href="#">
            <img src={assets.brand1} alt="brand1" />
          </a>
          <a href="#">
            <img src={assets.brand2} alt="brand2" />
          </a>
          <a href="#">
            <img src={assets.brand3} alt="brand3" />
          </a>
          <a href="#">
            <img src={assets.brand4} alt="brand4" />
          </a>
          <a href="#">
            <img src={assets.brand5} alt="brand5" />
          </a>
          <a href="#">
            <img src={assets.brand6} alt="brand6" />
          </a>
        </div>
      </div>
      <div className="discount-container">
        <div className="image-wrapper">
          <a href="/shop">
            <img src={assets.discount_img1} alt="discount-img1" />
          </a>
          <div className="hover-border"></div>
        </div>
        <div className="image-wrapper">
          <a href="/shop">
            <img src={assets.discount_img2} alt="discount-img2" />
          </a>
          <div className="hover-border"></div>
        </div>
      </div>
      <div className="blog-update-container">
        <h1 className="blog-update-title">Blog Update</h1>
        <div className="blog-update-content">
          <div className="blog-update-card">
            <img src={assets.blog_update_img1} alt="blog_update_img1" />
            <a href="#">
              <h1 className="blog-update-type">MODELS</h1>
            </a>
            <a href="#">
              <h1 className="blog-update-name">
                WATCH THE MAGICALNEW TRAILER FOR A WRINKLE IN TIME
              </h1>
            </a>
          </div>
          <div className="blog-update-card">
            <img src={assets.blog_update_img2} alt="blog_update_img2" />
            <a href="#">
              <h1 className="blog-update-type">MODELS</h1>
            </a>
            <a href="#">
              <h1 className="blog-update-name">NEVER BUY A BORING COAT</h1>
            </a>
          </div>
          <div className="blog-update-card">
            <img src={assets.blog_update_img5} alt="blog_update_img3" />
            <a href="#">
              <h1 className="blog-update-type">MODELS</h1>
            </a>
            <a href="#">
              <h1 className="blog-update-name">COOK LIKE A TRUE SICILIAN!</h1>
            </a>
          </div>
        </div>
      </div>
      <div className="sale-container">
        <div className="sale-card">
          <img src={assets.discount_tag} alt="discount-tag" />
          <div className="sale-main-content">
            <h1 className="sale-title">40% off - code: letsparty</h1>
            <p>LIMITTED TIME ONLY</p>
          </div>
        </div>
        <div className="sale-card">
          <img src={assets.giftbox} alt="giftbox" />
          <div className="sale-main-content">
            <h1 className="sale-title">Free 48hr standard delivery</h1>
            <p>LIMITTED TIME ONLY, SHOP NOW!</p>
          </div>
        </div>
        <div className="sale-card">
          <img src={assets.percent} alt="percent" />
          <div className="sale-main-content">
            <h1 className="sale-title">10% student discount</h1>
            <p>EXCLUDES SALE, SHOP NOW!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
