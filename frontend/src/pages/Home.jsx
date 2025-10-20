// import { useState, useEffect } from "react";
// import { assets } from "./../assets/assets";
// import ProductCard from "../components/ProductCard";
// import "./Home.css";
// import "../components/ProductCard.css";
// import BlogList from "./Blog";
// import BlogCard from "../components/BlogCard";

// const Home = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [dragStartX, setDragStartX] = useState(null);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [quantities, setQuantities] = useState({});
//   const [activeNavbar, setActiveNavbar] = useState("Best sellers");
//   const [products, setProducts] = useState([]);
//   const [productThemes, setProductThemes] = useState({});
//   const [likedProducts, setLikedProducts] = useState(new Set());
//   const [blogPosts, setBlogPosts] = useState([]);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await fetch(
//           `https://backend-doancoso.onrender.com/cosmetic/api/limit?category=${activeNavbar}&limit=5`
//         );
//         const data = await response.json();
//         setProducts(data);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };

//     fetchProducts();
//   }, [activeNavbar]);

//   useEffect(() => {
//     fetch("https://backend-doancoso.onrender.com/blog/api")
//       .then((response) => response.json())
//       .then((data) => setBlogPosts(data))
//       .catch((error) => console.error("Error fetching blog posts:", error));
//   });

//   const fetchWishlist = async () => {
//     const uid = localStorage.getItem("userUID")?.replace(/"/g, "");
//     try {
//       const response = await fetch(
//         `https://backend-doancoso.onrender.com/wishlist/api/${uid}`
//       );
//       const wishlist = await response.json();
//       const likedSet = new Set(wishlist.map((item) => String(item.productId)));
//       setLikedProducts(likedSet);
//     } catch (error) {
//       console.error("Lỗi khi tải wishlist:", error);
//     }
//   };

//   // Gọi fetchWishlist khi component mount
//   useEffect(() => {
//     fetchWishlist();
//   }, []);

//   const slides = [
//     { id: 1, image: assets.banner_img1, alt: "Slide 1" },
//     { id: 2, image: assets.banner_img2, alt: "Slide 2" },
//     { id: 3, image: assets.banner_img3, alt: "Slide 3" },
//   ];

//   const texts = [
//     "FAN FAVE LIPPIES IN NEW, SUPER RICH COLORS",
//     "BEST MAKEUP SECRETS & LOOKS FOR A DATE NIGHT",
//     "BEST TIPS TO ACHIEVE PERFECT WINTERFACE",
//   ];

//   const nextSlide = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
//   };

//   const prevSlide = () => {
//     setCurrentIndex(
//       (prevIndex) => (prevIndex - 1 + slides.length) % slides.length
//     );
//   };

//   const handleDragStart = (e) => {
//     setDragStartX(e.clientX || e.touches[0].clientX);
//   };

//   const handleDragEnd = (e) => {
//     const endX = e.clientX || e.changedTouches[0].clientX;
//     if (dragStartX !== null) {
//       const deltaX = dragStartX - endX;
//       if (deltaX > 50) {
//         nextSlide();
//       } else if (deltaX < -50) {
//         prevSlide();
//       }
//     }
//     setDragStartX(null);
//   };

//   const handleNavbarClick = (title) => {
//     setActiveNavbar(title);
//   };

//   const handleLike = async (product) => {
//     try {
//       const userUID = localStorage.getItem("userUID");
//       if (!userUID) {
//         console.error("Không tìm thấy UID của người dùng.");
//         return;
//       }

//       // Gọi API lấy danh sách wishlist
//       const response = await fetch(
//         `https://backend-doancoso.onrender.com/wishlist/api/${userUID}`,
//         {
//           cache: "no-store",
//         }
//       );

//       const wishlistData = await response.json();
//       console.log("🚀 Wishlist data:", wishlistData);

//       // Đảm bảo wishlist là một mảng
//       const wishlist = Array.isArray(wishlistData)
//         ? wishlistData
//         : wishlistData.wishlist || [];

//       // Kiểm tra xem sản phẩm đã tồn tại trong wishlist chưa
//       const existingItem = wishlist.find(
//         (item) => item.productId === product._id
//       );

//       if (existingItem) {
//         console.log(`🔴 Xóa sản phẩm ${product._id} khỏi wishlist`);
//         await fetch(
//           `https://backend-doancoso.onrender.com/wishlist/api/remove?userId=${userUID}&productId=${product._id}`,
//           {
//             method: "DELETE",
//           }
//         );
//       } else {
//         console.log(`🟢 Thêm sản phẩm ${product._id} vào wishlist`);
//         await fetch("https://backend-doancoso.onrender.com/wishlist/api/add", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             title: product.title,
//             image: product.image,
//             price: product.onSale ? product.salePrice : product.price,
//             userId: userUID,
//             productId: product._id,
//           }),
//         });
//       }

//       // Cập nhật lại danh sách wishlist
//       fetchWishlist();
//     } catch (error) {
//       console.error("Lỗi khi thêm/xóa khỏi danh sách yêu thích:", error);
//     }
//   };

//   const handleView = (product) => {
//     setSelectedProduct(product);
//   };
//   const handleCloseDetail = () => {
//     setSelectedProduct(null);
//   };

//   const handleAddToCart = async (product) => {
//     try {
//       const quantity = quantities[product._id] || 1;
//       const userUID = localStorage.getItem("userUID");

//       if (!userUID) {
//         console.error("Không tìm thấy UID người dùng.");
//         return;
//       }

//       console.log(
//         `🛒 Thêm vào giỏ hàng: ${product.title} (Số lượng: ${quantity})`
//       );

//       const response = await fetch(
//         "https://backend-doancoso.onrender.com/cart/api/add",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             userId: userUID,
//             productId: product._id,
//             title: product.title,
//             image: product.image,
//             price: product.onSale ? product.salePrice : product.price,
//             quantity: quantity,
//           }),
//         }
//       );

//       const data = await response.json();

//       if (response.ok) {
//         console.log("Thêm vào giỏ hàng thành công:", data);
//         alert(`Đã thêm ${quantity} sản phẩm "${product.title}" vào giỏ hàng.`);
//       } else {
//         console.error("❌ Lỗi:", data.message);
//         alert(`Lỗi: ${data.message}`);
//       }

//       // Reset lại số lượng nhập vào
//       setQuantities((prevQuantities) => ({
//         ...prevQuantities,
//         [product._id]: 1,
//       }));
//     } catch (error) {
//       console.error("🔥 Lỗi khi thêm vào giỏ hàng:", error);
//     }
//   };

//   const handleQuantityChange = (e, product) => {
//     const quantity = Math.max(1, parseInt(e.target.value) || 1);
//     setQuantities((prevQuantities) => ({
//       ...prevQuantities,
//       [product._id]: quantity,
//     }));
//     console.log(`Số lượng sản phẩm ${product.title}:`, quantity);
//   };

//   return (
//     <div className="home-container">
//       <div
//         className="banner-container"
//         onMouseDown={handleDragStart}
//         onMouseUp={handleDragEnd}
//         onTouchStart={handleDragStart}
//         onTouchEnd={handleDragEnd}
//       >
//         {slides.map((slide, index) => (
//           <img
//             key={slide.id}
//             src={slide.image}
//             alt={slide.alt}
//             className={index === currentIndex ? "active" : ""}
//           />
//         ))}
//         <div className={`text-box text-box-${currentIndex + 1}`}>
//           {texts[currentIndex]}
//           <button className="discover-btn">Discover Now</button>
//         </div>
//         <button onClick={prevSlide} className="control prev">
//           &#10094;
//         </button>
//         <button onClick={nextSlide} className="control next">
//           &#10095;
//         </button>
//       </div>
//       <div className="image-content-container">
//         <div className="image-content">
//           <img src={assets.image_content1} alt="img-content1" />
//           <a href="">
//             <div className="image-content-title">
//               <h1>FACE</h1>
//               MAKEUP
//             </div>
//           </a>
//         </div>
//         <div className="image-content">
//           <img src={assets.image_content2} alt="img-content1" />
//           <a href="">
//             <div className="image-content-title">
//               <h1>EYE</h1>
//               MAKEUP
//             </div>
//           </a>
//         </div>
//         <div className="image-content">
//           <img src={assets.image_content3} alt="img-content1" />
//           <a href="">
//             <div className="image-content-title">
//               <h1>LIP</h1>
//               MAKEUP
//             </div>
//           </a>
//         </div>
//         <div className="image-content">
//           <img src={assets.image_content4} alt="img-content1" />
//           <a href="">
//             <div className="image-content-title">
//               <h1>GIFT SET</h1>
//               MAKEUP KITS
//             </div>
//           </a>
//         </div>
//       </div>
//       <div className="product-container">
//         <div className="product-container-navbar">
//           {["Best sellers", "New arrivals", "Items sale"].map((title) => {
//             const isActive = activeNavbar === title;
//             return (
//               <div
//                 key={title}
//                 className={`navbar-title ${isActive ? "active" : ""}`}
//                 onClick={() => handleNavbarClick(title)}
//               >
//                 <span>{title}</span>
//               </div>
//             );
//           })}
//         </div>
//         <div className="product-container-card">
//           {products.map((product) => (
//             <ProductCard
//               key={product._id}
//               product={product}
//               handleLike={handleLike}
//               likedProducts={likedProducts}
//               handleView={handleView}
//               handleAddToCart={handleAddToCart}
//               selectedProduct={selectedProduct}
//               handleCloseDetail={handleCloseDetail}
//               handleQuantityChange={handleQuantityChange}
//               quantities={quantities}
//             />
//           ))}
//         </div>
//       </div>
//       <div className="popular-brand-container">
//         <h1 className="popular-brand-title">Popular Brands</h1>
//         <div className="brands">
//           <a href="#">
//             <img src={assets.brand1} alt="brand1" />
//           </a>
//           <a href="#">
//             <img src={assets.brand2} alt="brand2" />
//           </a>
//           <a href="#">
//             <img src={assets.brand3} alt="brand3" />
//           </a>
//           <a href="#">
//             <img src={assets.brand4} alt="brand4" />
//           </a>
//           <a href="#">
//             <img src={assets.brand5} alt="brand5" />
//           </a>
//           <a href="#">
//             <img src={assets.brand6} alt="brand6" />
//           </a>
//         </div>
//       </div>
//       <div className="discount-container">
//         <div className="image-wrapper">
//           <a href="/shop">
//             <img src={assets.discount_img1} alt="discount-img1" />
//           </a>
//           <div className="hover-border"></div>
//         </div>
//         <div className="image-wrapper">
//           <a href="/shop">
//             <img src={assets.discount_img2} alt="discount-img2" />
//           </a>
//           <div className="hover-border"></div>
//         </div>
//       </div>
//       <div className="blog-update-container">
//         <h1 className="blog-update-title">Blog Update</h1>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {blogPosts.map((item) => (
//             <BlogCard
//               key={item._id}
//               id={item._id}
//               author={item.author}
//               category={item.category}
//               createdAt={item.createdAt}
//               title={item.title}
//               images={item.image?.[0] || "/default-image.jpg"}
//             />
//           ))}
//         </div>
//       </div>
//       <div className="sale-container">
//         <div className="sale-card">
//           <img src={assets.discount_tag} alt="discount-tag" />
//           <div className="sale-main-content">
//             <h1 className="sale-title">40% off - code: letsparty</h1>
//             <p>LIMITTED TIME ONLY</p>
//           </div>
//         </div>
//         <div className="sale-card">
//           <img src={assets.giftbox} alt="giftbox" />
//           <div className="sale-main-content">
//             <h1 className="sale-title">Free 48hr standard delivery</h1>
//             <p>LIMITTED TIME ONLY, SHOP NOW!</p>
//           </div>
//         </div>
//         <div className="sale-card">
//           <img src={assets.percent} alt="percent" />
//           <div className="sale-main-content">
//             <h1 className="sale-title">10% student discount</h1>
//             <p>EXCLUDES SALE, SHOP NOW!</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;
import { useState, useEffect } from "react";
import { assets } from "./../assets/assets";
import ProductCard from "../components/ProductCard";
import "./Home.css";
import "../components/ProductCard.css";
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

  const API = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `${API}/cosmetic/api/limit?category=${activeNavbar}&limit=5`,
          { credentials: "include" }
        );
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [activeNavbar]);

  useEffect(() => {
    fetch(`${API}/blog/api`, { credentials: "include" })
      .then((response) => response.json())
      .then((data) => setBlogPosts(data))
      .catch((error) => console.error("Error fetching blog posts:", error));
  }, []); // add empty deps to avoid continuous fetch

  const fetchWishlist = async () => {
    const uid = localStorage.getItem("userUID")?.replace(/"/g, "");
    if (!uid) return;
    try {
      const response = await fetch(`${API}/wishlist/api/${uid}`, {
        credentials: "include",
        cache: "no-store",
      });
      const wishlist = await response.json();
      const likedSet = new Set(wishlist.map((item) => String(item.productId)));
      setLikedProducts(likedSet);
    } catch (error) {
      console.error("Lỗi khi tải wishlist:", error);
    }
  };

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
      const userUID = localStorage.getItem("userUID")?.replace(/"/g, "");
      if (!userUID) {
        console.error("Không tìm thấy UID của người dùng.");
        return;
      }

      const response = await fetch(`${API}/wishlist/api/${userUID}`, {
        credentials: "include",
        cache: "no-store",
      });

      const wishlistData = await response.json();
      const wishlist = Array.isArray(wishlistData)
        ? wishlistData
        : wishlistData.wishlist || [];

      const existingItem = wishlist.find(
        (item) => item.productId === product._id
      );

      if (existingItem) {
        await fetch(
          `${API}/wishlist/api/remove?userId=${userUID}&productId=${product._id}`,
          { method: "DELETE", credentials: "include" }
        );
      } else {
        await fetch(`${API}/wishlist/api/add`, {
          method: "POST",
          credentials: "include",
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
      const userUID = localStorage.getItem("userUID")?.replace(/"/g, "");

      if (!userUID) {
        console.error("Không tìm thấy UID người dùng.");
        return;
      }

      const response = await fetch(`${API}/cart/api/add`, {
        method: "POST",
        credentials: "include",
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
        alert(`Đã thêm ${quantity} sản phẩm "${product.title}" vào giỏ hàng.`);
      } else {
        alert(`Lỗi: ${data.message}`);
      }

      setQuantities((prev) => ({ ...prev, [product._id]: 1 }));
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
              key={product._id}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
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
