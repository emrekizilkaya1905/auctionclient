import React, { useEffect, useState } from "react";
import { useGetBidByVehicleIdQuery } from "../../Api/bidApi";
import { Loader } from "../../Helper";
import "./Styles/bid.css";
import { useCheckStatusAuctionPriceMutation } from "../../Api/paymentHistoryApi";
import { checkStatus } from "../../interfaces/checkStatus";
import userModel from "../../interfaces/userModel";
import { RootState } from "../../Storage/store";
import { useSelector } from "react-redux";
import { useGetVehicleByIdQuery } from "../../Api/vehicleApi";
import CreateBid from "./CreateBid";
import { useNavigate } from "react-router-dom";
import { bidModel } from "../../interfaces/bidModel";
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import { newBidModelResponse } from "../../interfaces/newBidModelResponse";
import { ToastrNotify } from "../../Helper";

function BidsDetail(props: { vehicleId: string }) {
  const navigate = useNavigate();
  const { data } = useGetBidByVehicleIdQuery(parseInt(props.vehicleId));
  const [checkStatusAuction] = useCheckStatusAuctionPriceMutation();

  const userStore: userModel = useSelector(
    (state: RootState) => state.authenticationStore
  );
  const bidStore: any = useSelector((state: RootState) => state.bidStore);
  const [bidState, setBidState] = useState<newBidModelResponse[]>([]);
  const [triggerConnection, setTriggerConnectionState] = useState<boolean>();
  const [hubConnection, setHubConnection] = useState<HubConnection>();
  const [result, setResult] = useState();

  const response_data = useGetVehicleByIdQuery(parseInt(props.vehicleId));
  if (response_data) {
  }
  useEffect(() => {
    if (data) {
      setBidState(data.result);
    }
  }, [data]);
  useEffect(() => {
    createHubConnection();
  }, []);

  async function createHubConnection() {
    const hubConnection = new HubConnectionBuilder()
      .withUrl("https://localhost:7186/BidUpdate/Hub")
      .configureLogging(LogLevel.Information)
      .build();
    try {
      await hubConnection.start();
    } catch (error) {}
    setHubConnection(hubConnection);
  }
  useEffect(() => {
    if (hubConnection) {
      const checkModel: checkStatus = {
        userId: userStore.nameid!,
        vehicleId: parseInt(props.vehicleId),
      };
      checkStatusAuction(checkModel)
        .then((response: any) => {
          setResult(response!.data?.isSuccess);
        })
        .catch((error) => {
          console.error(error);
        });
      hubConnection
        .send("NewBid", parseInt(props.vehicleId))
        .catch((err) => console.error(err));
      setTriggerConnectionState(true);
    }
  }, [
    props.vehicleId,
    checkStatusAuction,
    userStore.nameid,
    hubConnection,
    bidStore,
  ]);

  useEffect(() => {
    if (hubConnection) {
      hubConnection.on("messageReceived", (message: any) => {
        setBidState(message);
      });
    }
  }, [hubConnection, triggerConnection]);
  function handleCheckout(props: any) {
    var token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
    navigate(`/Vehicle/BidCheckout/${props}`);
  }
  if (!data) {
    return <Loader />;
  }

  return (
    <>
      {result ? (
        <div className="container mb-4">
          <CreateBid vehicleId={parseInt(props.vehicleId)}></CreateBid>
        </div>
      ) : (
        <div className="container mb-4">
          <button
            className="btn btn-warning"
            type="button"
            onClick={() => handleCheckout(props.vehicleId)}
          >
            Pay Pre Auction Price $
            {response_data.currentData?.result.auctionPrice}
          </button>
        </div>
      )}

      <div className="bid-list">
        {bidState
          ?.slice()
          .sort((a: bidModel, b: bidModel) => b.bidAmount - a.bidAmount)
          .map((bid: any, key: any) => {
            return (
              <div key={bid.bidId} className="mt-4">
                <div className="bid">
                  <span className="bid-number">{key + 1}</span>{" "}
                  <span className="bid-date">
                    {new Date(bid.bidDate).toLocaleString("sv-SE", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </span>
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
