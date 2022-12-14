import axios from 'axios';

// ACTION TYPES
const SET_CART = 'SET_CART';
const UPDATE_CART = 'UPDATE_CART';

// ACTION CREATORS
const setCart = (cart) => {
  return {
    type: SET_CART,
    cart,
  };
};

const _updateCart = (cart) => {
  return {
    type: UPDATE_CART,
    cart,
  };
};

// THUNKS
const TOKEN = 'token';
export const fetchCart = () => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      const { data: cart } = await axios.get('/api/cart', {
        headers: {
          authorization: token,
        },
      });
      dispatch(setCart(cart));
    } catch (error) {
      console.error(`fetchCartThunk not working`, error);
    }
  };
};

export const addToCartThunk = (product) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      const { data: addToCart } = await axios.post(
        '/api/cart/addToCart',
        product,
        {
          headers: {
            authorization: token,
          },
        }
      );
      dispatch(setCart(addToCart));
    } catch (error) {
      console.error(`addCartThunk not workinh`, error);
    }
  };
};

export const removeProductFromCartThunk = (productId) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      const { data: removedFromCart } = await axios.post(
        '/api/cart/removeFromCart',
        productId,
        {
          headers: {
            authorization: token,
          },
        }
      );
      dispatch(setCart(removedFromCart));
    } catch (error) {
      console.error(`removeProductFromCartThunk not working`, error);
    }
  };
};

//REDUCER
const cartReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_CART:
      return action.cart;
    case UPDATE_CART:
      return action.cart;
    default:
      return state;
  }
};

export default cartReducer;
