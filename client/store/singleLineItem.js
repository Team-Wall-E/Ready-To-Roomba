import axios from "axios";

export const SET_LINEITEM = "SET_LINEITEM";
const UPDATE_LINEITEM = "UPDATE_LINEITEM";

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

const TOKEN = "token";

export const fetchLineItem = (id) => {
   return async (dispatch) => {
      try {
         const token = window.localStorage.getItem(TOKEN);
         const response = await axios.get(`/api/lineitems/${id}`, {
            headers: {
               authorization: token,
            },
         });
         dispatch(setLineItem(response.data));
      } catch (err) {
         console.log(err.response);
      }
   };
};

export const updateLineItemThunk = (lineitem) => {
   return async (dispatch) => {
      try {
         const token = window.localStorage.getItem(TOKEN);
         const response = await axios.put(
            `/api/lineitems/${lineitem.id}`,
            lineitem,
            {
               headers: {
                  authorization: token,
               },
            }
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