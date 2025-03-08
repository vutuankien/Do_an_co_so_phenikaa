import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ProductCard from "./ProductCard";
import "./ProductList.css";

const ProductList = ({ activeFilters, sortOption, searchQuery }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantities, setQuantities] = useState({});
  const [likedProducts, setLikedProducts] = useState(new Set());

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await fetch("http://localhost:5000/wishlist");
        const wishlist = await response.json();
        const likedSet = new Set(wishlist.map((item) => String(item.id)));
        setLikedProducts(likedSet);
      } catch (error) {
        console.error("Lỗi khi tải wishlist:", error);
      }
    };

    fetchWishlist();
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/product")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched Products:", data);
        setProducts(data);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  useEffect(() => {
    console.log("Active Filters:", activeFilters);
    let filtered = products.filter((product) => {
      const { categories, colors, brands, countries, features, price } =
        activeFilters;
      const matchesSearch =
        searchQuery === "" ||
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (Array.isArray(product.category) &&
          product.category.some(
            (cat) =>
              typeof cat === "string" &&
              cat.toLowerCase().includes(searchQuery.toLowerCase())
          ));

      return (
        matchesSearch &&
        (categories.length === 0 ||
          categories.some((c) => product.category.includes(c))) &&
        (colors.length === 0 || colors.includes(product.color)) &&
        (brands.length === 0 || brands.includes(product.brand)) &&
        (countries.length === 0 || countries.includes(product.country)) &&
        (features.length === 0 ||
          features.every((f) => product.feature.includes(f))) &&
        (parseFloat(product.salePrice?.replace("$", "")) ||
          parseFloat(product.price.replace("$", ""))) <= price
      );
    });

    switch (sortOption) {
      case "sort_by_popularity":
        filtered.sort((a, b) => b.popularity - a.popularity);
        break;
      case "sort_by_average_rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "sort_by_latest":
        filtered.sort(
          (a, b) => new Date(b.releaseDate) - new Date(a.releaseDate)
        );
        break;
      case "price_low_high":
        filtered.sort(
          (a, b) =>
            (parseFloat(a.salePrice?.replace("$", "")) ||
              parseFloat(a.price.replace("$", ""))) -
            (parseFloat(b.salePrice?.replace("$", "")) ||
              parseFloat(b.price.replace("$", "")))
        );
        break;
      case "price_high_low":
        filtered.sort(
          (a, b) =>
            (parseFloat(b.salePrice?.replace("$", "")) ||
              parseFloat(b.price.replace("$", ""))) -
            (parseFloat(a.salePrice?.replace("$", "")) ||
              parseFloat(a.price.replace("$", "")))
        );
        break;
      default:
        break;
    }

    console.log("Filtered Products:", filtered);
    setFilteredProducts(filtered);
  }, [products, activeFilters, sortOption, searchQuery]);

  const handleLike = async (product) => {
    try {
      const response = await fetch("http://localhost:5000/wishlist", {
        cache: "no-store",
      });
      const wishlist = await response.json();
      const existingItem = wishlist.find(
        (item) => String(item.id) === String(product.id)
      );

      if (existingItem) {
        await fetch(`http://localhost:5000/wishlist/${existingItem.id}`, {
          method: "DELETE",
        });
        setLikedProducts((prevLiked) => {
          const newLiked = new Set(prevLiked);
          newLiked.delete(String(product.id));
          return newLiked;
        });
      } else {
        await fetch("http://localhost:5000/wishlist", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: String(product.id),
            title: product.title,
            image: product.image,
            price: product.onSale ? product.salePrice : product.price,
          }),
        });

        setLikedProducts((prevLiked) => {
          const newLiked = new Set(prevLiked);
          newLiked.add(String(product.id));
          return newLiked;
        });
      }
    } catch (error) {
      console.error("Lỗi khi thêm vào danh sách yêu thích:", error);
    }
  };

  const handleView = (product) => {
    setSelectedProduct(product);
  };
  const handleCloseDetail = () => {
    setSelectedProduct(null);
  };

  const handleAddToCart = async (product) => {
    try {
      const quantity = quantities[product.id] || 1;

      const response = await fetch("http://localhost:5000/cart", {
        cache: "no-store",
      });
      const cart = await response.json();

      console.log("Giỏ hàng hiện tại:", cart);

      const existingItem = cart.find(
        (item) => String(item.id) === String(product.id)
      );

      if (existingItem) {
        console.log("Cập nhật số lượng sản phẩm:", existingItem);

        await fetch(`http://localhost:5000/cart/${existingItem.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quantity: existingItem.quantity + quantity }),
        });

        alert(`Cập nhật số lượng ${product.title} trong giỏ hàng.`);
      } else {
        console.log("Thêm sản phẩm mới vào giỏ hàng");

        await fetch("http://localhost:5000/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: product.id,
            title: product.title,
            image: product.image,
            price: product.onSale ? product.salePrice : product.price,
            quantity: quantity,
          }),
        });

        alert(`Đã thêm ${quantity} sản phẩm "${product.title}" vào giỏ hàng.`);
      }

      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [product.id]: 1,
      }));
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error);
    }
  };

  const handleQuantityChange = (e, product) => {
    const quantity = Math.max(1, parseInt(e.target.value) || 1);
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [product.id]: quantity,
    }));
    console.log(`Số lượng sản phẩm ${product.title}:`, quantity);
  };

  return (
    <div className="product-list">
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            handleLike={handleLike}
            likedProducts={likedProducts}
            handleView={handleView}
            handleAddToCart={handleAddToCart}
            selectedProduct={selectedProduct}
            handleCloseDetail={handleCloseDetail}
            handleQuantityChange={handleQuantityChange}
            quantities={quantities}
          />
        ))
      ) : (
        <p>No products found</p>
      )}
    </div>
  );
};

ProductList.propTypes = {
  activeFilters: PropTypes.shape({
    categories: PropTypes.array.isRequired,
    colors: PropTypes.array.isRequired,
    brands: PropTypes.array.isRequired,
    countries: PropTypes.array.isRequired,
    features: PropTypes.array.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  sortOption: PropTypes.string.isRequired,
  searchQuery: PropTypes.string.isRequired,
};

export default ProductList;
