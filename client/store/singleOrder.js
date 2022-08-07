import axios from 'axios';

export const SET_ORDER = 'SET_ORDER';
const UPDATE_ORDER = 'UPDATE_ORDER';

export const setOrder = (order) => ({
  type: SET_ORDER,
  order,
});

const updateOrder = (order) => {
  return {
    type: UPDATE_ORDER,
    order,
  };
};

export const fetchOrder = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/api/orders/${id}`);
      dispatch(setOrder(response.data));
    } catch (err) {
      console.log(err.response);
    }
  };
};

export const updateOrderThunk = (order) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`/api/orders/${order.id}`, order);
      dispatch(updateOrder(response.data));
    } catch (err) {
      console.log(err.response);
    }
  };
};

const orderReducer = (order = {}, action) => {
  switch (action.type) {
    case SET_ORDER:
      return action.order;
    case UPDATE_ORDER:
      return { ...order, ...action.order };
    default:
      return order;
  }
};

export default orderReducer;
