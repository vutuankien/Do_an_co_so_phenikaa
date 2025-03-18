
import PropTypes from "prop-types";
import ProductCard from "./ProductCard";

const RelatedProducts = ({
  relatedProducts,
  likedProducts,
  handleLike,
  handleView,
  handleAddToCart,
  selectedProduct,
  handleCloseDetail,
  handleQuantityChange,
  quantities,
}) => {
  return (
    <div>
      <h2 className="related_title">Related Products</h2>
      <div className="related-products">
        {relatedProducts.length > 0 ? (
          relatedProducts.map((relatedProduct) => (
            <ProductCard
              key={relatedProduct.id}
              product={relatedProduct}
              likedProducts={likedProducts}
              handleLike={handleLike}
              handleView={handleView}
              handleAddToCart={handleAddToCart}
              selectedProduct={selectedProduct}
              handleCloseDetail={handleCloseDetail}
              handleQuantityChange={handleQuantityChange}
              quantities={quantities}
            />
          ))
        ) : (
          <p>No related products found.</p>
        )}
      </div>
    </div>
  );
};

// Định nghĩa kiểu dữ liệu của props
RelatedProducts.propTypes = {
  relatedProducts: PropTypes.array.isRequired,
  likedProducts: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleView: PropTypes.func.isRequired,
  handleAddToCart: PropTypes.func.isRequired,
  selectedProduct: PropTypes.object,
  handleCloseDetail: PropTypes.func.isRequired,
  handleQuantityChange: PropTypes.func.isRequired,
  quantities: PropTypes.object.isRequired,
};

export default RelatedProducts;
