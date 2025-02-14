import PropTypes from "prop-types";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      {product.onSale && <span className="sale-badge">Sale!</span>}
      <img src={product.image} alt={product.name} className="product-image" />
      <p className="category">{product.category}</p>
      <h3 className="product-name">{product.name}</h3>
      <p className="price">
        <span className="original-price">${product.originalPrice}</span>
        <span className="sale-price">${product.salePrice}</span>
      </p>
    </div>
  );
};

// Thêm propTypes để kiểm tra dữ liệu đầu vào
ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    originalPrice: PropTypes.number.isRequired,
    salePrice: PropTypes.number.isRequired,
    onSale: PropTypes.bool,
    image: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProductCard;
