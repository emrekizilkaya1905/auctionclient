import React, { useEffect, useState } from "react";
import { useGetBidByVehicleIdQuery } from "../../Api/bidApi";
import { Loader } from "../../Helper";
import "./Styles/bid.css";
import { useCheckStatusAuctionPriceMutation } from "../../Api/paymentHistoryApi";
import { checkStatus } from "../../interfaces/checkStatus";
import userModel from "../../interfaces/userModel";
import { RootState } from "../../Storage/store";
import { useDispatch, useSelector } from "react-redux";
import { useGetVehicleByIdQuery } from "../../Api/vehicleApi";
import CreateBid from "./CreateBid";

function BidsDetail(props: { vehicleId: string }) {
  const { data, isLoading } = useGetBidByVehicleIdQuery(
    parseInt(props.vehicleId)
  );
  const [checkStatusAuction] = useCheckStatusAuctionPriceMutation();
  const userStore: userModel = useSelector(
    (state: RootState) => state.authenticationStore
  );

  var model: any = {};
  const [result, setResult] = useState();
  const response_data = useGetVehicleByIdQuery(parseInt(props.vehicleId));
  if (response_data) {
    console.log(response_data.currentData?.result.auctionPrice);
  }
  useEffect(
    function () {
      const checkModel: checkStatus = {
        userId: userStore.nameid!,
        vehicleId: parseInt(props.vehicleId),
      };
      const response = checkStatusAuction(checkModel)
        .then((response: any) => {
          setResult(response!.data.isSuccess);
        })
        .catch((error) => {
          console.error("Error");
        });
    },
    [checkStatusAuction, props.vehicleId, userStore.nameid]
  );

  if (!data) {
    return <Loader />;
  }

  return (
    <>
      {result ? (
        <div className="container mb-4">
          <CreateBid></CreateBid>
        </div>
      ) : (
        <div className="container mb-4">
          <button className="btn btn-warning" type="button">
            Pay Pre Auction Price $
            {response_data.currentData?.result.auctionPrice}
          </button>
        </div>
      )}

      <div className="bid-list">
        {data.result.map((bid: any) => {
          return (
            <div key={bid.bidId} className="mt-4">
              <div className="bid">
                <span className="bid-number">{bid.bidId}</span>{" "}
                <span className="bid-date">{bid.bidDate}</span>{" "}
                <span className="bid-amount">${bid.bidAmount}</span>{" "}
              </div>
              <br />
            </div>
          );
        })}
      </div>
    </>
  );
}

export default BidsDetail;
