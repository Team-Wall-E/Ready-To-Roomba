import axios from "axios";

// ACTION TYPEs
const GET_USER_ORDERS = "GET_USER_ORDERS";

// Action Creators
const getUserOrders = (orders) => {
  return {
    type: GET_USER_ORDERS,
    orders,
  }
};

// Thunk Creator
export const loadUserOrdersThunk = (userId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/users/${userId}/orderHistory`);
      dispatch(getUserOrders(data));
    } catch (e) {
      console.error(e);
    }
  }
};

// Initial State
const initialState = [];

// Reducer
export default function ordersReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_ORDERS:
      return action.orders;
    default:
      return state;
  }
};
