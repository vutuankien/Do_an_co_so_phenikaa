import React from "react";

const Bill = ({ cart }) => {
    return (
        <div className="orders-content">
            <h2>Your orders</h2>
            <ul>
                {cart.map(order => (
                    <li key={order.id}>{order.productName} - {order.status}</li>
                ))}
            </ul>
        </div>
    );
};

export default Bill;
