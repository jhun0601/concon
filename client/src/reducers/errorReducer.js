import { GET_ERRORS, CLEAR_ERRORS } from "../actions/types";

const initialState = {};
//dispatch actions to this reducer

export default function(state = initialState, action) {
  switch (action.type) {
    // case SET_CURRENT_USER:
    // return
    case GET_ERRORS:
      return action.payload;
    case CLEAR_ERRORS:
      return {};
    default:
      return state;
  }
}
