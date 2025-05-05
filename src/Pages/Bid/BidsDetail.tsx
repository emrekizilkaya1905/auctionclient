import React from "react";
import { useGetBidByVehicleIdQuery } from "../../Api/bidApi";
import { Loader } from "../../Helper";
import "./Styles/bid.css";

function BidsDetail(props: { vehicleId: string }) {
  const { data, isLoading } = useGetBidByVehicleIdQuery(
    parseInt(props.vehicleId)
  );
  if (!data) return <Loader />;
  return (
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
  );
}

export default BidsDetail;
