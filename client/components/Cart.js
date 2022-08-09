import React from 'react';
import { connect } from 'react-redux';
import { removeProductFromCartThunk } from '../store/cart';

export const Cart = ({ cart, removeFromCart }) => {
  const lineItems = cart.lineItems || [];
  const tax = 0.08875;
  let subtotal = [];
  console.log('🫐', cart);

  return (
    <div>
      {/* PROF */}
      <ul>
        {lineItems.map((lineItem) => {
          return (
            <div key={lineItem.id}>
              <li >
                {lineItem.product.productName}({lineItem.orderQuantity})
                <div>Item Total:</div>
                <div>$ {lineItem.orderQuantity * lineItem.product.price}</div>
                <button onClick={() => removeFromCart(lineItem.product)}>
                  x
                </button>
              </li>
            </div>
          );
        })}
        <br />
        <div>Subtotal: </div>
      </ul>
    </div>
  )
};

const mapState = (state) => ({
  cart: state.cart,
  product: state.product
});

const mapDispatch = (dispatch) => ({
  removeFromCart: (product) => dispatch(removeProductFromCartThunk(product))
});

export default connect(mapState, mapDispatch)(Cart);
