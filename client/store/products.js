import axios from 'axios';

const SET_PRODUCTS = 'SET_PRODUCTS';
const CREATE_PRODUCT = 'CREATE_PRODUCT';
const DELETE_PRODUCT = 'DELETE_PRODUCT';

export const setProducts = (products) => ({
  type: SET_PRODUCTS,
  products,
});

const createProduct = (product) => {
  return {
    type: CREATE_PRODUCT,
    product,
  };
};

const deleteProduct = (product) => {
  return {
    type: DELETE_PRODUCT,
    product,
  };
};

export const fetchProducts = () => async (dispatch) => {
  const productsResponse = await axios.get('/api/products');
  dispatch(setProducts(productsResponse.data));
};

export const createProductThunk = (product, history) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`/api/products`, product);
      dispatch(createProduct(response.data));
      history.push('/products');
    } catch (err) {
      console.log(err.response);
    }
  };
};

export const deleteProductThunk = (id, history) => {
  return async (dispatch) => {
    try {
      const { data: product } = await axios.delete(`/api/products/${id}`);
      dispatch(deleteProduct(product));
      history.push('/products');
    } catch (err) {
      console.log(err.response);
    }
  };
};

export default function productsReducer(products = [], action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products;
    case CREATE_PRODUCT:
      return [...products, action.product];
    case DELETE_PRODUCT:
      return products.filter((product) => product.id !== action.product.id);
    default:
      return products;
  }
}
