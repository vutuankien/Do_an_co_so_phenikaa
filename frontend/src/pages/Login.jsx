import React, { useState } from "react";
import axios from "axios";
import {
  loginWithEmailPassword,
  registerWithEmailPassword,
  loginWithGoogle,
} from "../login/firebaseAuth";
import { Button, Form, Container, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { FaLock, FaLockOpen } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import "./Login.css";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      console.log("Sending data:", { email, password });

      const response = await axios.post("http://localhost:3000/customer/api/register", {
        email,
        password,
        name: "User", // Giá trị mặc định
        address: "",
        photoURL: "https://i.pravatar.cc/150",
        phone: "",
        dob: ""
      });

      localStorage.setItem("uid", JSON.stringify(response.data.user._id));
      localStorage.setItem("userUID", JSON.stringify(response.data.user._id));

      localStorage.setItem("userEmail", response.data.user.email);

      console.log("Response:", response.data);
      setMessage("Đăng ký thành công!");
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      setError(error.response?.data?.message || "Lỗi khi đăng ký.");
    }
  };


  const handleGoogleLogin = async () => {
    setError("");
    setMessage("");

    try {
      const user = await loginWithGoogle();

      let response;
      try {
        // Gọi API đăng nhập không cần password
        response = await axios.post("http://localhost:3000/customer/api/login", {
          email: user.email,
          name: user.displayName,
          photoURL: user.photoURL,
          phone: "",
          dob: "",
          password: user.password
        });

        localStorage.setItem("uid", JSON.stringify(response.data.user._id));
        localStorage.setItem("userUID", JSON.stringify(response.data.user._id));
        localStorage.setItem("userEmail", response.data.user.email);
        setMessage("Đăng nhập Google thành công!");
        onLogin(response.data.user);
      } catch (error) {
        if (error.response?.status === 404) {
          // Nếu user chưa tồn tại, đăng ký mới
          const registerResponse = await axios.post("http://localhost:3000/customer/api/register", {
            email: user.email,
            name: user.displayName,
            photoURL: user.photoURL,
            password: user.password,
            phone: "",
            dob: ""
          });

          localStorage.setItem("uid", JSON.stringify(response.data.user._id));
          localStorage.setItem("userUID", JSON.stringify(response.data.user._id));
          localStorage.setItem("userEmail", registerResponse.data.user.email);
          setMessage("Đăng ký & đăng nhập Google thành công!");
          onLogin(registerResponse.data.user);
        } else {
          throw error;
        }
      }

      navigate("/user");
    } catch (error) {
      setError(error.response?.data?.message || "Đăng nhập Google thất bại.");
    }
  };




  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const response = await axios.post("http://localhost:3000/customer/api/login", {
        email, password  // Chỉ gửi email, bỏ password
      });

      setMessage("Đăng nhập thành công!");
      localStorage.setItem("userId", response.data.user._id);
      localStorage.setItem("userEmail", response.data.user.email);
      onLogin(response.data.user);
      navigate("/user");
    } catch (error) {
      setError(error.response?.data?.message || "Email không đúng hoặc chưa đăng ký.");
    }
  };



  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div
        className="card p-4 shadow-sm"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <h2 className="text-center mb-4">
          {isRegistering ? "Register" : "Login"}
        </h2>
        {error && <Alert variant="danger">{error}</Alert>}
        {message && <Alert variant="success">{message}</Alert>}
        <Form onSubmit={isRegistering ? handleRegister : handleLogin}>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <div className="icon-group">
              <input
                type="email"
                className="form-control rounded-0"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span className="icon-inside">
                <HiOutlineMail size={20} />
              </span>
            </div>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <div className="icon-group">
              <input
                type={isPasswordVisible ? "text" : "password"}
                className="form-control rounded-0"
                required
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="icon-inside"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                style={{ cursor: "pointer" }}
              >
                {isPasswordVisible ? <FaLockOpen /> : <FaLock />}
              </span>
            </div>
          </Form.Group>
          <div className="d-flex justify-content-between mb-3">
            <small>
              <span
                style={{ cursor: "pointer", textDecoration: "underline" }}
                onClick={() => navigate("/forgetpassword")}
              >
                Forgot password?
              </span>
            </small>
          </div>
          <Button variant="primary" className="w-100 mb-3" type="submit">
            {isRegistering ? "Register" : "Login"}
          </Button>
          <Button
            variant="outline-primary"
            className="w-100 mb-3 d-flex align-items-center justify-content-center"
            onClick={handleGoogleLogin}
          >
            <img
              src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
              alt="Google Logo"
              width="30"
              height="30"
              className="me-2"
            />
            Sign in with Google
          </Button>

          <div className="text-center">
            <small>
              {isRegistering ? (
                <>
                  Already have an account?{" "}
                  <span
                    style={{ cursor: "pointer", textDecoration: "underline" }}
                    onClick={() => setIsRegistering(false)}
                  >
                    Log in
                  </span>
                </>
              ) : (
                <>
                  Don't have an account?{" "}
                  <span
                    style={{ cursor: "pointer", textDecoration: "underline" }}
                    onClick={() => setIsRegistering(true)}
                  >
                    Register
                  </span>
                </>
              )}
            </small>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default Login;
