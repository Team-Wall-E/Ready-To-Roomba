import axios from 'axios';

const SET_CART = 'SET_CART';
const UPDATED_CART = 'UPDATED_CART';

const setCart = (cart) => {
  return {
    type: SET_CART,
    cart,
  };
};

const gotUpdatedCart = (updatedCart) => {
  return {
    type: UPDATED_CART,
    updatedCart,
  };
};

export const fetchCart = () => {
  const token = window.localStorage.getItem('token');
  return async (dispatch) => {
    const { data: cart } = await axios.get('/api/cart', {
      headers: {
        authorization: token,
      },
    });
    dispatch(setCart(cart));
  };
};

export const updateCart = (productId, quantity) => {
  const cartUpdate = { productId, quantity };
  const token = window.localStorage.getItem('token');
  return async (dispatch) => {
    const { data: updatedCart } = await axios.post('/api/cart', cartUpdate, {
      headers: {
        authorization: token,
      },
    });
    dispatch(gotUpdatedCart(updatedCart));
  };
};

export const removeProductFromCart = (productId) => {
  const token = window.localStorage.getItem('token');
  return async (dispatch) => {
    const { data: updatedCart } = await axios.delete(`/api/cart/${productId}`, {
      headers: {
        authorization: token,
      },
    });
    dispatch(gotUpdatedCart(updatedCart));
  };
};

export const checkoutCart = () => {
  const token = window.localStorage.getItem('token');
  return async (dispatch) => {
    await axios.get('/api/cart/checkout', {
      headers: {
        authorization: token,
      },
    });
  };
};

export default (state = {}, action) => {
  switch (action.type) {
    case SET_CART:
      return action.cart;
    case UPDATED_CART:
      return action.updatedCart;
    default:
      return state;
  }
};
