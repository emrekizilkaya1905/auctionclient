import React, { useState } from "react";
import { useCreateBidMutation } from "../../Api/bidApi";
import { bidModel } from "../../interfaces/bidModel";
import userModel from "../../interfaces/userModel";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Storage/store";

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
    console.log(bidModel);
    createBid(bidModel).then((response) => {
      console.log(response);
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
          <button type="submit" onClick={() => handleCreateBid()}>
            Place Bid
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateBid;
