import React from "react";

import "./App.css";

import { Header } from "../Layout";
import { Route, Routes } from "react-router-dom";
import VehicleDetail from "../Pages/Vehicle/VehicleDetail";
import { VehicleList } from "../Pages/Vehicle";
import Register from "../Pages/Account/Register";

function App() {
  return (
    <div className="App">
      <Header></Header>

      <div className="pb-5">
        <Routes>
          <Route path="/" element={<VehicleList />} />
          <Route
            path="Vehicle/VehicleId/:vehicleId"
            element={<VehicleDetail />}
          />
          <Route path="register" element={<Register />} />
          <Route
            path="Vehicle/VehicleId/:vehicleId"
            element={<VehicleDetail />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
