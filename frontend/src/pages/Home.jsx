import { useState, useEffect } from "react";
import { assets } from "./../assets/assets";
import ProductCard from "../components/ProductCard";
import "./Home.css";
import BlogList from "./Blog";
import BlogCard from "../components/BlogCard";

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragStartX, setDragStartX] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantities, setQuantities] = useState({});
  const [activeNavbar, setActiveNavbar] = useState("Best sellers");
  const [products, setProducts] = useState([]);
  const [productThemes, setProductThemes] = useState({});
  const [likedProducts, setLikedProducts] = useState(new Set());
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://localhost:3000/cosmetic/api/limit?category=${activeNavbar}&limit=5`);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [activeNavbar]);

  useEffect(() => {
    fetch("http://localhost:3000/blog/api")
      .then((response) => response.json())
      .then((data) => setBlogPosts(data))
      .catch((error) => console.error("Error fetching blog posts:", error));
  })

  // useEffect(() => {
  //   fetch("http://localhost:5000/productThemes")
  //     .then((response) => response.json())
  //     .then((data) => setProductThemes(data))
  //     .catch((error) => console.error("Error fetching product themes:", error));
  // }, []);

  const fetchWishlist = async () => {
    try {
      const userId = localStorage.getItem("userUID"); // Lấy userId từ localStorage
      if (!userId) {
        console.warn("Không tìm thấy userId trong localStorage");
        return;
      }

      const response = await fetch("http://localhost:3000/wishlist/api");
      const wishlist = await response.json();

      // Lọc danh sách wishlist theo userId
      const userWishlist = wishlist.filter(item => item.userUID === userId);
      const likedSet = new Set(userWishlist.map((item) => String(item.productId)));

      setLikedProducts(likedSet);
    } catch (error) {
      console.error("Lỗi khi tải wishlist:", error);
    }
  };


  // Gọi fetchWishlist khi component mount
  useEffect(() => {
    fetchWishlist();
  }, []);

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

  const handleLike = async (product) => {
    try {
      const userUID = localStorage.getItem("userUID");
      if (!userUID) {
        console.error("Không tìm thấy UID của người dùng.");
        return;
      }

      // Kiểm tra xem sản phẩm đã có trong wishlist chưa
      const response = await fetch(`http://localhost:3000/wishlist/api/${userUID}`, {
        cache: "no-store",
      });
      const wishlist = await response.json();

      // Tìm sản phẩm theo `productId`
      const existingItem = wishlist.find((item) => item.productId === product._id);

      if (existingItem) {
        // Nếu sản phẩm đã tồn tại, xóa nó
        await fetch(`http://localhost:3000/wishlist/api/remove/userId=${userUID}&productId=${product._id}`, {
          method: "DELETE",
        });
      } else {
        // Nếu chưa có, thêm vào wishlist
        await fetch("http://localhost:3000/wishlist/api/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: product.title,
            image: product.image,
            price: product.onSale ? product.salePrice : product.price,
            userId: userUID, // Đồng nhất với database
            productId: product._id,
          }),
        });
      }

      fetchWishlist(); // Cập nhật lại danh sách wishlist
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
      const userUID = localStorage.getItem("userId");

      if (!userUID) {
        console.error("Không tìm thấy UID người dùng.");
        return;
      }

      const cartId = `${product.id}_${userUID}`; // Tạo id mới theo format "id+uid"

      // Kiểm tra xem sản phẩm đã có trong giỏ hàng của user chưa
      const response = await fetch(`http://localhost:5000/cart/${cartId}`, {
        cache: "no-store",
      });

      if (response.ok) {
        // Nếu sản phẩm đã tồn tại, cập nhật số lượng
        const existingItem = await response.json();
        console.log("Cập nhật số lượng sản phẩm:", existingItem);

        await fetch(`http://localhost:5000/cart/${cartId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quantity: existingItem.quantity + quantity }),
        });

        alert(`Cập nhật số lượng ${product.title} trong giỏ hàng.`);
      } else {
        // Nếu sản phẩm chưa có, thêm mới vào giỏ hàng
        console.log("Thêm sản phẩm mới vào giỏ hàng");

        await fetch("http://localhost:5000/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: cartId, // ID mới theo format "id+uid"
            productId: product.id,
            title: product.title,
            image: product.image,
            price: product.onSale ? product.salePrice : product.price,
            quantity: quantity,
            userUID: userUID,
          }),
        });

        alert(`Đã thêm ${quantity} sản phẩm "${product.title}" vào giỏ hàng.`);
      }

      // Reset lại số lượng nhập vào
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [product.id]: 1,
      }));

      // Tải lại trang sau khi thêm vào giỏ hàng
      // window.location.reload();
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
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              handleLike={handleLike}
              likedProducts={likedProducts}
              handleView={handleView}
              handleAddToCart={handleAddToCart}
              selectedProduct={selectedProduct}
              handleCloseDetail={handleCloseDetail}
              handleQuantityChange={handleQuantityChange}
              quantities={quantities}
            />
          ))}
        </div>
      </div>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6" >
          {blogPosts.map((item) => (
            <BlogCard
              key={item._id}
              id={item._id}
              author={item.author}
              category={item.category}
              createdAt={item.createdAt}
              title={item.title}
              images={item.image?.[0] || "/default-image.jpg"}
            />
          ))}

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
