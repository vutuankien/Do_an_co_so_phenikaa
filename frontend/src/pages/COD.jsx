import React from "react";
import shoppingCartIcon from "../assets/shopping-cart-18-svgrepo-com.svg";
import "./COD.css";

const COD = ({ show, onClose }) => {
    return (
        <div 
            className="cod fixed inset-0 flex flex-col items-center justify-center z-[9999] p-4 bg-black bg-opacity-50"
            style={{ display: show ? "flex" : "none" }}
        >
            <div className="boc flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow-lg relative">
                {/* Nút đóng */}
                <button
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-2xl font-bold"
                    onClick={onClose}
                >
                    ×
                </button>

                <img src={shoppingCartIcon} alt="Shopping Cart" width={200} height={200} className="mb-4" />
                
                <button className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition">
                    Order Confirmation
                </button>
            </div>
        </div>
    );
};

export default COD;
