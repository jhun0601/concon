import axios from "axios";
import swal from "sweetalert2";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";

// register
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res =>
      swal({
        title: "Success",
        text: "Continue Login",
        type: "success",
        confirmButtonText: "Done"
      }).then(res => history.push("/login"))
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//login -get user token
export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      //save token to localStorage
      const { token } = res.data;
      //set token to localStorage
      localStorage.setItem("jwtToken", token);
      //set token to Auth header
      setAuthToken(token);
      //decode token to get user data
      const decoded = jwt_decode(token);
      //set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
//set current user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

//logout user
export const logoutUser = () => dispatch => {
  //remove item from localStorage
  localStorage.removeItem("jwtToken");
  //remove the auth header for future requests
  setAuthToken(false);
  //set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
