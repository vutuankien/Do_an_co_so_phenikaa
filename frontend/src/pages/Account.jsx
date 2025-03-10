import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Account.css";
import Breadcrumb from "../components/Breadcrumb";
import Info from "./Infor";
import Wishlist from "./Wishlist";
import Bill from "./Bill";
import Address from "./Address";
import { FaUser, FaMapMarkerAlt, FaHeart, FaShoppingCart } from "react-icons/fa";

const Account = () => {
    const [activeTab, setActiveTab] = useState("personal");
    const [userId, setUserId] = useState(null);
    const [user, setUser] = useState(null);
    const [wishlist, setWishlist] = useState([]);
    const [cart, setCart] = useState([]);
    const [userData, setUserData] = useState({ name: "", dob: "", address: "", phone: "", photoURL: "" });

    useEffect(() => {
        const uid = localStorage.getItem("userId");
        if (!uid) {
            console.error("Không tìm thấy UID trong localStorage");
            return;
        }

        axios.get(`http://localhost:5000/user?id=${uid}`)
            .then((response) => {
                if (response.data.length > 0) {
                    const userInfo = response.data[0];
                    setUser(userInfo);
                    setUserData(userInfo);
                    setUserId(userInfo.id);
                } else {
                    console.error("Người dùng không tồn tại");
                }
            })
            .catch((error) => console.error("Lỗi khi lấy thông tin người dùng:", error));
    }, []);

    useEffect(() => {
        if (userId) {
            axios.get(`http://localhost:5000/wishlist?userId=${userId}`)
                .then((response) => setWishlist(response.data))
                .catch((error) => console.error("Lỗi khi lấy danh sách yêu thích:", error));

            axios.get(`http://localhost:5000/cart?userId=${userId}`)
                .then((response) => setCart(response.data))
                .catch((error) => console.error("Lỗi khi lấy đơn hàng:", error));
        }
    }, [userId]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUserData({ ...userData, photoURL: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        if (!userId) return;

        axios.put(`http://localhost:5000/user/${userId}`, userData)
            .then((response) => {
                alert("Cập nhật thành công!");
                setUser(response.data);
            })
            .catch((error) => console.error("Lỗi khi cập nhật:", error));
    };

    const handleRemoveFromWishlist = (id) => {
        axios.delete(`http://localhost:5000/wishlist/${id}`)
            .then(() => {
                setWishlist(wishlist.filter(item => item.id !== id));
            })
            .catch((error) => console.error("Lỗi khi xóa sản phẩm khỏi wishlist:", error));
    };

    return (
        <div className="account-container">
            <div className="account-breadcrumb">
                <Breadcrumb />
            </div>
            <div className="account-main">
                <div className="account-sidebar">
                    <button className={activeTab === "personal" ? "active-tab" : ""} onClick={() => setActiveTab("personal")}>
                        <FaUser /> General information
                    </button>
                    <button className={activeTab === "address" ? "active-tab" : ""} onClick={() => setActiveTab("address")}>
                        <FaMapMarkerAlt /> Address
                    </button>
                    <button className={activeTab === "wishlist" ? "active-tab" : ""} onClick={() => setActiveTab("wishlist")}>
                        <FaHeart /> Wishlist
                    </button>
                    <button className={activeTab === "orders" ? "active-tab" : ""} onClick={() => setActiveTab("orders")}>
                        <FaShoppingCart /> Order
                    </button>
                </div>
                <div className="account-content">
                    {activeTab === "personal" && user && <Info user={user} userData={userData} setUserData={setUserData} handleFileChange={handleFileChange} handleUpdate={handleUpdate} />}
                    {activeTab === "wishlist" && <Wishlist wishlist={wishlist} handleRemoveFromWishlist={handleRemoveFromWishlist} />}
                    {activeTab === "orders" && <Bill cart={cart} />}
                    {activeTab === "address" && <Address userId={userId} />}

                </div>
            </div>
        </div>
    );
};

export default Account;
