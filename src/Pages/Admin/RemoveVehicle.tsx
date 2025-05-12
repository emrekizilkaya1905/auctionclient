import React from "react";
import { useRemoveVehicleMutation } from "../../Api/vehicleApi";
import { ToastrNotify } from "../../Helper";

function RemoveVehicle(props: {
  vehicleId: number;
  onRemoveSuccess: () => void;
}) {
  const [removeVehicleMutation] = useRemoveVehicleMutation();

  const handleRemoveVehicleEvent = async () => {
    const response: any = await removeVehicleMutation(props.vehicleId);
    if (response.data?.isSuccess) {
      ToastrNotify("Remove process is success", "success");
      props.onRemoveSuccess(); // Ana tabloyu güncelle
    }
  };

  return (
    <button className="btn btn-danger" onClick={handleRemoveVehicleEvent}>
      <i className="bi bi-trash-fill"></i>
    </button>
  );
}

export default RemoveVehicle;
