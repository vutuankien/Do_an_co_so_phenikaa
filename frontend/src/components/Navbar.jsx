//import React from "react";
import { Link, NavLink } from "react-router-dom";
import { assets } from "./../assets/assets";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar-container">
      <img src={assets.logo} className="navbar-logo" alt="" />
      <ul className="navbar-links">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "navbar-link-item active" : "navbar-link-item"
          }
        >
          <div className="relative">
            <div className="dropdown-toggle">
              HOME <h1 className="toggle-arrow">&#9660;</h1>
            </div>
            <div className="dropdown-menu-home">
              <div className="dropdown-content-home">
                <div className="dropdown-main-content-home">
                  <div className="face">
                    <p className="droopdown-home-title">FACE MAKEUP</p>
                    <ul>
                      <li>Cleansing</li>
                      <li>Toning</li>
                      <li>Cleansing</li>
                      <li>Hydrating</li>
                      <li>Purifying</li>
                      <li>Soothing</li>
                      <li>Nourishing</li>
                      <li>Illuminating</li>
                      <li>Rejuvenating</li>
                      <li>Exfoliation</li>
                      <li>Mask</li>
                    </ul>
                  </div>
                  <div className="eye">
                    <p className="droopdown-home-title">EYE MAKEUP</p>
                    <ul>
                      <li>Eyebrows</li>
                      <li>Base</li>
                      <li>Eye shadows</li>
                      <li>Eyeliner pencils</li>
                      <li>Eyeliners</li>
                      <li>Mascaras</li>
                      <li>False eyelashes</li>
                      <li>Eyelash extensions</li>
                      <li>Palettes</li>
                      <li>Eyeliners</li>
                    </ul>
                  </div>
                  <div className="lip">
                    <p className="droopdown-home-title">LIP MAKEUP</p>
                    <ul>
                      <li>Lip liners</li>
                      <li>Lipsticks</li>
                      <li>Lip gloss</li>
                    </ul>
                  </div>
                  <div className="accessories">
                    <p className="droopdown-home-title">ACCESSORIES </p>
                    <ul>
                      <li>Brushes</li>
                      <li>Sponges and powder puffs</li>
                      <li>Tweezers</li>
                      <li>Pencil sharpeners</li>
                      <li>Scissors</li>
                      <li>Comedo extractor</li>
                      <li>Make-up bags</li>
                      <li>Mirrors</li>
                    </ul>
                  </div>
                </div>
                <div className="dropdown-content-image">
                  <img src={assets.navbar_img1} alt="" />
                  <img src={assets.navbar_img2} alt="" />
                </div>
              </div>
            </div>
            <hr className="navbar-link-underline" />
          </div>
        </NavLink>
        <NavLink
          to="/blog"
          className={({ isActive }) =>
            isActive ? "navbar-link-item active" : "navbar-link-item"
          }
        >
          <p>BLOG</p>
          <hr className="navbar-link-underline" />
        </NavLink>
        <NavLink
          to="/shop"
          className={({ isActive }) =>
            isActive ? "navbar-link-item active" : "navbar-link-item"
          }
        >
          <p>SHOP</p>
          <hr className="navbar-link-underline" />
        </NavLink>
        <NavLink
          to="/gallery"
          className={({ isActive }) =>
            isActive ? "navbar-link-item active" : "navbar-link-item"
          }
        >
          <p>GALLERY</p>
          <hr className="navbar-link-underline" />
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive ? "navbar-link-item active" : "navbar-link-item"
          }
        >
          <p>CONTACT US</p>
          <hr className="navbar-link-underline" />
        </NavLink>
      </ul>
      <div className="navbar-feature">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          stroke="#ffffff"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="navbar-icon"
        >
          <path d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z" />
        </svg>
        <Link to="/cart" className="relative">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="navbar-icon"
          >
            <path
              d="M6.29977 5H21L19 12H7.37671M20 16H8L6 3H3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z"
              stroke="#ffffff"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="navbar-icon"
            />
          </svg>

          <p className="cart-value">0</p>
        </Link>
        <div className="group relative">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="navbar-icon"
            stroke="#ffffff"
            strokeWidth="3"
          >
            <circle cx="12" cy="6" r="4"></circle>
            <path d="M20 17.5C20 19.9853 20 22 12 22C4 22 4 19.9853 4 17.5C4 15.0147 7.58172 13 12 13C16.4183 13 20 15.0147 20 17.5Z" />
          </svg>

          <div className="dropdown-menu-user ">
            <div className="dropdown-content-user">
              <p className="menu-item-user">CHECK OUT</p>
              <p className="menu-item-user">WISH LIST</p>
              <p className="menu-item-user">COMPARE</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
