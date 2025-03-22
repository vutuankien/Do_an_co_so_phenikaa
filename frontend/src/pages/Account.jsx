import React, { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
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
    const [orders, setOrders] = useState([]);
    const [userData, setUserData] = useState({ name: "", dob: "", address: "", phone: "", photoURL: "" });

    useEffect(() => {
        const uid = localStorage.getItem("userUID")?.replace(/"/g, "");
        if (!uid || uid.length !== 24) { // ObjectId MongoDB có 24 ký tự
            console.error("UID không hợp lệ:", uid);
            return;
        }

        axios.get(`http://localhost:3000/customer/api/user?id=${uid}`)
            .then((response) => {
                if (response.data) {  // Kiểm tra object thay vì mảng
                    setUser(response.data);
                    setUserData(response.data);
                    setUserId(response.data._id);  // Dùng _id thay vì id
                } else {
                    console.error("User does not exist");
                }
            })
            .catch((error) => console.error("Error getting user information:", error));
    }, []);


    useEffect(() => {
        if (userId) {
            axios.get(`http://localhost:3000/wishlist/api/${userId}`)
                .then((response) => {
                    setWishlist(response.data); // Dữ liệu API đã lọc sẵn theo userId
                })
                .catch((error) => console.error("Error while retrieving wishlist:", error));

            axios.get(`http://localhost:5000/bill?userId=${userId}`)
                .then((response) => {
                    console.log("API Data:", response.data); // Debug

                    // Lọc chỉ lấy các đơn hàng (bỏ field "id")
                    const ordersArray = Object.keys(response.data)
                        .filter(key => key !== "id") // Bỏ key "id"
                        .map(key => ({ id: key, ...response.data[key] }));

                    console.log("Processed data:", ordersArray); // Debug
                    setOrders(ordersArray);
                })
                .catch((error) => console.error("Error when taking order:", error));
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

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!userId) {
            alert("User ID không hợp lệ!");
            return;
        }

        console.log("📌 userId gửi lên:", userId);

        try {
            const response = await axios.put(`http://localhost:3000/customer/api/update/${userId}`, userData);
            alert("Update successful!");
            setUser(response.data);
        } catch (error) {
            console.error("🔥 Lỗi khi cập nhật:", error.response?.data || error.message);
            alert("Cập nhật thất bại! Kiểm tra console để biết thêm.");
        }
    };

    const handleRemoveFromWishlist = (id) => {
        axios.delete(`http://localhost:3000/wishlist/api/remove?userId=${userId}&productId=${id}`)
            .then(() => {
                setWishlist(wishlist.filter(item => item.productId !== id));
            })
            .catch((error) => console.error("Error when removing product from wishlist:", error));

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
                    {activeTab === "orders" && <Bill orders={orders} />}
                    {activeTab === "address" && <Address userId={userId} />}
                </div>
            </div>
        </div>
    );
};

export default Account;
