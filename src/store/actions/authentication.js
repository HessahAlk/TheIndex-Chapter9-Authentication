import * as actionTypes from "./actionTypes";
import axios from "axios";
import jwt_decode from "jwt-decode";

const setAuthToken = token => {
  localStorage.setItem("treasureToken", token);
  axios.defaults.headers.common.Authorization = `jwt ${token}`;
};

const setCurrentUser = user => ({
  type: actionTypes.SET_CURRENT_USER,
  payload: user
});

export const login = userData => {
  return dispatch => {
  axios
    .post("https://the-index-api.herokuapp.com/login/", userData)
    .then(res => res.data)
    .then(user => {
          const decodedUser = jwt_decode(user.token);
          setAuthToken(user.token);
         dispatch(setCurrentUser(decodedUser));
      })
    .catch(err => console.error(err.response));
};
};
export const checkForExpiredToken = () => {
  return dispatch => {
    // Check for token expiration
    const token = localStorage.treasureToken;

    if (token) {
       const currentTime = Date.now() / 1000;

      // Decode token and get user info
      const user = jwt_decode(token);

      // Check token expiration
      if (user.exp >= currentTime) {
        // Set auth token header
        setAuthToken(token);
        // Set user
        dispatch(setCurrentUser(user));
      } else {
        dispatch(logout());
      }
    }
  };
};

export const signup = (userData, history) => {
  return dispatch => {
    axios
      .post("https://the-index-api.herokuapp.com/signup/", userData)
      .then(res => res.data)
      .then(user => {
        const decodedUser = jwt_decode(user.token);
        setAuthToken(user.token);
        dispatch(setCurrentUser(decodedUser));
        history.push("/");
      })
      .catch(err => console.error(err.response));
  };
};

export const logout =()=>setCurrentUser();
