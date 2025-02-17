import React from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import "./Breadcrumb.css";

const Breadcrumb = ({ productTitle, showShop }) => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <div className="breadcrumb-container">
      <nav className="breadcrumb">
        <Link to="/home" className="breadcrumb-link">
          HOME
        </Link>

        {showShop && (
          <>
            <span className="breadcrumb-separator"> | </span>
            <Link to="/shop" className="breadcrumb-link">
              SHOP
            </Link>
          </>
        )}

        {/* Nếu đang ở trang chi tiết sản phẩm, chỉ hiển thị HOME | SHOP | TÊN SẢN PHẨM */}
        {pathnames.includes("product") && productTitle ? (
          <>
            <span className="breadcrumb-separator"> | </span>
            <span className="breadcrumb-current">
              {productTitle.toUpperCase()}
            </span>
          </>
        ) : (
          pathnames.map((value, index) => {
            const isLast = index === pathnames.length - 1;
            const to = `/${pathnames.slice(0, index + 1).join("/")}`;

            return (
              <React.Fragment key={to}>
                <span className="breadcrumb-separator"> | </span>
                {isLast ? (
                  <span className="breadcrumb-current">
                    {value.toUpperCase().replace(/-/g, " ")}
                  </span>
                ) : (
                  <Link to={to} className="breadcrumb-link">
                    {value.toUpperCase().replace(/-/g, " ")}
                  </Link>
                )}
              </React.Fragment>
            );
          })
        )}
      </nav>
    </div>
  );
};

Breadcrumb.propTypes = {
  productTitle: PropTypes.string,
  showShop: PropTypes.bool,
};

export default Breadcrumb;
