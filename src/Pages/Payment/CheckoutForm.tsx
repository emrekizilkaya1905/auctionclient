import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../Storage/store";
import { useCreatePaymentHistoryMutation } from "../../Api/paymentHistoryApi";
import orderModel from "../../interfaces/orderModel";

const CheckoutForm = () => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const [createPaymentHistory] = useCreatePaymentHistoryMutation();
  const orderStore: orderModel = useSelector(
    (state: RootState) => state.orderStore
  );
  const vehicleId: string = useSelector(
    (state: RootState) => state.vehicleStore.vehicleId
  );
  const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setIsProcessing(true);
    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "https://example.com/order/123/complete",
      },
      redirect: "if_required",
    });
    if (result.error) {
      setIsProcessing(false);
    }

    if (result.paymentIntent?.status === "succeeded") {
      const response = createPaymentHistory({
        clientSecret: orderStore.clientSecret,
        stripePaymentId: orderStore.stripePaymentId,
        userid: orderStore.userId,
        vehicleId: orderStore.vehicleId,
      });
      navigate(`/Vehicle/VehicleId/${vehicleId}`);
    }
    setIsProcessing(false);
  };
  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <div className="text-center mt-2">
        <button
          disabled={!stripe || isProcessing}
          type="submit"
          className="btn btn-primary"
        >
          {" "}
          {isProcessing ? "Processing..." : "Submit Pay"}
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;
