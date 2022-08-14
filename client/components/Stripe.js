import React, { Fragment } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const StripeBtn = () => {
  const publishableKey =
    'pk_test_51LUbVTEXNlVtLEphjQMCFjrln5Vt91r2BE6koJHyUaDp1qTSnaC8LP8OJ4UnpJBCGPTYTqP5ZtHnzOEYC54JhT0600c3UdcJCe';

  const onToken = (token) => {
    const body = {
      amount: 999,
      token: token,
    };
    axios
      .post('/api/cart/stripe', body)
      .then((response) => {
        alert('Payment successful');
      })
      .catch((error) => {
        alert('Payment declined');
      });
  };
  return (
    <StripeCheckout
      label='Confirm Payment' //Component button text
      name='Ready To Roomba' //Modal Header
      description='Thank you for your support!'
      panelLabel='Confirm' //Submit button in modal
      //   amount={999} //Amount in cents $9.99
      token={onToken}
      stripeKey={publishableKey}
      image='https://scalebranding.com/wp-content/uploads/2021/07/Star-game-robot-logo.jpg' //Pop-in header image
      billingAddress={false}
    />
  );
};
export default StripeBtn;
