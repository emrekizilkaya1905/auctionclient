import { Elements } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Loader } from "../../Helper";
import { loadStripe } from "@stripe/stripe-js";

import CheckoutForm from "./CheckoutForm";
import { Modal } from "react-bootstrap";

function Payment() {
  const location = useLocation();
  const { apiResult, userStore } = location.state;
  const [show, setShow] = useState(true);

  const stripePromise = loadStripe(
    "pk_test_51R4XLZP8VXreZ1jkhJZ8c282qwyNKDABGm8S2Zo630i367vHwsomE9EhLbSuodLneDA3yHD85EQ8fRR3gl7Iw3EW00qx67u324"
  );
  if (apiResult) {
    const options = {
      clientSecret: apiResult.clientSecret,
    };

    return (
      <div>
        <Elements stripe={stripePromise} options={options}>
          <div className="container m5 p-5">
            <div className="row">
              <Modal show={show}>
                <div className=" container">
                  <CheckoutForm></CheckoutForm>
                </div>
              </Modal>
            </div>
          </div>
        </Elements>
      </div>
    );
  } else {
    return <Loader />;
  }
}

export default Payment;
