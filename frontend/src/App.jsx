import { useState, useEffect } from "react";
import {
  Routes,
  Route,
  useNavigate,
  Navigate,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Shop from "./pages/Shop";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import ProductDetail from "./pages/ProductDetail";
import PlaceOrder from "./pages/PlaceOrder";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ForgetPassword from "./login/resetpassword";
import Account from "./pages/Account";
import Info from "./pages/Infor";
import Address from "./pages/Address";
import Wishlist from "./pages/Wishlist";
import Orders from "./pages/Orders";
import BlogDetails from "./pages/BlogDetails";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  // Kiểm tra localStorage khi tải trang
  useEffect(() => {
    const storedUserId = localStorage.getItem("userUID")?.replace(/"/g, "");
    console.log("User UID từ localStorage:", storedUserId);

    if (storedUserId) {
      setUserId(storedUserId);
      localStorage.setItem("uid", storedUserId);
      localStorage.setItem("userUID", storedUserId);

    }
    setLoading(false);
  }, []);

  // Xử lý đăng nhập
  const handleLogin = (user) => {
    if (user?.id) {
      console.log("Đăng nhập thành công:", user);
      localStorage.setItem("userId", user.id);
      localStorage.setItem("uid", storedUserId);
      localStorage.setItem("userUID", storedUserId);

      setUserId(user.id);
      navigate("/home");
    }
  };

  // Xử lý đăng xuất
  const handleLogout = () => {
    console.log("Đăng xuất...");
    localStorage.removeItem("userId");
    localStorage.removeItem("uid");
    localStorage.removeItem("userUID");

    setUserId(null);
    navigate("/");
  };

  // Kiểm tra xem có đang ở trang Login hoặc Quên mật khẩu không
  const isAuthPage = ["/", "/forgetpassword"].includes(location.pathname);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {!isAuthPage && <Navbar userId={userId} onLogout={handleLogout} />}

      <Routes>
        <Route path="/" element={<Login onLogin={handleLogin} />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        {userId ? (
          <>
            <Route path="/home" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogDetails />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/place-order" element={<PlaceOrder />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/account" element={<Account />} />
            <Route path="/info" element={<Info />} />
            <Route path="/address" element={<Address />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="*" element={<Navigate to="/home" />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/" />} />
        )}
      </Routes>

      {!isAuthPage && <Footer />}
    </div>
  );
};

export default App;
