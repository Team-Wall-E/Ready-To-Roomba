import axios from 'axios';
import history from '../history';

const TOKEN = 'token'

/**ACTION TYPES**/
const SET_AUTH = 'SET_AUTH';

/**ACTION CREATORS*/
const setAuth = (auth) => ({ type: SET_AUTH, auth });

/**THUNK CREATORS**/
export const me = () => async (dispatch) => {
  const token = window.localStorage.getItem(TOKEN);
  if (token) {
    const res = await axios.get('/auth/me', {
      headers: {
        authorization: token,
      },
    });
    return dispatch(setAuth(res.data));
  } else if (!token) {
    let guest = await axios.post("/auth/me", {
      firstName: "guest",
      lastName: "guest",
      email: "guest@guest.com",
      password: "guest_pwd"
    });
    const accessToken = guest.data;
    window.localStorage.setItem(TOKEN, accessToken.token);
    
    const { data: guestUser } = await axios.get("/auth/me", {
      headers: {
        authorization: token,
      }
    });

    return dispatch(setAuth(guestUser));
  }
};

export const authenticate =
  (firstName, lastName, email, password, method, address) =>
  async (dispatch) => { //conditional,  if token in localstorage, attach as header
    try {
      const res = await axios.post(`/auth/${method}`, {
        firstName,
        lastName,
        email,
        password,
        address,
      });
      window.localStorage.setItem(TOKEN, res.data.token);
      dispatch(me());
      history.push('/orderHistory');
    } catch (authError) {
      return dispatch(setAuth({ error: authError }));
    }
  };

export const logout = () => {
  window.localStorage.removeItem(TOKEN);
  history.push('/login');
  return {
    type: SET_AUTH,
    auth: {},
  };
};

/**REDUCER**/
export default function (state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth;
    default:
      return state;
  }
}
