import axios from 'axios';

const SET_ORDERS = 'SET_ORDERS';
const CREATE_ORDER = 'CREATE_ORDER';
const DELETE_ORDER = 'DELETE_ORDER';

export const setOrders = (orders) => ({
  type: SET_ORDERS,
  orders,
});

const createOrder = (order) => {
  return {
    type: CREATE_ORDER,
    order,
  };
};

const deleteOrder = (order) => {
  return {
    type: DELETE_ORDER,
    order,
  };
};

const TOKEN = 'token';

export const fetchOrders = () => async (dispatch) => {
  console.log('FETCH ORDERS THUNK');
  try {
    const token = window.localStorage.getItem(TOKEN);
    const ordersResponse = await axios.get('/api/:id/orders', {
      headers: {
        authorization: token,
      },
    });
    dispatch(setOrders(ordersResponse.data));
  } catch (error) {
    console.error(error);
  }
};

export const createOrderThunk = (order, history) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      const response = await axios.post(`/api/orders`, order, {
        headers: {
          authorization: token,
        },
      });
      dispatch(createOrder(response.data));
      history.push('/orders');
    } catch (err) {
      console.log(err.response);
    }
  };
};

export const deleteOrderThunk = (id, history) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      const { data: order } = await axios.delete(`/api/orders/${id}`, {
        headers: {
          authorization: token,
        },
      });
      dispatch(deleteOrder(order));
      history.push('/orders');
    } catch (err) {
      console.log(err.response);
    }
  };
};

export default function ordersReducer(orders = [], action) {
  switch (action.type) {
    case SET_ORDERS:
      return action.orders;
    case CREATE_ORDER:
      return [...orders, action.order];
    case DELETE_ORDER:
      return orders.filter((order) => order.id !== action.order.id);
    default:
      return orders;
  }
}
