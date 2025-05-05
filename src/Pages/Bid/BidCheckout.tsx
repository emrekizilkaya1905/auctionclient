import React from "react";
import { useParams } from "react-router-dom";
import { useGetVehicleByIdQuery } from "../../Api/vehicleApi";
import { useSelector } from "react-redux";
import { RootState } from "../../Storage/store";
import userModel from "../../interfaces/userModel";

function BidCheckout() {
  const { vehicleId } = useParams();
  const { data, isLoading } = useGetVehicleByIdQuery(vehicleId);
  const userStore: userModel = useSelector(
    (state: RootState) => state.authenticationStore
  );
  console.log(data);

  return <div></div>;
}

export default BidCheckout;
