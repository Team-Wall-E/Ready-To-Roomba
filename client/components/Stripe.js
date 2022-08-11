import React, { Fragment } from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
const StripeBtn = () => {
    console.log(StripeCheckout)
  const publishableKey = "pk_test_51LUbVTEXNlVtLEphjQMCFjrln5Vt91r2BE6koJHyUaDp1qTSnaC8LP8OJ4UnpJBCGPTYTqP5ZtHnzOEYC54JhT0600c3UdcJCe";
   
  const onToken = token => {
    const body = {
      amount: 999,
      token: token
  };
  axios
      .post("/cart/stripe", body)
      .then(response => {
        console.log(response);
        alert("Payment Success");
      })
      .catch(error => {
        console.log("Payment Error: ", error);
        alert("You broke ass b*tch");
      });
  };
  return (
    <StripeCheckout
      label="Payment" //Component button text
      name="Ready To Roomba" //Modal Header
      description="Let us take your money daddy 😏"
      panelLabel="Pay us" //Submit button in modal
    //   amount={999} //Amount in cents $9.99
      token={onToken}
      stripeKey={publishableKey}
      image="https://scalebranding.com/wp-content/uploads/2021/07/Star-game-robot-logo.jpg" //Pop-in header image
      billingAddress={false}
    />
  );
};
export default StripeBtn;