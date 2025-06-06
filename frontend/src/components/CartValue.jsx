import React, { useState, useEffect } from "react";
import axios from "axios";

const CartValue = () => {
    const [cartCount, setCartCount] = useState(0);
    const uid = localStorage.getItem("userUID")?.replace(/"/g, ""); // Xóa dấu ngoặc nếu có

    useEffect(() => {
        if (!uid) {
            console.error("Không tìm thấy UID trong localStorage");
            setCartCount(0);
            return;
        }

        let isMounted = true;

        const fetchCartCount = async () => {
            try {
                const response = await axios.get(`https://do-an-co-so-phenikaa.onrender.com/cart/api/${uid}`);
                if (isMounted) {
                    const totalQuantity = response.data.reduce((sum, item) => sum + item.quantity, 0);
                    setCartCount(totalQuantity);
                }
            } catch (error) {
                console.error("Lỗi khi lấy giỏ hàng:", error);
                if (isMounted) setCartCount(0);
            }
        };


        fetchCartCount(); // Fetch ngay khi uid thay đổi

        // Cập nhật mỗi 5 giây
        const intervalId = setInterval(fetchCartCount, 1000);

        return () => {
            isMounted = false;
            clearInterval(intervalId); // Xóa interval khi component unmount
        };
    }, [uid]); // Chỉ chạy khi uid thay đổi

    return cartCount;
};

export default CartValue;
