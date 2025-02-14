import React, { useState } from "react";
import { resetPassword } from "../login/firebaseAuth";  // Hàm xử lý reset mật khẩu
import { Button, Form, Container, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await resetPassword(email);  // Gọi hàm resetPassword từ firebaseAuth
      setMessage("Kiểm tra email của bạn để đặt lại mật khẩu.");
    } catch (error) {
      setMessage("❌ " + error.message);  // Hiển thị lỗi nếu có
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="card p-4 shadow-sm" style={{ width: "100%", maxWidth: "400px" }}>
        <h2 className="text-center mb-4">Quên mật khẩu</h2>
        <Form onSubmit={handleResetPassword}>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Nhập email của bạn"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" className="w-100 mb-3" type="submit">
            Đặt lại mật khẩu
          </Button>

          <div className="text-center">
            <small>
              <span
                style={{ cursor: "pointer", textDecoration: "underline" }}
                onClick={() => navigate("/")}  // Điều hướng về trang login
              >
                Quay lại đăng nhập
              </span>
            </small>
          </div>
        </Form>

        {message && <Alert variant="info" className="mt-3">{message}</Alert>}
      </div>
    </Container>
  );
};

export default ForgetPassword;
