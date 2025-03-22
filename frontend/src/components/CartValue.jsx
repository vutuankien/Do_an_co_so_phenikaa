import React, { useState, useEffect } from "react";
import axios from "axios";

const CartValue = () => {
    const [cartCount, setCartCount] = useState(0);
    const uid = localStorage.getItem("userUID");

    useEffect(() => {
        if (!uid) {
            console.error("Không tìm thấy UID trong localStorage");
            setCartCount(0);
            return;
        }

        const fetchCartCount = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/cart?userUID=${uid}`);
                setCartCount(response.data.length);
            } catch (error) {
                console.error("Lỗi khi lấy giỏ hàng:", error);
                setCartCount(0);
            }
        };

        fetchCartCount();

        const interval = setInterval(fetchCartCount, 1000);

        return () => clearInterval(interval);
    }, [uid]);

    return cartCount;
};

export default CartValue;
