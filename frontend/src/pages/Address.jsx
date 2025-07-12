import React, { useState, useEffect } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";

const Address = () => {
    const [addresses, setAddresses] = useState([]);
    const [newAddress, setNewAddress] = useState("");
    const [uid, setUid] = useState(localStorage.getItem("userUID")?.replace(/"/g, '') || "");

    useEffect(() => {
        if (!uid) return;

        axios.get(`http://localhost:3000/address/api/${uid}`)
            .then(response => {
                console.log("API Response:", response.data); // Kiểm tra dữ liệu trả về

                if (Array.isArray(response.data)) {
                    setAddresses(response.data); // Gán thẳng mảng từ API vào state
                } else {
                    setAddresses([]); // Tránh lỗi nếu dữ liệu không đúng định dạng
                }

            })
            .catch(error => {
                if (error.response && error.response.status === 404) {
                    // axios.post(`http://localhost:3000/address/api/create`, {
                    //     userId: uid,
                    //     address: []
                    // })
                    //     .then(() => setAddresses([]))
                    //     .catch(err => console.error("Lỗi khi tạo mới địa chỉ:", err));
                    handleAddAddress();
                } else {
                    console.error("Lỗi khi lấy danh sách địa chỉ:", error);
                }
            });
    }, [uid]);


    const fetchAddresses = () => {
        if (!uid) return;

        axios.get(`http://localhost:3000/address/api/${uid}`)
            .then(response => {
                console.log("Fetch API Response:", response.data); // Kiểm tra dữ liệu

                if (Array.isArray(response.data)) {
                    setAddresses(response.data); // Gán thẳng mảng từ API vào state
                } else {
                    setAddresses([]); // Tránh lỗi nếu dữ liệu không đúng định dạng
                }

            })
            .catch(error => console.error("Lỗi khi lấy danh sách địa chỉ:", error));
    };
    // Thêm địa chỉ mới
    const handleAddAddress = () => {
        if (!newAddress.trim()) return;

        if (!window.confirm("Bạn có chắc chắn muốn thêm địa chỉ này không?")) {
            return;
        }

        const updatedAddresses = [
            ...addresses,
            { id: Date.now(), address: newAddress, default: addresses.length === 0 }
        ];

        axios.put(`http://localhost:3000/address/api/update/${uid}`, { addresses: updatedAddresses })
            .then(() => {
                setNewAddress("");  // Xóa ô input
                fetchAddresses();   // Gọi lại API để lấy danh sách mới nhất
            })
            .catch(error => console.error("Lỗi khi thêm địa chỉ:", error));
    };



    // Đặt địa chỉ mặc định
    const handleSetDefault = (id) => {
        if (!window.confirm("Bạn có chắc chắn muốn đặt địa chỉ này làm mặc định không?")) {
            return;
        }

        const updatedAddresses = addresses.map(addr =>
            ({ ...addr, default: addr.id === id })
        );

        axios.put(`http://localhost:3000/address/api/setDefault/${uid}`, { addresses: updatedAddresses })
            .then(() => setAddresses(updatedAddresses))
            .catch(error => console.error("Lỗi khi đặt địa chỉ mặc định:", error));
    };


    // Xóa địa chỉ
    const handleDelete = (id) => {
        if (!window.confirm("Bạn có chắc chắn muốn xóa địa chỉ này không?")) {
            return;
        }

        axios.delete(`http://localhost:3000/address/api/delete/${uid}/${id}`)
            .then(response => {
                setAddresses(response.data.address); // Cập nhật danh sách sau khi xóa
            })
            .catch(error => console.error("Lỗi khi xóa địa chỉ:", error));
    };

    return (
        <div className="card p-4">
            <h2 className="mb-4">Manage your address</h2>

            <div className="mb-3">
                <label className="form-label">Add new address:</label>
                <input
                    type="text"
                    className="form-control"
                    value={newAddress}
                    onChange={(e) => setNewAddress(e.target.value)}
                />
                <button
                    className="btn mt-2"
                    style={{ backgroundColor: "#0d6efd", borderColor: "#0d6efd", color: "#fff" }}
                    onClick={handleAddAddress}
                >
                    Add
                </button>

            </div>

            <ul className="list-group">
                {addresses.length > 0 ? (
                    addresses.map((addr) => (
                        <li key={addr.id} className="list-group-item d-flex justify-content-between align-items-center">
                            <span>
                                <i className="bi bi-geo-alt-fill me-2" style={{ color: "#fb9dab" }}></i>
                                {addr.address} {addr.default && <strong>(Default)</strong>}


                            </span>
                            <div>
                                {!addr.default && (
                                    <button className="btn btn-warning btn-sm me-2" onClick={() => handleSetDefault(addr.id)}>
                                        Set as default
                                    </button>
                                )}
                                <button
                                    className="btn btn-sm"
                                    style={{ backgroundColor: "#df1231", borderColor: "#fb9dab", color: "#fff" }}
                                    onClick={() => handleDelete(addr.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))
                ) : (
                    <p>Không có địa chỉ nào</p>
                )}
            </ul>
        </div>
    );
};

export default Address;
