import React, { useState } from "react";
import { useSignInMutation } from "../../Api/accountApi";
import "./Styles/Register.css";

import { apiResponse } from "../../interfaces/apiResponse";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import userModel from "../../interfaces/userModel";
import { setLoggedInUser } from "../../Storage/Redux/authenticationSlice";
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userData, setUserDataState] = useState({
    username: "",
    password: "",
  });
  const [userSignInMutation] = useSignInMutation();
  async function handleSignInSubmit(e) {
    e.preventDefault();
    const response: apiResponse = await userSignInMutation({
      username: userData.username,
      password: userData.password,
    });
    if (response.data.isSuccess) {
      const token = response.data.result.token;
      localStorage.setItem("token", token);
      const { nameid, email, role, fullName }: userModel = jwtDecode(token);
      dispatch(
        setLoggedInUser({
          nameid,
          email,
          role,
          fullName,
        })
      );
    }
    navigate("/");
  }
  return (
    <div>
      <section
        className="vh-100 bg-image"
        style={{
          backgroundImage:
            "url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')",
        }}
      >
        <div className="mask d-flex align-items-center h-100 gradient-custom-3">
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                <div className="card" style={{ borderRadius: "15px" }}>
                  <div className="card-body p-5">
                    <h2 className="text-uppercase text-center mb-5">Login</h2>

                    <form onSubmit={handleSignInSubmit}>
                      <div className="form-outline mb-4">
                        <input
                          type="email"
                          id="form3Example3cg"
                          className="form-control form-control-lg mb-1"
                          onChange={(e) =>
                            setUserDataState((prev) => ({
                              ...prev,
                              username: e.target.value,
                            }))
                          }
                        />
                        <label className="form-label" htmlFor="form3Example3cg">
                          Email
                        </label>
                      </div>

                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          id="form3Example4cg"
                          className="form-control form-control-lg mb-1"
                          onChange={(e) =>
                            setUserDataState((prev) => ({
                              ...prev,
                              password: e.target.value,
                            }))
                          }
                        />
                        <label className="form-label" htmlFor="form3Example4cg">
                          Password
                        </label>
                      </div>

                      <div className="form-check d-flex justify-content-center mb-5">
                        <input
                          className="form-check-input me-2"
                          type="checkbox"
                          value=""
                          id="form2Example3cg"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="form2Example3cg"
                        >
                          I agree all statements in{" "}
                          <a href="#!" className="text-body">
                            <u>Terms of service</u>
                          </a>
                        </label>
                      </div>

                      <div className="d-flex justify-content-center">
                        <button
                          type="submit"
                          className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                        >
                          Login
                        </button>
                      </div>

                      <p className="text-center text-muted mt-5 mb-0 ">
                        Do not have an account? You can&nbsp;
                        <Link to="/register" className="fw-bold text-body">
                          <u>Register here</u>
                        </Link>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
