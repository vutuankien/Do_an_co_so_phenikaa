import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BlogDetails = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const blogAPI = `http://localhost:3000/blog/api/${id}`;

    useEffect(() => {
        fetch(blogAPI)
            .then((response) => response.json())
            .then((data) => setBlog(data))
            .catch((error) => console.error("Error fetching blog detail:", error));
    }, [id]);

    if (!blog) return <p className="text-center mt-10">Loading...</p>;

    return (
        <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6 mt-16">
            <h1 className="text-3xl font-bold text-gray-900 leading-tight">{blog.title}</h1>
            <div className="text-sm text-gray-500 mt-2">
                <span>By <span className="font-semibold text-gray-800">{blog.author}</span></span>
                <span> • In <span className="text-pink-500 font-medium">{blog.category}</span></span>
                <span> • Posted on <span>{blog.createdAt}</span></span>
                <span> • <span className="text-pink-500 font-medium">{blog.views} views</span></span>
            </div>
            <div className="mt-4">
                <img
                    src={blog.image?.[0] || "/default-image.jpg"} // ✅ Tránh lỗi nếu không có ảnh
                    alt="Blog Cover"
                    className="w-full h-80 object-cover rounded-md"
                />
            </div>
            <p className="text-gray-700 mt-4">{blog.content}</p>
        </div>
    );
};

export default BlogDetails;
