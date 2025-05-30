import React, { useEffect } from "react";

import "./App.css";

import { Header } from "../Layout";
import { Route, Routes } from "react-router-dom";
import VehicleDetail from "../Pages/Vehicle/VehicleDetail";
import { VehicleList } from "../Pages/Vehicle";
import Register from "../Pages/Account/Register";
import Login from "../Pages/Account/Login";
import { useDispatch } from "react-redux";
import { setLoggedInUser } from "../Storage/Redux/authenticationSlice";
import userModel from "../interfaces/userModel";
import { jwtDecode } from "jwt-decode";
import BidCheckout from "../Pages/Bid/BidCheckout";
import Payment from "../Pages/Payment/Payment";
import { VehicleIndex } from "../Pages/Admin";
import NotFound from "../Other/NotFound";
import CreateVehicle from "../Pages/Admin/CreateVehicle";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
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
  }, []);
  return (
    <div className="App">
      <Header></Header>

      <div className="pb-5">
        <Routes>
          <Route path="/" element={<VehicleList />} />
          <Route path="/Admin/VehicleIndex" element={<VehicleIndex />} />
          <Route
            path="/Admin/CreateVehicle/:vehicleId?"
            element={<CreateVehicle></CreateVehicle>}
          ></Route>
          <Route
            path="Vehicle/VehicleId/:vehicleId"
            element={<VehicleDetail />}
          />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route
            path="Vehicle/VehicleId/:vehicleId"
            element={<VehicleDetail />}
          />
          <Route
            path="Vehicle/BidCheckout/:vehicleId"
            element={<BidCheckout />}
          />
          <Route path="payment" element={<Payment />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
