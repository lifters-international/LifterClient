import React, { useState } from "react";

import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";

export const SubscribeCheckOutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmSetup({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: '',
      },
      redirect: "if_required"
    });


    if (error) {
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Show error to your customer (for example, payment
      // details incomplete)
      setMessage(error.message as string);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
      window.location.reload();
    }

    setIsLoading(false);
  };

  const paymentElementOptions: any = {
    layout: "tabs"
  }

  return (
    <div id="payment-form">
      <PaymentElement id="payment-element" options={paymentElementOptions} />

      <button disabled={isLoading || !stripe || !elements} id="submit" type="button" onClick={handleSubmit}>
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </button>

      {message && <div id="payment-message">{message}</div>}
    </div>
  );
}

