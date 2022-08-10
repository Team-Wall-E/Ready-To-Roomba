import axios from 'axios';

// ACTION TYPES
const SET_CART = 'SET_CART';
const DELETE_CART = 'DELETE_CART';

// ACTION CREATORS
const setCart = (cart) => {
  return {
    type: SET_CART,
    cart,
  };
};

export const deleteCart = (cart) => {
  return {
    type: DELETE_CART,
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
      console.error(error);
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
      console.log('🍋', addToCart);
      dispatch(setCart(addToCart));
    } catch (error) {
      console.error(error);
    }
  };
};

export const removeProductFromCartThunk = (product) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      const { data: removedFromCart } = await axios.post(
        '/api/cart/removeFromCart',
        product,
        {
          headers: {
            authorization: token,
          },
        }
      );
      dispatch(setCart(removedFromCart));
    } catch (error) {
      console.error(error);
    }
  };
};

export const clearCartThunk = (cartId) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      const { data: cart } = await axios.put(`/api/cart/clearCart${cartId}`, {
        headers: {
          authorization: token,
        },
      });
      dispatch(deleteCart(cart));
    } catch (e) {
      console.error(e);
    }
  }
}

//REDUCER
const initialState = {};
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CART:
      return action.cart;
    case DELETE_CART: 
      return initialState = {};
    default:
      return state;
  }
};

export default cartReducer;
