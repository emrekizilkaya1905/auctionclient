import React, { useEffect, useState } from "react";
import { useGetVehiclesQuery } from "../../Api/vehicleApi";
import { vehicleModel } from "../../interfaces/vehicleModel";
import "./Styles/VehicleList.css";
import Circle from "./Circle";
import { Link } from "react-router-dom";
import Banner from "./Banner";

function VehicleList() {
  const { data, isLoading } = useGetVehiclesQuery(null);
  const [vehicles, setVehiclesState] = useState<vehicleModel[]>([]);

  useEffect(() => {
    if (data) {
      setVehiclesState(data.result || []);
    }
  }, [data]);

  return (
    <div className="container">
      <Banner></Banner>
      <div className="row">
        {vehicles.map((vehicle: any, index: any) => {
          return (
            <div className="col" key={index}>
              <div className="auction-card text-center">
                <div className="card-image text-center">
                  <img src={vehicle.image} alt="Car image" />
                </div>
                <div className="card-details text-center">
                  <h2>{vehicle.brandAndModel} </h2>
                  <p>
                    {" "}
                    <strong>Year:</strong>
                    {vehicle.manufacturingYear}
                  </p>
                  <p>
                    {" "}
                    <strong>Color:</strong>
                    {vehicle.color}{" "}
                  </p>
                  <p>
                    {" "}
                    <strong>Current Bid:</strong> ${vehicle.price}{" "}
                  </p>
                  <p>
                    {" "}
                    <strong>EndTime:</strong> {vehicle.endTime}{" "}
                  </p>
                </div>
                <div>
                  <Link to={`Vehicle/VehicleId/${vehicle.vehicleId}`}>
                    <button className="btn btn-danger">Detail</button>
                  </Link>
                  <Circle vehicle={vehicle}></Circle>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default VehicleList;
