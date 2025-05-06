import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useState } from "react";

const CheckoutForm = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
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
