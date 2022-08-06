import axios from 'axios';

const SET_LINEITEMS = 'SET_LINEITEMS';
const CREATE_LINEITEM = 'CREATE_LINEITEM';
const DELETE_LINEITEM = 'DELETE_LINEITEM';

export const setLineItems = (lineItems) => ({
  type: SET_LINEITEMS,
  lineItems,
});

const createLineItem = (lineItem) => {
  return {
    type: CREATE_LINEITEM,
    lineItem,
  };
};

const deleteLineItem = (lineItem) => {
  return {
    type: DELETE_LINEITEM,
    lineItem,
  };
};

export const fetchLineItems = () => async (dispatch) => {
  const lineItemsResponse = await axios.get('/api/lineItems');
  dispatch(setLineItems(lineItemsResponse.data));
};

export const createLineItemThunk = (lineItem, history) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`/api/lineItems`, lineItem);
      dispatch(createLineItem(response.data));
      history.push('/lineItems');
    } catch (err) {
      console.log(err.response);
    }
  };
};

export const deleteLineItemThunk = (id, history) => {
  return async (dispatch) => {
    try {
      const { data: lineItem } = await axios.delete(`/api/lineItems/${id}`);
      dispatch(deleteLineItem(lineItem));
      history.push('/lineItems');
    } catch (err) {
      console.log(err.response);
    }
  };
};

export default function lineItemsReducer(lineItems = [], action) {
  switch (action.type) {
    case SET_LINEITEMS:
      return action.lineItems;
    case CREATE_LINEITEM:
      return [...lineItems, action.lineItem];
    case DELETE_LINEITEM:
      return lineItems.filter((lineItem) => lineItem.id !== action.lineItem.id);
    default:
      return lineItems;
  }
}
