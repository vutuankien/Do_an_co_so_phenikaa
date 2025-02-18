import { Link, NavLink, useNavigate } from "react-router-dom";
import { assets } from "./../assets/assets";
import "./Navbar.css";

const Navbar = ({ onLogout }) => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    if (onLogout) {
      console.log("Logout handler called");
      onLogout();
      navigate("/");
    } else {
      console.log("onLogout is undefined");
    }
  };

  return (
    <div className="navbar-container">
      <img src={assets.logo} className="navbar-logo" alt="Logo" />
      <ul className="navbar-links">
        <NavLink
          to="/home"
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
                      <li>
                        <Link to="/shop" state={{ category: "Brushes" }}>
                          Cleansing
                        </Link>
                      </li>
                      <li>
                        <Link to="/shop" state={{ category: "Eyes" }}>
                          Toning
                        </Link>
                      </li>
                      <li>
                        <Link to="/shop" state={{ category: "Lips" }}>
                          Hydrating
                        </Link>
                      </li>
                      <li>
                        <Link to="/shop" state={{ category: "Skin" }}>
                          Purifying
                        </Link>
                      </li>
                      <li>
                        <Link to="/shop" state={{ category: "Brushes" }}>
                          Soothing
                        </Link>
                      </li>
                      <li>
                        <Link to="/shop" state={{ category: "Eyes" }}>
                          Nourishing
                        </Link>
                      </li>
                      <li>
                        <Link to="/shop" state={{ category: "Lips" }}>
                          Illuminating
                        </Link>
                      </li>
                      <li>
                        <Link to="/shop" state={{ category: "Skin" }}>
                          Rejuvenating
                        </Link>
                      </li>
                      <li>
                        <Link to="/shop" state={{ category: "Brushes" }}>
                          Exfoliation
                        </Link>
                      </li>
                      <li>
                        <Link to="/shop" state={{ category: "Face" }}>
                          Mask
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="eye">
                    <p className="droopdown-home-title">EYE MAKEUP</p>
                    <ul>
                      <li>
                        <Link to="/shop" state={{ category: "Brushes" }}>
                          Eyebrows
                        </Link>
                      </li>
                      <li>
                        <Link to="/shop" state={{ category: "Eyes" }}>
                          Base
                        </Link>
                      </li>
                      <li>
                        <Link to="/shop" state={{ category: "Lips" }}>
                          Eye shadows
                        </Link>
                      </li>
                      <li>
                        <Link to="/shop" state={{ category: "Skin" }}>
                          Eyeliner pencils
                        </Link>
                      </li>
                      <li>
                        <Link to="/shop" state={{ category: "Brushes" }}>
                          Eyeliners
                        </Link>
                      </li>
                      <li>
                        <Link to="/shop" state={{ category: "Eyes" }}>
                          Mascaras
                        </Link>
                      </li>
                      <li>
                        <Link to="/shop" state={{ category: "Lips" }}>
                          False eyelashes
                        </Link>
                      </li>
                      <li>
                        <Link to="/shop" state={{ category: "Skin" }}>
                          Eyelash extensions
                        </Link>
                      </li>
                      <li>
                        <Link to="/shop" state={{ category: "Brushes" }}>
                          Palettes
                        </Link>
                      </li>
                      <li>
                        <Link to="/shop" state={{ category: "Face" }}>
                          Eyeliner
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="lip">
                    <p className="droopdown-home-title">LIP MAKEUP</p>
                    <ul>
                      <li>
                        <Link to="/shop" state={{ category: "Lips" }}>
                          Lip liners
                        </Link>
                      </li>
                      <li>
                        <Link to="/shop" state={{ category: "Lips" }}>
                          Lipsticks
                        </Link>
                      </li>
                      <li>
                        <Link to="/shop" state={{ category: "Lips" }}>
                          Lip gloss
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="accessories">
                    <p className="droopdown-home-title">ACCESSORIES </p>
                    <ul>
                      <li>
                        <Link to="/shop" state={{ category: "Brushes" }}>
                          Brushes
                        </Link>
                      </li>
                      <li>
                        <Link to="/shop" state={{ category: "Eyes" }}>
                          Sponges and powder puffs
                        </Link>
                      </li>
                      <li>
                        <Link to="/shop" state={{ category: "Lips" }}>
                          Tweezers
                        </Link>
                      </li>
                      <li>
                        <Link to="/shop" state={{ category: "Skin" }}>
                          Pecil sharpeners
                        </Link>
                      </li>
                      <li>
                        <Link to="/shop" state={{ category: "Brushes" }}>
                          Scissors
                        </Link>
                      </li>
                      <li>
                        <Link to="/shop" state={{ category: "Eyes" }}>
                          Comedo extrator
                        </Link>
                      </li>
                      <li>
                        <Link to="/shop" state={{ category: "Lips" }}>
                          Make-up bags
                        </Link>
                      </li>
                      <li>
                        <Link to="/shop" state={{ category: "Skin" }}>
                          Mirrors
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="dropdown-content-image">
                  <img src={assets.navbar_img1} alt="Navbar 1" />
                  <img src={assets.navbar_img2} alt="Navbar 2" />
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

          <div className="dropdown-menu-user">
            <div className="dropdown-content-user">
              <button className="menu-item-user">ACCOUNT</button>
              <button className="menu-item-user" onClick={logoutHandler}>
                LOG OUT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
