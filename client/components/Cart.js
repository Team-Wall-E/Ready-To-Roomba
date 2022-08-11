import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeProductFromCartThunk, addToCartThunk } from '../store/cart';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
// import StripeBtn from "./Stripe";

export const Cart = ({ cart, removeFromCart, addToCart }) => {
  const lineItems = cart.lineItems || [];

  let totalQuantity = 0;
  
  const tax = 1.08875;
  const tax2 = 0.08875;

  let cartSubtotal = 0;
  console.log('🫐', cart);

  return (
    <div className='d-flex flex-wrap align-items-center justify-content-center justify-content-md-between p-5 mb-5'>
      <div>
        {lineItems.length === 0 ? (
          <div>Your cart is empty</div>
        ) : (
          <div>
            <h2>Cart</h2>
            <Table className='mt-5'>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Product Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {lineItems.map((lineItem) => {
                  return (
                    <tr key={lineItem.id}>
                      <td>
                        <img
                          className='cart-img'
                          src={lineItem.product.imageUrl}
                        />
                      </td>
                      <td>{lineItem.product.productName}</td>
                      <td>
                        <Button
                          onClick={() => removeFromCart(lineItem.product)}
                          className='btn-link'
                        >
                          <i className='bi bi-chevron-down'></i>
                        </Button>
                        {lineItem.orderQuantity}
                        <Button
                          onClick={() => addToCart(lineItem.product)}
                          className='btn-link'
                        >
                          <i className='bi bi-chevron-up'></i>
                        </Button>
                      </td>
                      <td>$ {lineItem.product.price}</td>

                      <td hidden>
                        {
                          (cartSubtotal +=
                            lineItem.product.price * lineItem.orderQuantity)
                        }
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <div className='w-100 text-end p-5'>
              <div>
                <label>Subtotal:</label> $ {cartSubtotal.toFixed(2)}
              </div>
              <div>
                <label>Tax:</label> $ {(cartSubtotal * tax2).toFixed(2)}
              </div>
              <div>
                <label>Total:</label> $ {(cartSubtotal * tax).toFixed(2)}
              </div>
            </div>
            <div className='w-100 text-end '>
              <Button
                href='/products/'
                variant='secondary'
                className='back-2-shopping'
              >
                Back to Shopping
              </Button>
              <Button
                href='/checkout'
                variant='secondary'
              >Checkout</Button>
              {/* <StripeBtn>
                Payment
              </StripeBtn> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const mapState = (state) => ({
  cart: state.cart,
  product: state.product,
});

const mapDispatch = (dispatch) => ({
  removeFromCart: (product) => dispatch(removeProductFromCartThunk(product)),
  addToCart: (product) => dispatch(addToCartThunk(product)),
});

export default connect(mapState, mapDispatch)(Cart);
