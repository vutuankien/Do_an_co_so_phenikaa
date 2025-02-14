//import React, { useState } from "react";
import "./Sidebar.css";
import { useState } from "react";

const Sidebar = () => {
  const [priceRange, setPriceRange] = useState(22);

  return (
    <div className="sidebar">
      {/* Categories Filter */}
      <div className="filter-section">
        <h3>Categories</h3>
        <label>
          <input type="checkbox" /> Brushes
        </label>
        <label>
          <input type="checkbox" /> Eyes
        </label>
        <label>
          <input type="checkbox" /> Face
        </label>
        <label>
          <input type="checkbox" /> Lips
        </label>
        <label>
          <input type="checkbox" /> Skin
        </label>
      </div>

      {/* Price Filter */}
      <div className="filter-section">
        <h3>Filter by Price</h3>
        <input
          type="range"
          min="22"
          max="98"
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
        />
        <p>Price: $22 — ${priceRange}</p>
      </div>

      {/* Colors Filter */}
      <div className="filter-section">
        <h3>Filter by Colors</h3>
        <label>
          <input type="checkbox" /> Bordeaux
        </label>
        <label>
          <input type="checkbox" /> Indian Pink
        </label>
        <label>
          <input type="checkbox" /> Kasbah
        </label>
        <label>
          <input type="checkbox" /> Nude
        </label>
        <label>
          <input type="checkbox" /> Sparkling Black
        </label>
      </div>

      {/* Brands Filter */}
      <div className="filter-section">
        <h3>Filter by Brands</h3>
        <label>
          <input type="checkbox" /> L’oreal
        </label>
        <label>
          <input type="checkbox" /> MAC
        </label>
        <label>
          <input type="checkbox" /> Revlon
        </label>
        <label>
          <input type="checkbox" /> Rimmel
        </label>
        <label>
          <input type="checkbox" /> Sephora
        </label>
      </div>

      {/* Country Filter */}
      <div className="filter-section">
        <h3>Filter by Country</h3>
        <label>
          <input type="checkbox" /> Canada
        </label>
        <label>
          <input type="checkbox" /> France
        </label>
        <label>
          <input type="checkbox" /> Italy
        </label>
        <label>
          <input type="checkbox" /> Sweden
        </label>
        <label>
          <input type="checkbox" /> USA
        </label>
      </div>

      {/* Features Filter */}
      <div className="filter-section">
        <h3>Filter by Features</h3>
        <label>
          <input type="checkbox" /> Gluten Free
        </label>
        <label>
          <input type="checkbox" /> Hypoallergenic
        </label>
        <label>
          <input type="checkbox" /> No Phthalates
        </label>
        <label>
          <input type="checkbox" /> Paraben Free
        </label>
      </div>
    </div>
  );
};

export default Sidebar;
