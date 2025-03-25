import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Breadcrumb from "../components/Breadcrumb";
import { assets } from "../assets/assets";
import "./Home.css";
import "./ProductDetail.css";
// import ProductCard from "../components/ProductCard";
import RelatedProducts from "../components/RelatedProduct";

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

      const uid = localStorage.getItem("userUID")?.replace(/"/g, "");
      try {
        const response = await fetch(`http://localhost:3000/wishlist/api/${uid}`);
        const wishlist = await response.json();
        const likedSet = new Set(wishlist.map((item) => String(item.productId)));
        setLikedProducts(likedSet);
      } catch (error) {
        console.error("Lỗi khi tải wishlist:", error);
      }
    };


    fetchWishlist();
  }, []);

  useEffect(() => {
    if (!product) return; // Nếu chưa có sản phẩm, không chạy

    fetch("http://localhost:3000/cosmetic/api")
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data)) {
          console.error("Dữ liệu API không hợp lệ:", data);
          return;
        }

        // Chuyển đổi category từ chuỗi thành mảng nếu cần
        const normalizeCategories = (categories) =>
          categories.flatMap((cat) => cat.split(",").map((c) => c.trim()));

        const productCategories = normalizeCategories(product.category);

        const related = data.filter((item) => {
          if (item._id === product._id) return false;

          const itemCategories = normalizeCategories(item.category);
          const itemTags = item.tags || [];

          return (
            itemCategories.some((cat) => productCategories.includes(cat)) ||
            itemTags.some((tag) => product.tags.includes(tag))
          );
        });

        setRelatedProducts(related.slice(0, 4)); // Giới hạn 4 sản phẩm liên quan
      })
      .catch((error) => console.error("Lỗi khi tải danh sách sản phẩm:", error));
  }, [product]);

  useEffect(() => {
    fetch(`http://localhost:3000/cosmetic/api/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((error) => console.error("Lỗi khi tải chi tiết sản phẩm:", error));
  }, [id]);

  if (!product) return <h2>Loading...</h2>;


  const handleLike = async (product) => {
    try {
      const userUID = localStorage.getItem("userUID");
      if (!userUID) {
        console.error("Không tìm thấy UID của người dùng.");
        return;
      }

      // Gọi API lấy danh sách wishlist
      const response = await fetch(`http://localhost:3000/wishlist/api/${userUID}`, {
        cache: "no-store",
      });

      const wishlistData = await response.json();
      console.log("🚀 Wishlist data:", wishlistData);

      // Đảm bảo wishlist là một mảng
      const wishlist = Array.isArray(wishlistData) ? wishlistData : wishlistData.wishlist || [];

      // Kiểm tra xem sản phẩm đã tồn tại trong wishlist chưa
      const existingItem = wishlist.find((item) => item.productId === product._id);

      if (existingItem) {
        console.log(`🔴 Xóa sản phẩm ${product._id} khỏi wishlist`);
        await fetch(`http://localhost:3000/wishlist/api/remove?userId=${userUID}&productId=${product._id}`, {
          method: "DELETE",
        });
      } else {
        console.log(`🟢 Thêm sản phẩm ${product._id} vào wishlist`);
        await fetch("http://localhost:3000/wishlist/api/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: product.title,
            image: product.image,
            price: product.onSale ? product.salePrice : product.price,
            userId: userUID,
            productId: product._id,
          }),
        });
      }

      // Cập nhật lại danh sách wishlist
      fetchWishlist();
    } catch (error) {
      console.error("Lỗi khi thêm/xóa khỏi danh sách yêu thích:", error);
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
      const quantity = quantities[product._id] || 1;
      const userUID = localStorage.getItem("userUID");

      if (!userUID) {
        console.error("Không tìm thấy UID người dùng.");
        return;
      }

      console.log(`🛒 Thêm vào giỏ hàng: ${product.title} (Số lượng: ${quantity})`);

      const response = await fetch("http://localhost:3000/cart/api/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userUID,
          productId: product._id,
          title: product.title,
          image: product.image,
          price: product.onSale ? product.salePrice : product.price,
          quantity: quantity,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Thêm vào giỏ hàng thành công:", data);
        alert(`Đã thêm ${quantity} sản phẩm "${product.title}" vào giỏ hàng.`);
      } else {
        console.error("❌ Lỗi:", data.message);
        alert(`Lỗi: ${data.message}`);
      }

      // Reset lại số lượng nhập vào
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [product._id]: 1,
      }));
    } catch (error) {
      console.error("🔥 Lỗi khi thêm vào giỏ hàng:", error);
    }
  };

  const handleQuantityChange = (e, product) => {
    const quantity = Math.max(1, parseInt(e.target.value) || 1);
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [product._id]: quantity,
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
              value={quantities[product?._id] || 1}
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
      <RelatedProducts
        relatedProducts={relatedProducts}
        likedProducts={likedProducts}
        handleLike={handleLike}
        handleView={handleView}
        handleAddToCart={handleAddToCart}
        selectedProduct={selectedProduct}
        handleCloseDetail={handleCloseDetail}
        handleQuantityChange={handleQuantityChange}
        quantities={quantities}
      />

      {/* <h2 className="related_title">Related Products</h2>
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
      </div> */}
    </div>
  );
};

export default ProductDetail;
