import React from "react";
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';

// import { loadStripe } from '@stripe/stripe-js';
// import { Elements } from "@stripe/react-stripe-js";

// const stripePromise = loadStripe(process.env.PUBLISHABLE_KEY);
// do not call the loadStripe function within the render method component;
// you only want to load it once per page;
// loadStripe() takes the publishable_key as parameter and creates a stripe promise which resolves to stripe.js;
// The PUBLISHABLE_KEY and SECRET_KEY is located in the .env file. You can get the TEST api key version after you create a stripe account;
// The next step is to inject the stripe.js object into the rest of our React.js components;

export const BillingInfo = (props) => {
    const { firstName, lastName, email, address, id, isAdmin } = props;

    return (
        <div>
            <div>
                {!id ? (
                    <div>
                        <h4>Don't have an account?</h4>
                        <Button
                            href='/signup'
                            variant='secondary'
                        >Register here</Button>
                    </div>
                ) : (
                    <div>
                        <h3>Billing Information: </h3>
                        <br />
                        <h4>Full Name: </h4>
                        <h5>{firstName} {lastName}</h5>
                        <br />
                        <h4>Email: </h4>
                        <h5>{email}</h5>
                        <br />
                        <h4>Address: </h4>
                        <h5>{address}</h5>
                        <br />
                        {/* <Elements stripe={stripePromise}> */}
                            <Button>Payment</Button>
                        {/* </Elements> */}
                    </div>
                )}
            </div>
        </div>
    )
};

const mapState = (state) => {
    return {
        id: state.auth.id,
        firstName: state.auth.firstName,
        lastName: state.auth.lastName,
        email: state.auth.email,
        address: state.auth.address,
        isAdmin: state.auth.isAdmin,
    }
};

export default connect(mapState)(BillingInfo);