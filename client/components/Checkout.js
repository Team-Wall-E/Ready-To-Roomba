import React from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchCart } from '../store/cart';

export const Checkout = (props) => {
    const userCart = props.cart.lineItems || [];
    console.log('🍵', userCart);
    // const apple = props.fetchCart();
    const tax = 1.08875;
    const tax2 = 0.08875;
    let itemSubtotal = 0;

    return (
        <div>
            <Link to="/cart">
                <button>Edit cart</button>
            </Link>
            <br /><br />
            <h1>Order Summary: </h1>
            <br />
            {/* {console.log('🍯', props)} */}
            {userCart.length === 0 ? 
                <div>
                    <div>You don't have anything to checkout</div><br />
                    <Link to="/products">
                        <button>Shop</button>
                    </Link>
                </div>
                : (
                    <div>
                        <ul>
                            {userCart.map((item) => {
                                return (
                                    <div key={item.id}>
                                        <li>
                                            <h4>{item.product.productName}</h4>
                                            <div>qty: {item.orderQuantity}</div>
                                            <div>$ {item.product.price}</div>
                                            <br />
                                        </li>
                                        <div hidden>{itemSubtotal += (item.product.price * item.orderQuantity)}</div>
                                    </div>
                                )
                            })}
                        </ul>
                    </div>
                )
            }
            <div>
                <div>Total(USD): $ {(itemSubtotal).toFixed(2)}</div>
                <div>Tax: $ {(itemSubtotal*tax2).toFixed(2)}</div>
                <div>Grand Total: $ {(itemSubtotal*tax).toFixed(2)}</div>
            </div>
        </div>
    )
};

const mapState = (state) => {
    return {
        cart: state.cart,
        product: state.product
    }
};

const mapDispatch = (dispatch) => {
    return {
        fetchCart: (product) => dispatch(fetchCart(product)),
    }
};

export default connect(mapState, mapDispatch)(Checkout);