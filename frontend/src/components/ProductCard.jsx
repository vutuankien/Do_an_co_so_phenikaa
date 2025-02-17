import "./ProductCard.css";
import "../pages/Home.css";
import PropTypes from "prop-types";
import { assets } from "./../assets/assets";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({
  product,
  handleLike,
  likedProducts,
  handleAddToCart,
}) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantities, setQuantities] = useState({});
  const navigate = useNavigate();

  const handleView = (product) => {
    setSelectedProduct(product);
  };
  const handleCloseDetail = () => {
    setSelectedProduct(null);
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
    <div key={product.id} className="product-card">
      {product.onSale && <div className="product-sale-label">Sale!</div>}
      <img
        src={product.image}
        alt={product.title}
        className="product-image"
        onClick={() => navigate(`/product/${product.id}`)}
        style={{ cursor: "pointer" }}
      />

      <div className="hover-buttons">
        <div className="hover-btn-function">
          <button
            onClick={() => handleLike(product)}
            className={`hover-btn like-btn ${
              likedProducts.has(String(product.id)) ? "liked" : ""
            }`}
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

      {/* Thông tin sản phẩm */}
      <div className="product-info">
        <p className="product-category">{product.category.join(", ")}</p>
        <h3
          className="product-title"
          onClick={() => navigate(`/product/${product.id}`)}
          style={{ cursor: "pointer" }}
        >
          {product.title}
        </h3>
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
      {/* Nút Add to Cart */}
      <div className="product-footer">
        <button
          className="add-to-cart-btn"
          onClick={() => handleAddToCart(product)}
        >
          <img src={assets.cart_icon2} alt="add-cart-button" />
          ADD TO CART
        </button>
      </div>
      {selectedProduct?.id === product.id && (
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
              <div className="add-cart-container">
                <input
                  type="number"
                  min="1"
                  className="quantity-input"
                  value={quantities[selectedProduct.id] || 1}
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
                  <img src={assets.like_icon} alt="like-icon" />
                  ADD TO WISHLIST
                </button>
              </div>
              <div className="product-description">
                <p className="product-category">
                  <h1>Categories:</h1> {selectedProduct.category.join(", ")}
                </p>

                <p className="product-category">
                  <h1>Tags: </h1> {selectedProduct.tags.join(", ")}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  likedProducts: PropTypes.instanceOf(Set).isRequired,
  handleAddToCart: PropTypes.func.isRequired,
  quantities: PropTypes.object.isRequired,
};

export default ProductCard;
