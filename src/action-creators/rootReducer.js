
import { combineReducers } from 'redux';

import { userReducer } from './userActions';
import { adminReducer } from './adminActions';
//just prepping for files, may or may not need immutable with db complexity


export default combineReducers({
  user: userReducer,
  admin: adminReducer,
});


