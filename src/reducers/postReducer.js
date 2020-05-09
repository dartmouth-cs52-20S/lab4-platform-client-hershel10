import { ActionTypes } from '../actions';

const initialState = {
  all: [],
  current: {},
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_POST:
      return { ...state, current: action.payload };
    case ActionTypes.FETCH_POSTS:
      return { ...state, all: action.payload, current: {} };
    default:
      return state;
  }
};

export default postReducer;
