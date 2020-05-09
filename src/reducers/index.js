// the starting point for your redux store
// this defines what your store state will look like
import { combineReducers } from 'redux';
import postReducer from './postReducer';

const rootReducer = combineReducers({
  posts: postReducer,
});

export default rootReducer;
