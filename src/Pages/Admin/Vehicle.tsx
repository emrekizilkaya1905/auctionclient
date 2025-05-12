import React, { useEffect, useState } from "react";
import { useGetVehiclesQuery } from "../../Api/vehicleApi";
import { vehicleModel } from "../../interfaces/vehicleModel";
import { Loader } from "../../Helper";
import "./Styles/Vehicle.css";

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
    <div>
      <div className="text-center"></div>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Vehicle Name</th>
            <th>Price</th>
            <th>Auction Price</th>
            <th>Manufacturing Year</th>
            <th>Image</th>
            <th>Activities</th>
          </tr>
        </thead>

        <tbody>
          {vehicleData.map((vehicle: vehicleModel, index: any) => (
            <>
              <tr>
                <td> {index + 1} </td>
                <td> {vehicle.brandAndModel} </td>
                <td> {vehicle.price} </td>
                <td> {vehicle.auctionPrice} </td>
                <td> {vehicle.manufacturingYear} </td>
                <td>
                  <img
                    style={{ width: "200px", height: "220px" }}
                    src={vehicle.image}
                    alt="vehicle"
                  />
                </td>
                <td></td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Vehicle;
