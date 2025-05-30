import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetVehicleByIdQuery } from "../../Api/vehicleApi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Storage/store";
import userModel from "../../interfaces/userModel";
import { useDoPaymentMutation } from "../../Api/paymentApi";
import { Loader } from "../../Helper";
import "./Styles/bidCheckout.css";
import { apiResponse } from "../../interfaces/apiResponse";
import { getOrderInfo } from "../../Storage/Redux/orderSlice";
import { getVehicle } from "../../Storage/Redux/vehicleSlice";

function BidCheckout() {
  const { vehicleId } = useParams();
  const { data } = useGetVehicleByIdQuery(vehicleId);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
  const [loading, setLoading] = useState<boolean>();
  async function handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const { data }: apiResponse = await initialPayment({
      userId: userStore.nameid,
      vehicleId: vehicleId,
    });
    if (data)
      dispatch(
        getOrderInfo({
          vehicleId: data?.result.vehicleId,
          userId: data?.result.userId,
          stripePaymentId: data?.result.stripePaymentId,
          clientSecret: data?.result.clientSecret,
        })
      );

    if (vehicleId) {
      dispatch(getVehicle(vehicleId!));
    }
    navigate("/payment", {
      state: { apiResult: data?.result, userStore },
    });
    setLoading(false);
  }
  if (data) {
    return (
      <div className="container">
        <div className="card text-center">
          <form onSubmit={handleSubmit}>
            <img src={data.result.image} className="card-image" alt="Car" />
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
