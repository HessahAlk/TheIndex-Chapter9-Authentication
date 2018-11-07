import * as actionTypes from "../actions/actionTypes";

const initialState = {
  user: null
  // complete me
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case actionTypes.SET_CURRENT_USER:
  return {
    ...state,
    user: action.payload
  };
    // complete me
    default:
      return state;
  }
};

export default reducer;
