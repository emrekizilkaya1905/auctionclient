import React, { useEffect, useState } from "react";
import { useGetVehiclesQuery } from "../../Api/vehicleApi";
import { vehicleModel } from "../../interfaces/vehicleModel";
import { Loader } from "../../Helper";
import "./Styles/Vehicle.css";
import RemoveVehicle from "./RemoveVehicle";
import { Link } from "react-router-dom";

function Vehicle() {
  const { data, isLoading } = useGetVehiclesQuery(null);
  const [vehicleData, setVehicleData] = useState<vehicleModel[]>([]);
  useEffect(
    function () {
      if (data) {
        setVehicleData(data.result);
      }
    },
    [data]
  );
  if (!data) return <Loader />;
  return (
    <div className="text-center">
      <div className="text-center">
        <Link to={"/Admin/CreateVehicle"}>
          <a className="btn btn-warning" type="button">
            {" "}
            Create Vehicle{" "}
          </a>
        </Link>
      </div>
      <table>
        <thead className="table-dark">
          <tr>
            <th className="fw-bold">Id</th>
            <th className="fw-bold">Vehicle Name</th>
            <th className="fw-bold">Price</th>
            <th className="fw-bold">Auction Price</th>
            <th className="fw-bold">Manufacturing Year</th>
            <th className="fw-bold">Image</th>
            <th className="fw-bold">Delete</th>
            <th className="fw-bold">Create</th>
          </tr>
        </thead>

        <tbody>
          {vehicleData.map((vehicle: vehicleModel, index: number) => (
            <tr key={vehicle.vehicleId}>
              <td>{index + 1}</td>
              <td>{vehicle.brandAndModel}</td>
              <td>{vehicle.price}</td>
              <td>{vehicle.auctionPrice}</td>
              <td>{vehicle.manufacturingYear}</td>
              <td>
                <img
                  style={{ width: "200px", height: "220px" }}
                  src={vehicle.image}
                  alt="vehicle"
                />
              </td>
              <td>
                <RemoveVehicle
                  vehicleId={vehicle.vehicleId}
                  onRemoveSuccess={() => {
                    setVehicleData((prev) =>
                      prev.filter((v) => v.vehicleId !== vehicle.vehicleId)
                    );
                  }}
                />
              </td>
              <td>
                <Link to={`/Admin/CreateVehicle/${vehicle.vehicleId}`}>
                  <button className="btn btn-warning">
                    <i className="bi bi-pen"></i>
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Vehicle;
