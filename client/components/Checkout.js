import React from "react";
import { connect } from 'react-redux';


import { clearCartThunk, fetchCart } from "../store/cart";

class Checkout extends React.Component {
    componentDidMount() {
        this.props.fetchCart();
    }
};

const mapState = (state) => {
    return {
        cart: state.cart,
        product: state.product
    }
};

const mapDispatch = (dispatch) => {
    return {
        clearCart: (cart) => dispatch(clearCartThunk(cart)),
        fetchCart: () => dispatch(fetchCart())
    }
};

export default connect(mapState, mapDispatch)(Checkout);