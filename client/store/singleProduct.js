import axios from "axios";

export const SET_PRODUCT = "SET_PRODUCT";
const UPDATE_PRODUCT = "UPDATE_PRODUCT";

export const setProduct = (product) => ({
   type: SET_PRODUCT,
   product,
});

const updateProduct = (product) => {
   return {
      type: UPDATE_PRODUCT,
      product,
   };
};

export const fetchProduct = (id) => {
   return async (dispatch) => {
      try {
         const response = await axios.get(`/api/products/${id}`);
         dispatch(setProduct(response.data));
      } catch (err) {
         console.log(err.response);
      }
   };
};

const TOKEN = "token";

export const updateProductThunk = (id, product) => {
   const token = window.localStorage.getItem(TOKEN);
   return async (dispatch) => {
      try {
         const response = await axios.put(`/api/products/${id}`, product, {
            headers: {
               authorization: token,
            },
         });
         dispatch(updateProduct(response.data));
      } catch (err) {
         console.log(err.response);
      }
   };
};

const productReducer = (product = {}, action) => {
   switch (action.type) {
      case SET_PRODUCT:
         return action.product;
      case UPDATE_PRODUCT:
         return { ...product, ...action.product };
      default:
         return product;
   }
};

export default productReducer;