const initialState = {
  isAuthenticated: false,
  user: {}
};
//dispatch actions to this reducer
export default function(state = initialState, action) {
  switch (action.type) {
    // case SET_CURRENT_USER:
    // return
    default:
      return state;
  }
}
