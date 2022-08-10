import axios from 'axios';

const SET_USER = 'SET_USER';
const CREATE_USER = 'CREATE_USER';
const DELETE_USER = 'DELETE_USER';
const UPDATE_USER = 'UPDATE_USER';

export const setUser = (user) => ({
  type: SET_USER,
  user,
});

const createUser = (user) => {
  return {
    type: CREATE_USER,
    user,
  };
};

const deleteUser = (user) => {
  return {
    type: DELETE_USER,
    user,
  };
};

const updateUser = (user) => {
  return {
    type: UPDATE_USER,
    user,
  };
};

export const fetchUser = () => async (dispatch) => {
  const token = window.localStorage.getItem(TOKEN);
  const userResponse = await axios.get('/api/user', {
    headers: {
      authorization: token,
    },
  });
  dispatch(setUser(userResponse.data));
};

const TOKEN = 'token';

export const createUserThunk = (user, history) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      const response = await axios.post(`/api/user`, user, {
        headers: {
          authorization: token,
        },
      });
      dispatch(createUser(response.data));
      history.push('/user');
    } catch (err) {
      console.log(err.response);
    }
  };
};

export const deleteUserThunk = (id, history) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      const { data: user } = await axios.delete(`/api/user/${id}`, {
        headers: {
          authorization: token,
        },
      });
      dispatch(deleteUser(user));
      history.push('/user');
    } catch (err) {
      console.log(err.response);
    }
  };
};

export const updateUserThunk = (user) => {
  const token = window.localStorage.getItem(TOKEN);
  return async (dispatch) => {
    try {
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

export default function userReducer(user = [], action) {
  switch (action.type) {
    case SET_USER:
      return action.user;
    case CREATE_USER:
      return [...user, action.user];
    case DELETE_USER:
      return user.filter((user) => user.id !== action.user.id);
    case UPDATE_USER:
      return { ...user, ...action.user };
    default:
      return user;
  }
}
