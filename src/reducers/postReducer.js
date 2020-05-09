import { ActionTypes } from '../actions';

const initialState = {
  all: [],
  current: {},
  filter: '',
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_POST:
      return { ...state, current: action.payload };
    case ActionTypes.FETCH_POSTS:
      return { ...state, all: action.payload, current: {} };
    case ActionTypes.FILTER_POSTS:
      return { ...state, filter: action.payload };
    default:
      return state;
  }
};

export default postReducer;
