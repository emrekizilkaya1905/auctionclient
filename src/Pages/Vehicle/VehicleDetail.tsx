import React from "react";
import { useParams } from "react-router-dom";
import { useGetVehicleByIdQuery } from "../../Api/vehicleApi";

export default function VehicleDetail() {
  const { vehicleId } = useParams();
  const { data, isLoading } = useGetVehicleByIdQuery(vehicleId);
  if (data) {
    console.log(data);
  }
  return <div>Emre</div>;
}
