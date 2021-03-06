import * as actions from '../actions/protected-data';

const initialState = {
  data: '',
  error: null,
  loadin: true
};

export default function reducer(state = initialState, action) {
  if (action.type === actions.FETCH_PROTECTED_DATA_SUCCESS) {
      return Object.assign({}, state, {
          data: action.data,
          error: null,
          loadin: false
          
      });
  } else if (action.type === actions.FETCH_PROTECTED_DATA_ERROR) {
      return Object.assign({}, state, {
          error: action.error
      });
  }else if (action.type === "FETCH_PROTECTED") {
    return {...state, loadin : true}
  }
  return state;
}