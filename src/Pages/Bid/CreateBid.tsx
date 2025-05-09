import React, { useState } from "react";
import { useCreateBidMutation } from "../../Api/bidApi";
import { bidModel } from "../../interfaces/bidModel";
import userModel from "../../interfaces/userModel";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Storage/store";
import { setBidChange } from "../../Storage/Redux/bidSlice";
import { ToastrNotify } from "../../Helper";

function CreateBid(props: { vehicleId: number }) {
  const [createBid] = useCreateBidMutation();
  const [bidAmount, setBidAmountState] = useState("");

  const userStore: userModel = useSelector(
    (state: RootState) => state.authenticationStore
  );
  const dispatch = useDispatch();
  const bidModel: bidModel = {
    bidAmount: parseInt(bidAmount),
    userId: userStore.nameid!,
    vehicleId: props.vehicleId,
  };
  function handleCreateBid() {
    createBid(bidModel).then((response: any) => {
      if (response.data.isSuccess === true) {
        dispatch(setBidChange(bidModel.bidAmount));
        ToastrNotify("Your bid is success", "success");
      }
      if (response.data.isSuccess === false) {
        ToastrNotify(response.data.errorMessages[0], "error");
      }
    });
  }

  return (
    <div className="container">
      <form>
        <label htmlFor="bidAmount">Bid Amount:</label>
        <input
          type="number"
          name="bidAmount"
          id="bidAmount"
          className="form-control"
          onChange={(e) => setBidAmountState(e.target.value)}
        />
        <div className="text-center">
          <button type="button" onClick={() => handleCreateBid()}>
            Place Bid
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateBid;
