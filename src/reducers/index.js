// the starting point for your redux store
// this defines what your store state will look like
import { combineReducers } from 'redux';
import postReducer from './postReducer';
import authReducer from './auth_reducer';

const rootReducer = combineReducers({
  posts: postReducer,
  auth: authReducer,
});

export default rootReducer;
