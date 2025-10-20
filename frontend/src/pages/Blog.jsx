// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Breadcrumb from "../components/Breadcrumb";
// import BlogCard from "../components/BlogCard";

// const BlogList = () => {
//   const [blogs, setBlogs] = useState([]);
//   const blogAPI = "https://backend-doancoso.onrender.com/blog/api";
//   useEffect(() => {
//     fetch(blogAPI)
//       .then((response) => response.json())
//       .then((data) => setBlogs(data))
//       .catch((error) => console.error("Error fetching blogs:", error));
//   }, []);

//   return (
//     <div className="container mx-auto px-4">
//       <Breadcrumb />
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {blogs.map((item) => (
//           <BlogCard
//             key={item._id}
//             id={item._id}
//             author={item.author}
//             category={item.category}
//             createdAt={item.createdAt}
//             title={item.title}
//             images={item.image?.[0] || "/default-image.jpg"} // ✅ Check nếu `image` không có dữ liệu
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default BlogList;
import React, { useEffect, useState } from "react";
import Breadcrumb from "../components/Breadcrumb";
import BlogCard from "../components/BlogCard";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const API = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";
  const blogAPI = `${API}/blog/api`;

  useEffect(() => {
    fetch(blogAPI, { credentials: "include" })
      .then((response) => response.json())
      .then((data) => setBlogs(data))
      .catch((error) => console.error("Error fetching blogs:", error));
  }, [blogAPI]);

  return (
    <div className="container mx-auto px-4">
      <Breadcrumb />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {blogs.map((item) => (
          <BlogCard
            key={item._id}
            id={item._id}
            author={item.author}
            category={item.category}
            createdAt={item.createdAt}
            title={item.title}
            images={item.image?.[0] || "/default-image.jpg"}
          />
        ))}
      </div>
    </div>
  );
};

export default BlogList;
