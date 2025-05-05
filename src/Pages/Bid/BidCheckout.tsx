import React from "react";
import { useParams } from "react-router-dom";

function BidCheckout() {
  const { vehicleId } = useParams();
  console.log(vehicleId);
  return <div></div>;
}

export default BidCheckout;
