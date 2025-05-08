import React, { useEffect, useState } from "react";
import "./Styles/Banner.css";
import { useDispatch } from "react-redux";
import { setSearchItem } from "../../Storage/Redux/vehicleSlice";

function Banner() {
  const dispatch = useDispatch();
  const [value, setValueState] = useState("");
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    dispatch(setSearchItem(value));
    setValueState(e.target.value);
  }
  useEffect(() => {
    if (value === "") {
      dispatch(setSearchItem(""));
    }
  }, [value]);
  return (
    <div className="custom-banner">
      <div
        className="m-auto d-flex align-items-center"
        style={{ width: "400px", height: "50vh" }}
      >
        <div className="d-flex align-items-center" style={{ width: "100%" }}>
          <input
            type="text"
            className="form-control rounded-pill"
            style={{ width: "100%", padding: "20px 20px" }}
            placeholder="Search Car"
            onChange={handleChange}
          ></input>
          <span style={{ position: "relative", left: "-45px" }}>
            <i className="bi bi-search"></i>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Banner;
