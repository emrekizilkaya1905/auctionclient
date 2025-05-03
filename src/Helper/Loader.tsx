import React from "react";

function Loader() {
  return (
    <div className="d-flex justify-content-center align-items-center gap-3">
      <div
        className="spinner-border"
        style={{ width: "3rem", height: "3rem" }}
        role="status"
      >
        <span className="sr-only"></span>
      </div>
      <div
        className="spinner-grow"
        style={{ width: "3rem", height: "3rem" }}
        role="status"
      >
        <span className="sr-only"></span>
      </div>
    </div>
  );
}

export default Loader;
