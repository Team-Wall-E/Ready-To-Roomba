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
export const fetchUser = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/api/users/${id}`);
      dispatch(setUser(response.data));
    } catch (err) {
      console.log(err.response);
    }
  };
};

const TOKEN = 'token';

export const updateUserThunk = (id, user) => {
  const token = window.localStorage.getItem(TOKEN);
  return async (dispatch) => {
    try {
      const response = await axios.put(`/api/users/${id}`, user, {
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
