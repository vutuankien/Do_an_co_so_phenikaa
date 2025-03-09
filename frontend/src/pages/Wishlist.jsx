import React from "react";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import "./Wishlist.css";

const Wishlist = ({ wishlist, handleRemoveFromWishlist }) => {
    return (
        <div className="wishlist-content">
            <h2>Your wishlist</h2>
            <ul className="wishlist-list">
                {wishlist.map(item => (
                    <li key={item.id} className="wishlist-item">
                        <Link to={`/product/${item.productId}`} className="wishlist-link">
                            <img src={item.image} alt={item.title} className="wishlist-image" />
                            <div className="wishlist-info">
                                <p className="wishlist-title">{item.title}</p>
                                <p className="wishlist-price">{item.price}</p>
                            </div>
                        </Link>
                        <button className="wishlist-remove" onClick={() => handleRemoveFromWishlist(item.id)}>
                            <FaTrash />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Wishlist;
