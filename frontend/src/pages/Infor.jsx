import React, { useState } from "react";

const Info = ({ user, userData, setUserData, handleFileChange, handleUpdate }) => {
    return (
        <div className="card p-4">
            <h2 className="mb-4">Your information</h2>
            <div className="text-center mb-3">
                <label htmlFor="avatar-upload" className="d-inline-block">
                    <img
                        src={userData.photoURL || "default-avatar.png"}
                        alt="Avatar"
                        className="rounded-circle border"
                        style={{ width: 100, cursor: "pointer" }}
                    />
                </label>
                <input type="file" id="avatar-upload" className="d-none" onChange={handleFileChange} />
            </div>
            <form onSubmit={handleUpdate}>
                <div className="mb-3"><p><strong>Email:</strong> {user.email}</p></div>
                <div className="mb-3">
                    <label className="form-label">Tên:</label>
                    <input type="text" className="form-control" value={userData.name} onChange={(e) => setUserData({ ...userData, name: e.target.value })} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Ngày sinh:</label>
                    <input type="date" className="form-control" value={userData.dob || ""} onChange={(e) => setUserData({ ...userData, dob: e.target.value })} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Số điện thoại:</label>
                    <input type="tel" className="form-control" value={userData.phone || ""} onChange={(e) => setUserData({ ...userData, phone: e.target.value })} />
                </div>
                <button type="submit" className="btn btn-primary w-100">Update</button>
            </form>
        </div>
    );
};

export default Info;
