import React, { useState } from "react";
import shoppingCartIcon from "../assets/shopping-cart-18-svgrepo-com.svg";
import "./COD.css";
import Loading from "../components/loading";
import emailjs from "emailjs-com";
import { FaTimes } from "react-icons/fa";

const COD = ({ show, onClose, selectedItems, cartItems, userId, selectedAddress, onOrderSuccess }) => {
    const [isLoading, setIsLoading] = useState(false);

    const calculateTotalPrice = (selectedProducts, shippingFee = 4.00) => {
        return selectedProducts.reduce((total, item) => {
            const priceNumber = parseFloat(item.price.replace(/[^0-9.]/g, ""));
            return total + priceNumber * item.quantity;
        }, shippingFee).toFixed(2);
    };

    const sendOrderEmail = async (orderId, userEmail, orderItems, totalCost) => {
        if (!userEmail) {
            console.error("Invalid user email!");
            return;
        }

        const costShipping = 4;
        const costTax = 0;

        function createProductArray() {
            return [
                "Volumizing-eyebrow-mascara-",
                "Eye-reviving-dark-circle-concealer-beige-chair-",
                "Waterproof-eyeliner-",
                "Long-wear-cream-eyeliner-noir-",
                "Waterproof-vinyl-eyeliner-prune-1-",
                "Perfect-gaze-dark-circle-concealer-biscuit-2-",
                "Eye-shadow-base-",
                "Fluid-foundation-",
                "Concealer-pistache-",
                "Shimmering-",
                "Eye-shadows-palette-smokey-shades-",
                "Ultra-matte-lipstick-",
                "Skin-perfector-foundation-",
                "Shimmering-illuminating-powder-"
            ];
        }

        const productNamesArray = createProductArray();

        const ordersArray = orderItems.map(item => ({
            image_url: `https://ld-wp73.template-help.com/woocommerce/prod_16812/v4/wp-content/uploads/2018/01/${productNamesArray[item.productId - 1]}400x400.png`,
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

    const handleOrderConfirmation = async () => {
        if (!selectedItems.length) {
            alert("No products selected!");
            return;
        }

        onClose();
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 2500));
        setIsLoading(false);

        try {
            const selectedProducts = cartItems.filter(item => selectedItems.includes(item.id));
            const totalPrice = calculateTotalPrice(selectedProducts);
            const orderDate = new Date().toISOString();

            //Lấy thông tin người dùng (email + phone)
            const userResponse = await fetch(`http://localhost:5000/user/${userId}`);
            if (!userResponse.ok) throw new Error("Error getting user information");
            const userData = await userResponse.json();
            const userEmail = userData.email;
            const userPhone = userData.phone;
            if (!userEmail) throw new Error("User email not found!");
            if (!userPhone) throw new Error("User phone number not found!");

            //Lấy địa chỉ giao hàng
            const addressResponse = await fetch("http://localhost:5000/address");
            if (!addressResponse.ok) throw new Error("Error getting address list");
            const addressData = await addressResponse.json();
            const userAddress = addressData.find(entry => String(entry.id) === String(userId));
            if (!userAddress || !Array.isArray(userAddress.addresses)) throw new Error("No valid address found!");
            const selectedAddressInfo = userAddress.addresses.find(addr => String(addr.id) === String(selectedAddress));
            if (!selectedAddressInfo) throw new Error("Address not found!");

            //Chuẩn bị dữ liệu đơn hàng
            const orderData = selectedProducts.map(item => ({
                productId: item.id.includes("_") ? item.id.split("_")[0] : item.id,
                productName: item.title,
                image: item.image,
                quantity: item.quantity,
                price: item.price,
            }));

            const billData = {
                bills: orderData,
                userId: userId,
                address: selectedAddressInfo.address,
                paymentMethod: "COD",
                status: "Shipping",
                orderDate,
                totalPrice,
                phone: userPhone, // ➡ Thêm số điện thoại
            };

            //Gửi đơn hàng lên server
            const response = await fetch("http://localhost:5000/bill", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(billData),
            });
            if (!response.ok) throw new Error(`Order error: ${response.statusText}`);

            const responseData = await response.json();
            const orderId = responseData.orderId;

            //Gửi email xác nhận
            // await sendOrderEmail(orderId, userEmail, orderData, totalPrice, userPhone);

            //Xóa sản phẩm khỏi giỏ hàng
            await Promise.all(selectedProducts.map(item =>
                fetch(`http://localhost:5000/cart/${item.id}`, { method: "DELETE" })
            ));

            alert(`Order successful! Total order value: ${totalPrice}₫`);
            onOrderSuccess();
            await sendOrderEmail(orderId, userEmail, orderData, totalPrice, userPhone);
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
