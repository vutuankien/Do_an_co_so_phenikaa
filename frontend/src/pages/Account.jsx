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
        const uid = localStorage.getItem("userId");
        if (!uid) {
            console.error("UID not found in localStorage");
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
                    console.error("User does not exist");
                }
            })
            .catch((error) => console.error("Error getting user information:", error));
    }, []);

    useEffect(() => {
        if (userId) {
            axios.get(`http://localhost:5000/wishlist?userId=${userId}`)
                .then((response) => {
                    const userWishlist = response.data.filter(item => {
                        const parts = item.id.split("_");
                        return parts.length > 1 && parts[1] === userId;
                    });
                    setWishlist(userWishlist);
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

    const handleUpdate = (e) => {
        e.preventDefault();
        if (!userId) return;

        axios.put(`http://localhost:5000/user/${userId}`, userData)
            .then((response) => {
                alert("Update successful!");
                setUser(response.data);
            })
            .catch((error) => console.error("Error while updating:", error));
    };

    const handleRemoveFromWishlist = (id) => {
        axios.delete(`http://localhost:5000/wishlist/${id}`)
            .then(() => {
                setWishlist(wishlist.filter(item => item.id !== id));
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
