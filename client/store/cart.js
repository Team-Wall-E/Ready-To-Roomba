import axios from "axios";
const TOKEN = "token";
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
export const fetchCart = () => {
   return async (dispatch) => {
      try {
         const token = window.localStorage.getItem(TOKEN);
         const { data: cart } = await axios.get("/api/cart", {
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

export const updateCart = (productId, quantity) => {
   const cartUpdate = { productId, quantity };
   return async (dispatch) => {
      try {
         const token = window.localStorage.getItem(TOKEN);
         const { data: updatedCart } = await axios.post(
            "/api/cart",
            cartUpdate,
            {
               headers: {
                  authorization: token,
               },
            }
         );
         dispatch(_updateCart(updatedCart));
      } catch (error) {
         console.error(error);
      }
   };
};

export const removeProductFromCart = (productId) => {
   return async (dispatch) => {
      try {
         const token = window.localStorage.getItem(TOKEN);
         const { data: updatedCart } = await axios.delete(
            `/api/cart/${productId}`,
            {
               headers: {
                  authorization: token,
               },
            }
         );
         dispatch(_updateCart(updatedCart));
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
export default (state = {}, action) => {
   switch (action.type) {
      case SET_CART:
         return action.cart;
      case UPDATE_CART:
         return action.updatedCart;
      default:
         return state;
   }
};
