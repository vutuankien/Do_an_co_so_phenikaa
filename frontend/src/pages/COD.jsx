import React, { useEffect, useState } from "react";
import shoppingCartIcon from "../assets/shopping-cart-18-svgrepo-com.svg";
import "./COD.css";
import Loading from "../components/loading";
import emailjs from "emailjs-com";
import { FaTimes } from "react-icons/fa";

const COD = ({ show, onClose, selectedItems, cartItems, userId, selectedAddress, onOrderSuccess }) => {
    const [isLoading, setIsLoading] = useState(false);

    const calculateTotalPrice = (selectedItems, shippingFee = 4.00) => {
        return selectedItems.reduce((total, item) => {
            const priceNumber = parseFloat(item.price.replace(/[^0-9.]/g, ""));
            return total + priceNumber * item.quantity;
        }, shippingFee).toFixed(2);
    };

    // const fetchProductDetails = async (productIds) => {
    //     try {
    //         const response = await fetch("http://localhost:3000/cosmetic/api", {  // Đổi API URL nếu cần
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify({ productIds }), // Gửi productIds dưới dạng JSON
    //         });

    //         if (!response.ok) {
    //             throw new Error(`HTTP error! Status: ${response.status}`);
    //         }

    //         const data = await response.json();
    //         return data; // Trả về danh sách sản phẩm đầy đủ
    //     } catch (error) {
    //         console.error("❌ Error fetching products:", error);
    //         return [];
    //     }
    // };


    const sendOrderEmail = async (orderId, userEmail, orderItems, totalCost) => {
        if (!userEmail) {
            console.error("Invalid user email!");
            return;
        }

        const costShipping = 4;
        const costTax = 0;

        const ordersArray = orderItems.map(item => ({
            image_url: item.image,
            name: item.productName,
            units: item.quantity,
            price: `$${parseFloat(item.price.toString().replace(/[^0-9.]/g, "")).toFixed(2)}`
        }));

        const emailParams = {
            order_id: orderId,
            email: userEmail,
            orders: ordersArray,
            cost_total: `$${parseFloat(totalCost).toFixed(2)}`,
            cost_shipping: `$${costShipping.toFixed(2)}`,
            cost_tax: `$${costTax.toFixed(2)}`
        };

        try {
            await emailjs.send("service_lfaksjo", "template_wnts25s", emailParams, "r6ZCQ-fMoTFV3YDKI");
            console.log(`✅ Email sent successfully to ${userEmail}`);
        } catch (error) {
            console.error("❌ Error sending email:", error);
        }
    };

    useEffect(() => {
        console.log("🛒 Selected Items:", selectedItems);
    }, [selectedItems])
    const handleOrderConfirmation = async () => {
        if (!selectedItems || !selectedItems.length) {
            alert("Giỏ hàng của bạn đang trống!");
            return;
        }

        onClose();
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 2500));
        setIsLoading(false);

        try {
            const totalPrice = calculateTotalPrice(selectedItems);
            const orderDate = new Date().toISOString();
            let userPhone = "";
            let userEmail = "";

            // Lấy thông tin user
            try {
                const userResponse = await fetch(`http://localhost:3000/customer/api/user?id=${userId}`);
                if (!userResponse.ok) throw new Error(`Error getting user information: ${userResponse.statusText}`);

                const userData = await userResponse.json();

                userEmail = userData.email?.trim();
                userPhone = userData.phone?.trim();

                if (!userEmail || !userPhone) throw new Error("Missing user email or phone!");
            } catch (error) {
                console.error("Fetch user error:", error.message);
                alert(error.message);
                return;
            }

            // Lấy địa chỉ giao hàng
            let selectedAddressInfo = null;
            try {
                const addressResponse = await fetch(`http://localhost:3000/address/api/${userId}`);
                if (!addressResponse.ok) throw new Error("Error getting address list");

                const addressData = await addressResponse.json();

                if (!Array.isArray(addressData) || addressData.length === 0) {
                    throw new Error("No valid address data found!");
                }

                selectedAddressInfo = addressData.find(addr => String(addr._id) === String(selectedAddress)) ||
                    addressData.find(addr => addr.default === true);

                if (!selectedAddressInfo) throw new Error("No valid address found for this user!");
            } catch (error) {
                console.error("Error:", error.message);
                alert(error.message);
                return;
            }

            // Chuẩn bị dữ liệu đơn hàng
            const orderData = selectedItems.map(item => ({
                productId: item.productId,
                productName: item.title,
                image: item.image,
                quantity: item.quantity,
                price: item.price,
            }));

            if (!selectedAddressInfo || !selectedAddressInfo.address) {
                alert("No valid shipping address found!");
                return;
            }

            const billData = {
                bills: orderData,
                userId,
                address: selectedAddressInfo.address,
                paymentMethod: "COD",
                status: "Pending",
                orderDate,
                totalPrice,
                phone: userPhone,
            };

            console.log("📦 Sending order data:", billData);

            const response = await fetch("http://localhost:3000/bill/api/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(billData),
            });

            const responseData = await response.json();
            console.error("🚨 Server response:", responseData);

            if (!response.ok) throw new Error(`Order error: ${response.statusText}`);

            const orderId = responseData.bill._id;

            // Gửi email xác nhận
            await sendOrderEmail(orderId, userEmail, orderData, totalPrice);

            // Xóa sản phẩm khỏi giỏ hàng
            await Promise.all(selectedItems.map(item =>
                fetch(`http://localhost:3000/cart/api/delete/${userId}/${item.productId}`, { method: "DELETE" })
            ));

            alert(`Order successful! Total order value: ${totalPrice}₫`);
            onOrderSuccess();
        } catch (error) {
            alert(error.message);
        }
    };



    return (
        <div>
            {isLoading && <Loading />}
            {!isLoading && show && (
                <div
                    className="cod fixed inset-0 flex flex-col items-center justify-center z-[9999] p-4 bg-black bg-opacity-50"
                    style={{ display: show ? "flex" : "none" }}
                >
                    <div className="boc flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow-lg relative">
                        <button
                            className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-2xl font-bold"
                            onClick={onClose}
                        >
                            <FaTimes />
                        </button>

                        <img src={shoppingCartIcon} alt="Shopping Cart" width={200} height={200} className="mb-4" />

                        <button
                            className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
                            onClick={handleOrderConfirmation}
                        >
                            Order Confirmation
                        </button>
                    </div>
                </div>
            )}
        </div>

    );
};

export default COD;
