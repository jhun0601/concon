import axios from "axios";
import swal from "sweetalert2";

import {
  GET_PROFILE,
  PROFILE_LOADING,
  GET_ERRORS,
  GET_PROFILES,
  CLEAR_CURRENT_PROFILE,
  SET_CURRENT_USER
} from "./types";

//get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile")
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};

//get profile by handle
export const getProfileByHandle = handle => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`/api/profile/handle/${handle}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: null
      })
    );
};

//Create profile
export const createProfile = (profileData, history) => dispatch => {
  axios
    .post("/api/profile", profileData)
    .then(res =>
      swal({
        title: "Added Successfully",
        type: "success",
        confirmButtonText: "Done"
      })
    )
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//addd experience
export const addExperience = (expData, history) => dispatch => {
  axios
    .post("/api/profile/experience", expData)
    .then(res =>
      swal({
        title: "Added Successfully",
        type: "success",
        confirmButtonText: "Done"
      })
    )
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//add education
export const addEducation = (eduData, history) => dispatch => {
  axios
    .post("/api/profile/education", eduData)
    .then(res =>
      swal({
        title: "Added Successfully",
        type: "success",
        confirmButtonText: "Done"
      })
    )
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//delete experience
export const deleteExperience = id => dispatch => {
  swal({
    title: "<strong>Are you sure you want to delete your experience</strong>",
    type: "warning",
    html: "This cannot be undone",
    showCancelButton: true,
    focusConfirm: false,
    confirmButtonText: '<i class="fa fa-trash"></i> Delete',
    cancelButtonText: '<i class="fa fa-times-circle"></i> Cancel'
  }).then(res => {
    if (res.value) {
      axios
        .delete(`/api/profile/experience/${id}`)
        .then(res =>
          dispatch({
            type: GET_PROFILE,
            payload: res.data
          })
        )
        .then(res => swal("Deleted!", "Your data has been deleted.", "success"))
        .catch(err =>
          dispatch({
            type: GET_ERRORS,
            payload: err.response.data
          })
        );
    }
  });
};

//delete education
export const deleteEducation = id => dispatch => {
  swal({
    title:
      "<strong>Are you sure you want to delete your education record</strong>",
    type: "warning",
    html: "This cannot be undone",
    showCancelButton: true,
    focusConfirm: false,
    confirmButtonText: '<i class="fa fa-trash"></i> Delete',
    cancelButtonText: '<i class="fa fa-times-circle"></i> Cancel'
  }).then(res => {
    if (res.value) {
      axios
        .delete(`/api/profile/education/${id}`)
        .then(res =>
          dispatch({
            type: GET_PROFILE,
            payload: res.data
          })
        )
        .then(res => swal("Deleted!", "Your data has been deleted.", "success"))
        .catch(err =>
          dispatch({
            type: GET_ERRORS,
            payload: err.response.data
          })
        );
    }
  });
};

//delete account and profile
export const deleteAccount = () => dispatch => {
  swal({
    title: "<strong>Are you sure you want to delete your account</strong>",
    type: "warning",
    html: "This cannot be undone",
    showCancelButton: true,
    focusConfirm: false,
    confirmButtonText: '<i class="fa fa-trash"></i> Delete',
    cancelButtonText: '<i class="fa fa-times-circle"></i> Cancel'
  }).then(res => {
    if (res.value) {
      axios
        .delete("/api/profile")
        .then(res =>
          dispatch({
            type: SET_CURRENT_USER,
            payload: {}
          })
        )
        .then(res => swal("Deleted!", "Your file has been deleted.", "success"))
        .catch(err =>
          dispatch({
            type: GET_ERRORS,
            payload: err.response.data
          })
        );
    }
  });
};

export const getProfiles = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile/all")
    .then(res =>
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILES,
        payload: null
      })
    );
};

//Profile Loading

export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

//Profile Clear

export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};
