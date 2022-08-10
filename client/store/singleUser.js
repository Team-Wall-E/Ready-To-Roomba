import axios from 'axios';

const SET_USER = 'SET_USER';
const UPDATE_USER = 'UPDATE_USER';

export const setUser = (user) => ({
  type: SET_USER,
  user,
});

const updateUser = (user) => {
  return {
    type: UPDATE_USER,
    user,
  };
};

const TOKEN = 'token';

export const fetchUser = (id) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      const response = await axios.get(`/api/users/${id}`, {
        headers: {
          authorization: token,
        },
      });
      dispatch(setUser(response.data));
    } catch (err) {
      console.log(err.response);
    }
  };
};

export const updateUserThunk = (user) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      const response = await axios.put(`/api/users/${user.id}`, user, {
        headers: {
          authorization: token,
        },
      });
      dispatch(updateUser(response.data));
    } catch (err) {
      console.log(err.response);
    }
  };
};

export default function userReducer(user = {}, action) {
  switch (action.type) {
    case SET_USER:
      return action.user;
    case UPDATE_USER:
      return { ...user, ...action.user };
    default:
      return user;
  }
}
