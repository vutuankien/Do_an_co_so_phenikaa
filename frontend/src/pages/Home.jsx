import { useState, useEffect } from "react";
import { assets } from "./../assets/assets";
import ProductCard from "../components/ProductCard";
import "./Home.css";

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragStartX, setDragStartX] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantities, setQuantities] = useState({});
  const [activeNavbar, setActiveNavbar] = useState("Best sellers");
  const [productThemes, setProductThemes] = useState({});
  const [likedProducts, setLikedProducts] = useState(new Set());

  useEffect(() => {
    fetch("http://localhost:5000/productThemes")
      .then((response) => response.json())
      .then((data) => setProductThemes(data))
      .catch((error) => console.error("Error fetching product themes:", error));
  }, []);

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
