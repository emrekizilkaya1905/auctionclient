import React, { useState } from "react";
import { useSignUpMutation } from "../../Api/accountApi";
import "./Styles/Register.css";
import { SD_ROLES } from "../../interfaces/enums/SD_ROLES";
import { apiResponse } from "../../interfaces/apiResponse";
import { Link } from "react-router-dom";

function Register() {
  const [userData, setUserDataState] = useState({
    username: "",
    fullname: "",
    password: "",
    userType: "",
  });
  const [userRegisterMutation] = useSignUpMutation();
  async function handleRegistrationSubmit(e) {
    e.preventDefault();
    const response: apiResponse = await userRegisterMutation({
      username: userData.username,
      fullname: userData.fullname,
      password: userData.password,
      userType: userData.userType,
    });
  }

  return (
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
                  <h2 className="text-uppercase text-center mb-5">
                    Create an account
                  </h2>

                  <form onSubmit={handleRegistrationSubmit}>
                    <div className="form-outline mb-4">
                      <input
                        type="text"
                        id="form3Example1cg"
                        className="form-control form-control-lg mb-1"
                        onChange={(e) =>
                          setUserDataState((prev) => ({
                            ...prev,
                            fullname: e.target.value,
                          }))
                        }
                      />
                      <label className="form-label" htmlFor="form3Example1cg">
                        Fullname
                      </label>
                    </div>

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

                    <div className="form-outline mb-4">
                      <select
                        className="form-select"
                        defaultValue=""
                        onChange={(e) =>
                          setUserDataState((prev) => ({
                            ...prev,
                            userType: e.target.value,
                          }))
                        }
                      >
                        <option value="" disabled>
                          Choose User Role
                        </option>
                        <option value={SD_ROLES.Seller}>Seller</option>
                        <option value={SD_ROLES.NormalUser}>Normal</option>
                      </select>
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
                        Register
                      </button>
                    </div>

                    <p className="text-center text-muted mt-5 mb-0">
                      Have already an account?{" "}
                      <Link to="/login" className="fw-bold text-body">
                        <u>Login here</u>
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
  );
}

export default Register;
