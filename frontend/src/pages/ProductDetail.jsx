import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Breadcrumb from "../components/Breadcrumb";
import { assets } from "../assets/assets";
import "./Home.css";
import "./ProductDetail.css";
import ProductCard from "../components/ProductCard";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantities, setQuantities] = useState({});
  const [activeTab, setActiveTab] = useState("description");
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [likedProducts, setLikedProducts] = useState(new Set());
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await fetch("http://localhost:5000/wishlist");
        const wishlist = await response.json();
        const likedSet = new Set(wishlist.map((item) => String(item.id)));
        setLikedProducts(likedSet);
      } catch (error) {
        console.error("Lỗi khi tải wishlist:", error);
      }
    };

    fetchWishlist();
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/product")
      .then((res) => res.json())
      .then((data) => {
        if (!product) return;

        const related = data.filter(
          (item) =>
            item.id !== product.id &&
            (item.category.some((cat) => product.category.includes(cat)) ||
              item.tags.some((tag) => product.tags.includes(tag)))
        );

        setRelatedProducts(related.slice(0, 4)); // Lấy tối đa 4 sản phẩm liên quan
      })
      .catch((error) =>
        console.error("Lỗi khi tải danh sách sản phẩm:", error)
      );
  }, [product]);

  useEffect(() => {
    fetch(`http://localhost:5000/product/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((error) => console.error("Lỗi khi tải chi tiết sản phẩm:", error));
  }, [id]);

  if (!product) return <h2>Loading...</h2>;

  const handleLike = async (product) => {
    try {
      const response = await fetch("http://localhost:5000/wishlist", {
        cache: "no-store",
      });
      const wishlist = await response.json();
      const existingItem = wishlist.find(
        (item) => String(item.id) === String(product.id)
      );

      if (existingItem) {
        await fetch(`http://localhost:5000/wishlist/${existingItem.id}`, {
          method: "DELETE",
        });
        setLikedProducts((prevLiked) => {
          const newLiked = new Set(prevLiked);
          newLiked.delete(String(product.id));
          return newLiked;
        });
      } else {
        await fetch("http://localhost:5000/wishlist", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: String(product.id),
            title: product.title,
            image: product.image,
            price: product.onSale ? product.salePrice : product.price,
          }),
        });

        setLikedProducts((prevLiked) => {
          const newLiked = new Set(prevLiked);
          newLiked.add(String(product.id));
          return newLiked;
        });
      }
    } catch (error) {
      console.error("Lỗi khi thêm vào danh sách yêu thích:", error);
    }
  };

  const handleView = (product) => {
    setSelectedProduct(product);
  };
  const handleCloseDetail = () => {
    setSelectedProduct(null);
  };

  const handleAddToCart = async (product) => {
    try {
      const quantity = quantities[product.id] || 1;

      const response = await fetch("http://localhost:5000/cart", {
        cache: "no-store",
      });
      const cart = await response.json();

      console.log("Giỏ hàng hiện tại:", cart);

      const existingItem = cart.find(
        (item) => String(item.id) === String(product.id)
      );

      if (existingItem) {
        console.log("Cập nhật số lượng sản phẩm:", existingItem);

        await fetch(`http://localhost:5000/cart/${existingItem.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quantity: existingItem.quantity + quantity }),
        });

        alert(`Cập nhật số lượng ${product.title} trong giỏ hàng.`);
      } else {
        console.log("Thêm sản phẩm mới vào giỏ hàng");

        await fetch("http://localhost:5000/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: product.id,
            title: product.title,
            image: product.image,
            price: product.onSale ? product.salePrice : product.price,
            quantity: quantity,
          }),
        });

        alert(`Đã thêm ${quantity} sản phẩm "${product.title}" vào giỏ hàng.`);
      }

      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [product.id]: 1,
      }));
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error);
    }
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
    <div className="product_detail_modal">
      <Breadcrumb productTitle={product.title} showShop={true} />
      <div className="modal_content">
        <div className="modal-content-image">
          <img
            src={product.image}
            alt={product.title}
            className="detail_image"
          />
        </div>
        <div className="modal-main-content">
          <div className="product-info">
            {product.onSale && <div className="product-sale-label2">Sale!</div>}
            <h3 className="product-title2">{product.title}</h3>
            <div className="product-price2">
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
          <div className="add-cart-container">
            <input
              type="number"
              min="1"
              className="quantity-input"
              value={quantities[product?.id] || 1}
              onChange={(e) => handleQuantityChange(e, product)}
            />

            <button
              onClick={() => handleAddToCart(product)}
              className="add-to-cart-btn2"
            >
              <img src={assets.cart_icon2} alt="add-cart-button2" />
              ADD TO CART
            </button>
          </div>
          <div className="product-actions">
            <button
              onClick={() => handleLike(product)}
              className="action-btn zoom-btn"
            >
              <img src={assets.like_icon} alt="like-icon" />
              ADD TO WISHLIST
            </button>
          </div>
          <div className="product-description">
            <p className="product-category">
              <h1>Categories:</h1> {product.category.join(", ")}
            </p>

            <p className="product-category">
              <h1>Tags: </h1> {product.tags.join(", ")}
            </p>
          </div>
        </div>
      </div>
      <div className="product_more_info">
        <div className="info-tabs">
          <button
            className={activeTab === "description" ? "active" : ""}
            onClick={() => setActiveTab("description")}
          >
            Description
          </button>
          <button
            className={activeTab === "additional" ? "active" : ""}
            onClick={() => setActiveTab("additional")}
          >
            Additional Information
          </button>
          <button
            className={activeTab === "reviews" ? "active" : ""}
            onClick={() => setActiveTab("reviews")}
          >
            Reviews (0)
          </button>
        </div>

        <div className="info-content">
          {activeTab === "description" && (
            <div className="tab-content">
              <h2>Description</h2>
              {product.description.map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>
          )}
          {activeTab === "additional" && (
            <div className="tab-content">
              <h2>Additional Information</h2>
              <p>
                <strong>Brand:</strong> {product.brand}
              </p>
              <p>
                <strong>Country:</strong> {product.country}
              </p>
              <p>
                <strong>Features:</strong> {product.feature}
              </p>
              <p>
                <strong>Color:</strong> {product.color}
              </p>
            </div>
          )}
          {activeTab === "reviews" && (
            <div className="tab-content">
              <h2>Reviews</h2>
              <p>No reviews yet.</p>
            </div>
          )}
        </div>
      </div>
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

export default ProductDetail;
