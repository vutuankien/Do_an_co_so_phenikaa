import React from "react";
import "./loading.css";

const Loading = ({ show }) => {
  return (
    <div className="loading fixed inset-0 flex items-center justify-center z-[9999]"
      style={{ display: show ? "flex" : "none" }}>
      <div class="loadingio-spinner-dual-ball-nq4q5u6dq7r"><div class="ldio-x2uulkbinbj">
        <div></div><div></div><div></div>
      </div></div>
    </div>
  );
};

export default Loading;
