import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetVehicleByIdQuery } from "../../Api/vehicleApi";
import { useSelector } from "react-redux";
import { RootState } from "../../Storage/store";
import userModel from "../../interfaces/userModel";
import { useDoPaymentMutation } from "../../Api/paymentApi";
import { Loader } from "../../Helper";
import "./Styles/bidCheckout.css";

function BidCheckout() {
  const { vehicleId } = useParams();
  const { data, isLoading } = useGetVehicleByIdQuery(vehicleId);
  const userStore: userModel = useSelector(
    (state: RootState) => state.authenticationStore
  );
  const [initialPayment] = useDoPaymentMutation();
  const initialState = {
    name: userStore.fullName,
    email: userStore.email,
    phoneNumber: "",
  };
  const [phone, setPhoneState] = useState(initialState.phoneNumber);
  const [name, setNameState] = useState(initialState.name);
  const [email, setEmailState] = useState(initialState.email);
  const [loading, setLoadingState] = useState<boolean>();
  function handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoadingState(true);
    ///Is Kodlari
    setLoadingState(false);
  }
  if (data) {
    return (
      <div className="container">
        <div className="card text-center">
          <form onSubmit={handleSubmit}>
            <img src={data.result.image} className="card-image" />
            <div className="card-content text-center">
              <h3 className="card-title"> {data.result.brandAndModel} </h3>
              <p className="card-text">
                {" "}
                <span className="text-black bold">
                  {" "}
                  ${data.result.auctionPrice}{" "}
                </span>{" "}
              </p>
            </div>
            <div className="container">
              <div className="form-group mt-3">
                <span className="text-black">
                  {" "}
                  <strong> Name </strong>{" "}
                </span>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Default input"
                  defaultValue={name}
                  onChange={(e) => setNameState(e.target.value)}
                  aria-label="default input example"
                ></input>
              </div>
              <div className="form-group mt-3">
                <span className="text-black">
                  {" "}
                  <strong> Email </strong>{" "}
                </span>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Default input"
                  defaultValue={email}
                  onChange={(e) => setEmailState(e.target.value)}
                  aria-label="default input example"
                ></input>
              </div>
              <div className="form-group mt-3">
                <span className="text-black">
                  {" "}
                  <strong> PhoneNumber </strong>{" "}
                </span>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Default input"
                  defaultValue={phone}
                  onChange={(e) => setPhoneState(e.target.value)}
                  aria-label="default input example"
                ></input>
              </div>
            </div>
            <div className="card-footer">
              <button
                type="submit"
                className="btn btn-lg btn-success form-control mt-3"
              >
                {loading ? <Loader></Loader> : " Pay Auction Price"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  } else {
    return <Loader></Loader>;
  }
}

export default BidCheckout;
