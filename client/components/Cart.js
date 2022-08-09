import React from 'react';
import { connect } from 'react-redux';
import { fetchCart, removeProductFromCartThunk } from '../store/cart';


export const Cart = ({ cart, removeFromCart }) => {
  const lineItems = cart.lineItems || [];
  console.log('🫐', lineItems);

  return (
    <div>
      {/* PROF */}
      <ul>
        {lineItems.map((lineItem) => {
          return (
            <li key={lineItem.id}>
              {lineItem.product.productName}({lineItem.orderQuantity})
              <button onClick={() => removeFromCart(lineItem.product)}>
                x
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const mapState = (state) => ({
  cart: state.cart,
  //#try no line items unless prof says so
  // lineItems:  state.lineItems,
});

const mapDispatch = (dispatch) => ({
  // getCart: () => dispatch(fetchCart()),
  removeFromCart: (product) => dispatch(removeProductFromCartThunk(product)),

});

export default connect(mapState, mapDispatch)(Cart);
