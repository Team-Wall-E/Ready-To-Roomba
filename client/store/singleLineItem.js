import axios from 'axios';

export const SET_LINEITEM = 'SET_LINEITEM';
const UPDATE_LINEITEM = 'UPDATE_LINEITEM';

const setLineItem = (lineitem) => ({
  type: SET_LINEITEM,
  lineitem,
});

const updateLineItem = (lineitem) => {
  return {
    type: UPDATE_LINEITEM,
    lineitem,
  };
};

export const fetchLineItem = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/api/lineitems/${id}`);
      dispatch(setLineItem(response.data));
    } catch (err) {
      console.log(err.response);
    }
  };
};

export const updateLineItemThunk = (lineitem) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(
        `/api/lineitems/${lineitem.id}`,
        lineitem
      );
      dispatch(updateLineItem(response.data));
    } catch (err) {
      console.log(err.response);
    }
  };
};

const lineitemReducer = (lineitem = {}, action) => {
  switch (action.type) {
    case SET_LINEITEM:
      return action.lineitem;
    case UPDATE_LINEITEM:
      return { ...lineitem, ...action.lineitem };
    default:
      return lineitem;
  }
};

export default lineitemReducer;
