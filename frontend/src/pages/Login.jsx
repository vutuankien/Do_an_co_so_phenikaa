import React, { useState } from "react";
import axios from "axios";
import { loginWithEmailPassword, registerWithEmailPassword, loginWithGoogle } from "../login/firebaseAuth";
import { Button, Form, Container, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { FaLock, FaLockOpen } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import './Login.css';

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
      const newUser = { email, name, uid: user.uid, password };

      const response = await axios.get("http://localhost:3000/user");
      const users = response.data;
      const existingUser = users.find((u) => u.email === email);

      if (!existingUser) {
        await axios.post("http://localhost:3000/user", newUser);
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
      const response = await axios.get("http://localhost:3000/user");
      const users = response.data;
      const existingUser = users.find((u) => u.uid === user.uid);
      if (!existingUser) {
        await axios.post("http://localhost:3000/user", {
          email: user.email,
          uid: user.uid,
          name: user.name,
          photoURL: user.photoURL,
        });
      }
      localStorage.setItem('userUid', user.uid);
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
      const response = await axios.get("http://localhost:3000/user");
      const users = response.data;
      const existingUser = users.find((u) => u.uid === user.uid);
      if (existingUser) {
        name = existingUser.name;
      }
      if (!existingUser) {
        await axios.post("http://localhost:3000/user", {
          email: user.email,
          uid: user.uid,
          name: name,
          photoURL: user.photoURL,
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
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="card p-4 shadow-sm" style={{ width: "100%", maxWidth: "400px" }}>
        <h2 className="text-center mb-4">{isRegistering ? "Đăng ký" : "Đăng nhập"}</h2>
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
                placeholder="Nhập email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span className="icon-inside">
                <HiOutlineMail size={20} />
              </span>
            </div>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Mật khẩu</Form.Label>
            <div className="icon-group">
              <input
                type={isPasswordVisible ? "text" : "password"}
                className="form-control rounded-0"
                required
                placeholder="Nhập mật khẩu"
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
                Quên mật khẩu?
              </span>
            </small>
          </div>
          <Button variant="primary" className="w-100 mb-3" type="submit">
            {isRegistering ? "Đăng ký" : "Đăng nhập"}
          </Button>
          <Button variant="outline-primary" className="w-100 mb-3 d-flex align-items-center justify-content-center" onClick={handleGoogleLogin}>
            <img src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png" alt="Google Logo" width="30" height="30" className="me-2" />
            Đăng nhập bằng Google
          </Button>

          <div className="text-center">
            <small>
              {isRegistering ? (
                <>Đã có tài khoản? <span style={{ cursor: "pointer", textDecoration: "underline" }} onClick={() => setIsRegistering(false)}>Đăng nhập</span></>
              ) : (
                <>Chưa có tài khoản? <span style={{ cursor: "pointer", textDecoration: "underline" }} onClick={() => setIsRegistering(true)}>Đăng ký</span></>
              )}
            </small>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default Login;