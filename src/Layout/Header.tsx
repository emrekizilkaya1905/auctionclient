import React, { useEffect } from "react";
import "./Styles/Header.css";
import { useDispatch, useSelector } from "react-redux";
import userModel from "../interfaces/userModel";
import { RootState } from "../Storage/store";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  initialState,
  setLoggedInUser,
} from "../Storage/Redux/authenticationSlice";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userStore: userModel = useSelector(
    (state: RootState) => state.authenticationStore
  );
  const token = localStorage.getItem("token");
  useEffect(function () {}, [userStore]);
  function handleLogout() {
    localStorage.removeItem("token");
    dispatch(setLoggedInUser({ ...initialState }));
    navigate("/");
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-gray">
        <div className="container">
          <a className="navbar-brand text-" href="/">
            Emre's Car Auction
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              {userStore.fullName && (
                <li className="nav-item">
                  <span className="nav-link">
                    Welcome, {userStore.fullName}
                  </span>
                </li>
              )}
              {userStore.role === "Administrator" ? (
                <div
                  className="collapse navbar-collapse mx-2"
                  id="navbarNavDarkDropdown"
                >
                  <ul className="navbar-nav">
                    <li className="nav-item dropdown">
                      <button
                        className="btn btn-dark dropdown-toggle"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Menus
                      </button>
                      <ul className="dropdown-menu dropdown-menu-dark">
                        <li>
                          <NavLink
                            to="/Admin/VehicleIndex"
                            className="dropdown-item"
                          >
                            Vehicle List
                          </NavLink>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              ) : (
                ""
              )}

              {userStore.fullName ? (
                <li className="nav-item" style={{ marginRight: "5px" }}>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => handleLogout()}
                  >
                    Logout
                  </button>
                </li>
              ) : (
                <>
                  <li className="nav-item" style={{ marginRight: "5px" }}>
                    <Link className="btn btn-success" to="/register">
                      Register
                    </Link>
                  </li>
                  <li className="nav-item" style={{ marginRight: "5px" }}>
                    <Link className="btn btn-success" to="/login">
                      Login
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
