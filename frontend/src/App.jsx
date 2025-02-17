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
import Orders from "./pages/Orders";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ForgetPassword from "./login/resetpassword";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  // Kiểm tra localStorage khi tải trang
  useEffect(() => {
    const storedUserId = localStorage.getItem("userUID");
    console.log("User UID từ localStorage:", storedUserId);

    if (storedUserId) {
      setUserId(storedUserId);
    }
    setLoading(false);
  }, []);

  // Xử lý đăng nhập
  const handleLogin = (user) => {
    if (user?.uid) {
      console.log("Đăng nhập thành công:", user);
      localStorage.setItem("userUID", user.uid);
      setUserId(user.uid);
      navigate("/home");
    }
  };

  // Xử lý đăng xuất
  const handleLogout = () => {
    console.log("Đăng xuất...");
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
            <Route path="/shop" element={<Shop />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/place-order" element={<PlaceOrder />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="*" element={<Navigate to="/home" />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/" />} />
        )}
      </Routes>

      {!isAuthPage && <Footer />}
    </div>
  );
}

export default App;
