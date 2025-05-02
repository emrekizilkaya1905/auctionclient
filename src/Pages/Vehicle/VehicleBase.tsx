import React, { useEffect, useState } from "react";
import { useGetVehiclesQuery } from "../../Api/vehicleApi";
import { vehicleModel } from "../../interfaces/vehicleModel";
import VehicleList from "./VehicleList";

function VehicleBase() {
  const { data, isLoading } = useGetVehiclesQuery(null);
  const [vehicles, setVehiclesState] = useState<vehicleModel[]>([]);

  useEffect(
    function () {
      if (data) {
        console.log(data);
        setVehiclesState(data.result || []);
      }
    },
    [data]
  );
  return (
    <div className="container">
      <div className="row">
        <VehicleList vehicles={vehicles}></VehicleList>
      </div>
    </div>
  );
}

export default VehicleBase;
