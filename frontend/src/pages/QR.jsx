import React from "react";
import QRImage from "../assets/QR.jpg";
import "./QR.css";

const Qr = ({ show, onClose }) => {
    return (
        <div className="qr fixed inset-0 flex flex-col items-center justify-center z-[9999] p-4 bg-black bg-opacity-50"
            style={{ display: show ? "flex" : "none" }}>
            <div className="boc flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow-lg relative">
                {/* Nút đóng */}
                <button 
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-2xl font-bold"
                    onClick={onClose}
                >
                    ×
                </button>

                <img src={QRImage} alt="QR Code" className="w-64 h-64 object-cover mb-4 rounded-lg shadow-lg" />
                <button className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition">
                    Order Confirmation
                </button>
            </div>
        </div>
    );
};

export default Qr;
