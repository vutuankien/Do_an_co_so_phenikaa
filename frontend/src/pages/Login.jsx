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
      const userCredential = await registerWithEmailPassword(email, password);
      const user = userCredential.user;
      const name = user.name || "New User";
  
      const response = await axios.get("http://localhost:5000/user");
      const users = response.data;
      const existingUser = users.find((u) => u.id === user.uid);
  
      if (!existingUser) {
        await axios.post("http://localhost:5000/user", { 
          id: user.uid, 
          email, 
          name, 
          password 
        });
        setMessage("Đăng ký thành công!");
      } else {
        setError("Người dùng đã tồn tại.");
      }
    } catch (error) {
      setError(error.message);
    }
  };
  
  const handleGoogleLogin = async () => {
    setError("");
    setMessage("");
  
    try {
      const user = await loginWithGoogle();
      const response = await axios.get("http://localhost:5000/user");
      const users = response.data;
      
      const existingUser = users.find((u) => u.id === user.id);
  
      if (!existingUser) {
        await axios.post("http://localhost:5000/user", {
          id: user.id, 
          email: user.email,
          name: user.name,
          photoURL: user.photoURL
        });
      }
  
      localStorage.setItem("userId", user.id);
      setMessage("Đăng nhập Google thành công!");
      onLogin(user);
      navigate("/user");
    } catch (error) {
      setError(error.message);
    }
  };
  
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
  
    try {
      const user = await loginWithEmailPassword(email, password);
      let name = user.name || "New User";
  
      const response = await axios.get("http://localhost:5000/user");
      const users = response.data;
      const existingUser = users.find((u) => u.id === user.id);
  
      if (existingUser) {
        name = existingUser.name;
      }
  
      if (!existingUser) {
        await axios.post("http://localhost:5000/user", {
          id: user.id,
          email: user.email,
          name,
          photoURL: user.photoURL
        });
      }
  
      setMessage("Đăng nhập thành công!");
      onLogin(user);
      navigate("/user");
    } catch (error) {
      setError("Email hoặc mật khẩu không đúng.");
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
