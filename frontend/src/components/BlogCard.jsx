import React from "react";
import { useNavigate } from "react-router-dom";

const BlogCard = ({ id, images, author, category, createdAt, title }) => {
    const navigate = useNavigate();

    return (
        <div
            className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer"
            onClick={() => navigate(`/blog/${id}`)}
        >
            <img className="w-full h-64 object-cover" src={images} alt="Blog Cover" />
            <div className="p-6">
                <div className="flex items-center space-x-2 text-gray-500 text-sm">
                    <span className="text-pink-500 font-semibold">{author}</span>
                    <span>·</span>
                    <span>In {category}</span>
                </div>
                <p className="text-gray-500 text-sm mt-1">{createdAt}</p>
                <h2 className="text-xl font-bold mt-3 text-gray-900">{title}</h2>
            </div>
        </div>
    );
};

export default BlogCard;
