//import React from 'react'
import { NavLink } from "react-router-dom";
import { assets } from "./../assets/assets";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-content">
        <div className="about">
          <p className="footer-content-title">ABOUT</p>
          <h1>
            If you need to get high quality cosmetics at affordable prices,
            Chantalle is the right place for you! Here you can find wide
            assortment of world famous brands and find what you need. Our
            mission is to deliver every woman a piece of beauty to make her
            happy and to highlight her beauty and personal individuality by
            means of cosmetics.
          </h1>
        </div>
        <div className="pages">
          <p className="footer-content-title">PAGES</p>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "turn-page active" : "turn-page"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/blog"
            className={({ isActive }) =>
              isActive ? "turn-page active" : "turn-page"
            }
          >
            Blog
          </NavLink>
          <NavLink
            to="/shop"
            className={({ isActive }) =>
              isActive ? "turn-page active" : "turn-page"
            }
          >
            Shop
          </NavLink>
          <NavLink
            to="/gallery"
            className={({ isActive }) =>
              isActive ? "turn-page active" : "turn-page"
            }
          >
            Gallery
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? "turn-page active" : "turn-page"
            }
          >
            Contact us
          </NavLink>
        </div>
        <div className="recent-post">
          <p className="footer-content-title">RECENT POSTS</p>
          <div className="recent-post-content">
            <a href="#" className="recent-post-content-img">
              <img src={assets.blog_update_img1} alt="blog_update_img1" />
            </a>
            <div className="recent-post-content-title">
              <a href="# ">
                WATCH THE MAGICALNEW TRAILER FOR A WRINKLE IN TIME
              </a>
            </div>
          </div>
          <div className="recent-post-content">
            <a href="#" className="recent-post-content-img">
              <img src={assets.blog_update_img5} alt="blog_update_img1" />
            </a>
            <div className="recent-post-content-title">
              <a href="# ">COOK LIKE A TRUE SICILIAN!</a>
            </div>
          </div>
        </div>
        <div className="collection">
          <p className="footer-content-title">COLLECTIONS</p>
          <a href="#" className="turn-page">
            Cleansing
          </a>
          <a href="#" className="turn-page">
            Toning
          </a>
          <a href="#" className="turn-page">
            Cleansing
          </a>
          <a href="#" className="turn-page">
            Hydrating
          </a>
          <a href="#" className="turn-page">
            Purifying
          </a>
          <a href="#" className="turn-page">
            Soothing
          </a>
          <a href="#" className="turn-page">
            Nourishing
          </a>
          <a href="#" className="turn-page">
            Illuminating
          </a>
          <a href="#" className="turn-page">
            Rejuvenating
          </a>
          <a href="#" className="turn-page">
            Exfoliation
          </a>
          <a href="#" className="turn-page">
            Mask
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-bottom-logo">
          <img src={assets.logo} alt="logo" />
          <a href="#">Zemez</a>
          <h1 className="footer-rights">&copy;. All rights reserved.</h1>
        </div>
        <div className="social-platform">
          <a href="#">
            <svg
              fill="#ffffff"
              height="200px"
              width="200px"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="-337 273 123.5 256"
              stroke="#ffffff"
              className="social-platform-logo"
            >
              <path d="M-260.9,327.8c0-10.3,9.2-14,19.5-14c10.3,0,21.3,3.2,21.3,3.2l6.6-39.2c0,0-14-4.8-47.4-4.8c-20.5,0-32.4,7.8-41.1,19.3 c-8.2,10.9-8.5,28.4-8.5,39.7v25.7H-337V396h26.5v133h49.6V396h39.3l2.9-38.3h-42.2V327.8z"></path>
            </svg>
          </a>
          <a href="#">
            <svg
              fill="#ffffff"
              width="220px"
              height="220px"
              viewBox="0 0 32 32"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#ffffff"
              className="social-platform-logo"
            >
              <title>Instagram</title>
              <path d="M25.805 7.996c0 0 0 0.001 0 0.001 0 0.994-0.806 1.799-1.799 1.799s-1.799-0.806-1.799-1.799c0-0.994 0.806-1.799 1.799-1.799v0c0.993 0.001 1.798 0.805 1.799 1.798v0zM16 20.999c-2.761 0-4.999-2.238-4.999-4.999s2.238-4.999 4.999-4.999c2.761 0 4.999 2.238 4.999 4.999v0c0 0 0 0.001 0 0.001 0 2.76-2.237 4.997-4.997 4.997-0 0-0.001 0-0.001 0h0zM16 8.3c0 0 0 0-0 0-4.253 0-7.7 3.448-7.7 7.7s3.448 7.7 7.7 7.7c4.253 0 7.7-3.448 7.7-7.7v0c0-0 0-0 0-0.001 0-4.252-3.447-7.7-7.7-7.7-0 0-0 0-0.001 0h0zM16 3.704c4.003 0 4.48 0.020 6.061 0.089 1.003 0.012 1.957 0.202 2.84 0.538l-0.057-0.019c1.314 0.512 2.334 1.532 2.835 2.812l0.012 0.034c0.316 0.826 0.504 1.781 0.516 2.778l0 0.005c0.071 1.582 0.087 2.057 0.087 6.061s-0.019 4.48-0.092 6.061c-0.019 1.004-0.21 1.958-0.545 2.841l0.019-0.058c-0.258 0.676-0.64 1.252-1.123 1.726l-0.001 0.001c-0.473 0.484-1.049 0.866-1.692 1.109l-0.032 0.011c-0.829 0.316-1.787 0.504-2.788 0.516l-0.005 0c-1.592 0.071-2.061 0.087-6.072 0.087-4.013 0-4.481-0.019-6.072-0.092-1.008-0.019-1.966-0.21-2.853-0.545l0.059 0.019c-0.676-0.254-1.252-0.637-1.722-1.122l-0.001-0.001c-0.489-0.47-0.873-1.047-1.114-1.693l-0.010-0.031c-0.315-0.828-0.506-1.785-0.525-2.785l-0-0.008c-0.056-1.575-0.076-2.061-0.076-6.053 0-3.994 0.020-4.481 0.076-6.075 0.019-1.007 0.209-1.964 0.544-2.85l-0.019 0.059c0.247-0.679 0.632-1.257 1.123-1.724l0.002-0.002c0.468-0.492 1.045-0.875 1.692-1.112l0.031-0.010c0.823-0.318 1.774-0.509 2.768-0.526l0.007-0c1.593-0.056 2.062-0.075 6.072-0.075zM16 1.004c-4.074 0-4.582 0.019-6.182 0.090-1.315 0.028-2.562 0.282-3.716 0.723l0.076-0.025c-1.040 0.397-1.926 0.986-2.656 1.728l-0.001 0.001c-0.745 0.73-1.333 1.617-1.713 2.607l-0.017 0.050c-0.416 1.078-0.67 2.326-0.697 3.628l-0 0.012c-0.075 1.6-0.090 2.108-0.090 6.182s0.019 4.582 0.090 6.182c0.028 1.315 0.282 2.562 0.723 3.716l-0.025-0.076c0.796 2.021 2.365 3.59 4.334 4.368l0.052 0.018c1.078 0.415 2.326 0.669 3.628 0.697l0.012 0c1.6 0.075 2.108 0.090 6.182 0.090s4.582-0.019 6.182-0.090c1.315-0.029 2.562-0.282 3.716-0.723l-0.076 0.026c2.021-0.796 3.59-2.365 4.368-4.334l0.018-0.052c0.416-1.078 0.669-2.326 0.697-3.628l0-0.012c0.075-1.6 0.090-2.108 0.090-6.182s-0.019-4.582-0.090-6.182c-0.029-1.315-0.282-2.562-0.723-3.716l0.026 0.076c-0.398-1.040-0.986-1.926-1.729-2.656l-0.001-0.001c-0.73-0.745-1.617-1.333-2.607-1.713l-0.050-0.017c-1.078-0.416-2.326-0.67-3.628-0.697l-0.012-0c-1.6-0.075-2.108-0.090-6.182-0.090z"></path>
            </svg>
          </a>
          <a href="#">
            <svg
              fill="#ffffff"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              stroke="#ffffff"
              className="social-platform-logo"
            >
              <path d="M459.186,151.787c0.203,4.501,0.305,9.023,0.305,13.565 c0,138.542-105.461,298.285-298.274,298.285c-59.209,0-114.322-17.357-160.716-47.104c8.212,0.973,16.546,1.47,25.012,1.47 c49.121,0,94.318-16.759,130.209-44.884c-45.887-0.841-84.596-31.154-97.938-72.804c6.408,1.227,12.968,1.886,19.73,1.886 c9.55,0,18.816-1.287,27.617-3.68c-47.955-9.633-84.1-52.001-84.1-102.795c0-0.446,0-0.882,0.011-1.318 c14.133,7.847,30.294,12.562,47.488,13.109c-28.134-18.796-46.637-50.885-46.637-87.262c0-19.212,5.16-37.218,14.193-52.7 c51.707,63.426,128.941,105.156,216.072,109.536c-1.784-7.675-2.718-15.674-2.718-23.896c0-57.891,46.941-104.832,104.832-104.832 c30.173,0,57.404,12.734,76.525,33.102c23.887-4.694,46.313-13.423,66.569-25.438c-7.827,24.485-24.434,45.025-46.089,58.002 c21.209-2.535,41.426-8.171,60.222-16.505C497.448,118.542,479.666,137.004,459.186,151.787z"></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
