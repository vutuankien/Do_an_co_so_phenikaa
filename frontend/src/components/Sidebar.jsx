import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./Sidebar.css";

const Sidebar = ({ activeFilters, setActiveFilters }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [priceRange, setPriceRange] = useState(98);

  useEffect(() => {
    setSelectedCategories(activeFilters.categories || []);
    setSelectedColors(activeFilters.colors || []);
    setSelectedBrands(activeFilters.brands || []);
    setSelectedCountries(activeFilters.countries || []);
    setSelectedFeatures(activeFilters.features || []);
    setPriceRange(activeFilters.price || 98);
  }, [activeFilters]);

  const handleCheckboxChange = (event, key) => {
    const value = event.target.value;
    setActiveFilters((prev) => {
      const newSelection = event.target.checked
        ? [...prev[key], value]
        : prev[key].filter((item) => item !== value);

      const updatedFilters = { ...prev, [key]: newSelection };
      localStorage.setItem("activeFilters", JSON.stringify(updatedFilters));
      return updatedFilters;
    });
  };

  return (
    <div className="sidebar">
      {/* Categories Filter */}
      <div className="filter-section">
        <h3>Categories</h3>
        {["Brushes", "Eyes", "Face", "Lips", "Skin"].map((category) => (
          <label key={category}>
            <input
              type="checkbox"
              value={category}
              checked={selectedCategories.includes(category)}
              onChange={(e) => handleCheckboxChange(e, "categories")}
            />
            {category}
          </label>
        ))}
      </div>

      {/* Price Filter */}
      <div className="filter-section">
        <h3>Filter by Price</h3>
        <input
          type="range"
          min="22"
          max="98"
          value={priceRange}
          onChange={(e) =>
            setActiveFilters((prev) => ({
              ...prev,
              price: e.target.value,
            }))
          }
        />
        <p>Price: $22 — ${priceRange}</p>
      </div>

      {/* Colors Filter */}
      <div className="filter-section">
        <h3>Filter by Colors</h3>
        {["Bordeaux", "Indian Pink", "Kasbah", "Nude", "Sparkling Black"].map(
          (color) => (
            <label key={color}>
              <input
                type="checkbox"
                value={color}
                checked={selectedColors.includes(color)}
                onChange={(e) => handleCheckboxChange(e, "colors")}
              />
              {color}
            </label>
          )
        )}
      </div>

      {/* Brands Filter */}
      <div className="filter-section">
        <h3>Filter by Brands</h3>
        {["L’oreal", "MAC", "Revlon", "Rimmel", "Sephora"].map((brand) => (
          <label key={brand}>
            <input
              type="checkbox"
              value={brand}
              checked={selectedBrands.includes(brand)}
              onChange={(e) => handleCheckboxChange(e, "brands")}
            />
            {brand}
          </label>
        ))}
      </div>

      {/* Country Filter */}
      <div className="filter-section">
        <h3>Filter by Country</h3>
        {["Canada", "France", "Italy", "Sweden", "USA"].map((country) => (
          <label key={country}>
            <input
              type="checkbox"
              value={country}
              checked={selectedCountries.includes(country)}
              onChange={(e) => handleCheckboxChange(e, "countries")}
            />
            {country}
          </label>
        ))}
      </div>

      {/* Features Filter */}
      <div className="filter-section">
        <h3>Filter by Features</h3>
        {["Gluten Free", "Hypoallergenic", "No Phthalates", "Paraben Free"].map(
          (feature) => (
            <label key={feature}>
              <input
                type="checkbox"
                value={feature}
                checked={selectedFeatures.includes(feature)}
                onChange={(e) => handleCheckboxChange(e, "features")}
              />
              {feature}
            </label>
          )
        )}
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  activeFilters: PropTypes.object.isRequired,
  setActiveFilters: PropTypes.func.isRequired,
};

export default Sidebar;
