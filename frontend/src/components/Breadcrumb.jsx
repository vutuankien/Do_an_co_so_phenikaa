import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Breadcrumb.css";

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <div className="breadcrumb-container">
      <nav className="breadcrumb">
        <Link to="/home" className="breadcrumb-link">
          HOME
        </Link>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;

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
        })}
      </nav>
    </div>
  );
};

export default Breadcrumb;
