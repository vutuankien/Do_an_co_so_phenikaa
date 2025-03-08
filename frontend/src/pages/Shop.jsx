import Breadcrumb from "../components/Breadcrumb";
import Sidebar from "../components/Sidebar";
import ProductList from "../components/ProductList";
import { useState, useEffect } from "react";
import "./Shop.css";
import { useLocation } from "react-router-dom";

const Shop = () => {
  const [sortOption, setSortOption] = useState("default");
  const [searchQuery, setSearchQuery] = useState(""); // Thêm state lưu giá trị tìm kiếm
  const [activeFilters, setActiveFilters] = useState({
    categories: [],
    colors: [],
    brands: [],
    countries: [],
    features: [],
    price: 98,
  });

  const location = useLocation();
  const { category } = location.state || {};

  useEffect(() => {
    const savedFilters = JSON.parse(localStorage.getItem("activeFilters"));
    if (savedFilters) {
      setActiveFilters(savedFilters);
    }
  }, []);

  useEffect(() => {
    if (category) {
      setActiveFilters((prev) => ({
        ...prev,
        categories: [category],
      }));
    }
  }, [category]);

  const removeFilter = (key) => {
    setActiveFilters((prev) => {
      let updatedFilters = {
        ...prev,
        [key]: Array.isArray(prev[key]) ? [] : 98,
      };

      localStorage.setItem("activeFilters", JSON.stringify(updatedFilters));
      return updatedFilters;
    });
  };

  return (
    <div className="shop_container">
      <Breadcrumb />

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search "
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="shop_content">
        <Sidebar
          activeFilters={activeFilters}
          setActiveFilters={setActiveFilters}
        />
        <div className="content">
          {/* Sorting Dropdown */}
          <div className="sorting_container">
            <select
              className="sorting_dropdown"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="default">Default Sorting</option>
              <option value="sort_by_popularity">Sort by Popularity</option>
              <option value="sort_by_average_rating">
                Sort by Average Rating
              </option>
              <option value="sort_by_latest">Sort by Latest</option>
              <option value="price_low_high">Sort by Price: Low to High</option>
              <option value="price_high_low">Sort by Price: High to Low</option>
            </select>
          </div>

          {/* Active Filters */}
          <div className="active_filters">
            <strong>ACTIVE FILTERS:</strong>
            {Object.entries(activeFilters).map(([key, value]) =>
              Array.isArray(value) && value.length > 0 ? (
                <span
                  key={key}
                  onClick={() => removeFilter(key)}
                  style={{ cursor: "pointer", marginRight: "5px" }}
                >
                  {key}: {value.join(", ")} X
                </span>
              ) : key === "price" && value !== 98 ? (
                <span
                  key={key}
                  onClick={() => removeFilter(key)}
                  style={{ cursor: "pointer", marginRight: "5px" }}
                >
                  Price: ${value} X
                </span>
              ) : null
            )}
          </div>

          {/* Product List */}
          <ProductList
            sortOption={sortOption}
            activeFilters={activeFilters}
            searchQuery={searchQuery}
          />
        </div>
      </div>
    </div>
  );
};

export default Shop;
