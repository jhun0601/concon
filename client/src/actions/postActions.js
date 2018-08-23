import axios from "axios";
import swal from "sweetalert2";
import {
  ADD_POST,
  GET_ERRORS,
  GET_POSTS,
  GET_POST,
  POST_LOADING,
  DELETE_POST,
  CLEAR_ERRORS
} from "./types";

//add post
export const addPost = postData => dispatch => {
  dispatch(clearErrors());
  axios
    .post("/api/posts", postData)
    .then(res =>
      dispatch({
        type: ADD_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//get posts
export const getPosts = () => dispatch => {
  dispatch(setPostLoading());
  axios
    .get("/api/posts")
    .then(res =>
      dispatch({
        type: GET_POSTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_POSTS,
        payload: null
      })
    );
};

//get post
export const getPost = id => dispatch => {
  dispatch(setPostLoading());
  axios
    .get(`/api/posts/${id}`)
    .then(res =>
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_POST,
        payload: null
      })
    );
};

// delete post
export const deletePost = id => dispatch => {
  swal({
    title: "<strong>Are you sure?</strong>",
    text: "You won't be able to revert this!",
    type: "warning",
    showCancelButton: true,
    focusConfirm: false,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: '<i class="fa fa-trash"></i> Delete',
    cancelButtonText: '<i class="fa fa-times-circle"></i> Cancel'
  }).then(res => {
    axios
      .delete(`/api/posts/${id}`)
      .then(res =>
        dispatch({
          type: DELETE_POST,
          payload: id
        })
      )
      .then(res => swal("Deleted!", "Your post has been deleted.", "success"))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  });
};

//add like
export const addLike = id => dispatch => {
  axios
    .post(`/api/posts/like/${id}`)
    .then(res => dispatch(getPosts()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//remove like
export const removeLike = id => dispatch => {
  axios
    .post(`/api/posts/unlike/${id}`)
    .then(res => dispatch(getPosts()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//add Comment
export const addComment = (postId, commentData) => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`/api/posts/comment/${postId}`, commentData)
    .then(res =>
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// delete comment
export const deleteComment = (postId, commentId) => dispatch => {
  swal({
    title: "<strong>Are you sure?</strong>",
    text: "You won't be able to revert this!",
    type: "warning",
    showCancelButton: true,
    focusConfirm: false,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: '<i class="fa fa-trash"></i> Delete',
    cancelButtonText: '<i class="fa fa-times-circle"></i> Cancel'
  }).then(res => {
    if (res.value) {
      axios
        .delete(`/api/posts/comment/${postId}/${commentId}`)
        .then(res =>
          dispatch({
            type: GET_POST,
            payload: res.data
          })
        )
        .then(res =>
          swal("Deleted!", "Your comment has been deleted.", "success")
        )
        .catch(err =>
          dispatch({
            type: GET_ERRORS,
            payload: err.response.data
          })
        );
    }
  });
};

//set loading state
export const setPostLoading = () => {
  return {
    type: POST_LOADING
  };
};

//clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
