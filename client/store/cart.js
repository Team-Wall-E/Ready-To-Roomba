import axios from "axios";

// ACTION TYPES
const SET_CART = "SET_CART";
const UPDATE_CART = "UPDATE_CART";

// ACTION CREATORS
const setCart = (cart) => {
  return {
    type: SET_CART,
    cart,
  };
};

const _updateCart = (updatedCart) => {
  return {
    type: UPDATE_CART,
    updatedCart,
  };
};

// THUNKS
const TOKEN = "token";
export const fetchCart = () => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      
      if(token) {
        const { data: cart } = await axios.get("/api/cart", {
          headers: {
            authorization: token,
          },
        });
        console.log("🍇", cart);
        dispatch(setCart(cart));
      } else {
        const { data: cart } = await axios.get("/api/cart");
        console.log("🥬", cart);
        dispatch(setCart(cart));
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const addToCartThunk = (product) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      
      if(token) {
        const { data: addToCart } = await axios.post(
          "/api/cart/addToCart",
          product,
          {
            headers: {
              authorization: token,
            },
          }
        );
        console.log("🍋", addToCart);
        dispatch(setCart(addToCart));
      } else {
        const { data: addToCart } = await axios.post(
          "/api/cart/addToCart",
          product
        );
        console.log("🧅", addToCart);
        dispatch(setCart(addToCart));
      }
    } catch (error) {
      console.error(error);
    }
  };
};

// export const updateCart = (productId, quantity) => {
//   const cartUpdate = { productId, quantity };
//   const token = window.localStorage.getItem('token');
//   return async (dispatch) => {
//     try {
//       const { data: updatedCart } = await axios.post('/api/cart', cartUpdate, {
//         headers: {
//           authorization: token,
//         },
//       });
//       dispatch(_updateCart(updatedCart));
//     } catch (error) {
//       console.error(error);
//     }
//   };
// };

export const removeProductFromCartThunk = (product) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      const { data: removedFromCart } = await axios.post(
        "/api/cart/removeFromCart",
        product,
        {
          headers: {
            authorization: token,
          },
        }
      );
      console.log("🍅", removedFromCart);
      dispatch(setCart(removedFromCart));
    } catch (error) {
      console.error(error);
    }
  };
};

// export const checkoutCart = () => {
//   const token = window.localStorage.getItem('token');
//   return async (dispatch) => {
//     await axios.get('/api/cart/checkout', {
//       headers: {
//         authorization: token,
//       },
//     });
//   };
// };

//REDUCER
const cartReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_CART:
      return action.cart;
    case UPDATE_CART:
      return action.updatedCart;
    default:
      return state;
  }
};

export default cartReducer;