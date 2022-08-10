import React from 'react';
import { connect } from 'react-redux';
import { removeProductFromCartThunk, addToCartThunk } from '../store/cart';

export const Cart = ({ cart, removeFromCart, addToCart }) => {
  const lineItems = cart.lineItems || [];

  console.log('🌮', lineItems);

  let totalQuantity = 0;
  
  const tax = 1.08875;
  const tax2 = 0.08875;

  let cartSubtotal = 0;
  console.log('🫐', cart);

  return (
    <div>
      
      {lineItems.length === 0 ? <div>Your cart is empty</div>
        : (
        <div>
        <ul>
          {lineItems.map((lineItem) => {
            return (
              <div key={lineItem.id}>
                <li >
                  {lineItem.product.productName}
                  <div>Quantity: {lineItem.orderQuantity}</div>
                  <div hidden>{totalQuantity += lineItem.orderQuantity}</div>
                  <div>Item price:</div>
                  <div>$ {lineItem.product.price}</div>
                  <button onClick={() => removeFromCart(lineItem.product)}>
                    -
                  </button>
          
                  <button onClick={() => addToCart(lineItem.product)}>
                    +
                  </button>
                </li>
                <br />
                <div hidden>{cartSubtotal += (lineItem.product.price * lineItem.orderQuantity)}</div>
              </div>
            );
          })}
        </ul>
      </div>
      )}
      <br />
      <div>Subtotal: $ {(cartSubtotal).toFixed(2)}</div>
      <div>Tax: $ {(cartSubtotal*tax2).toFixed(2)}</div>
      <div>Total: $ {((cartSubtotal*tax)).toFixed(2)}</div>
      <br />
      <h1>Checkout: </h1>
      <button>
        Proceed to checkout ({totalQuantity} items)
      </button>
    </div>
  )
};

const mapState = (state) => ({
  cart: state.cart,
  product: state.product
});

const mapDispatch = (dispatch) => ({
  removeFromCart: (product) => dispatch(removeProductFromCartThunk(product)),
  addToCart: (product) => dispatch(addToCartThunk(product))
});

export default connect(mapState, mapDispatch)(Cart);