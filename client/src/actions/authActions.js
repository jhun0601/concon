import axios from "axios";
import swal from "sweetalert2";
import { GET_ERRORS } from "./types";

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
