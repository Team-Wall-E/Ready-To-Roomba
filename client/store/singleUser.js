import axios from 'axios';

export const SET_USER = 'SET_USER';
const UPDATE_USER = 'UPDATE_USER';

const setUser = (user) => ({
  type: SET_USER,
  user,
});

const updateUser = (user) => {
  return {
    type: UPDATE_USER,
    user,
  };
};

export const fetchUser = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/api/users/${id}`);
      //TODO : insert authentication for userid...
      dispatch(setUser(response.data));
    } catch (err) {
      console.log(err.response);
    }
  };
};

export const updateUserThunk = (user) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`/api/users/${user.id}`, user);
      //TODO : insert authentication for userid...
      dispatch(updateUser(response.data));
    } catch (err) {
      console.log(err.response);
    }
  };
};

const userReducer = (user = {}, action) => {
  switch (action.type) {
    case SET_USER:
      return action.user;
    case UPDATE_USER:
      return { ...user, ...action.user };
    default:
      return user;
  }
};

export default userReducer;
