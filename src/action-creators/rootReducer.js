
import { combineReducers } from 'redux';

import { userReducer } from './userActions';
import { adminReducer } from './adminActions';
import { paneReducer } from './paneActions';
import {navReducer} from './navActions.js';
import {siteReducer} from './siteActions.js';
import {resReducer} from './resActions.js';
import {imgReducer} from './imgActions.js';
import {agentReducer} from './agentActions.js';
//just prepping for files, may or may not need immutable with db complexity


export default combineReducers({
  user: userReducer,
  admin: adminReducer,
  pane: paneReducer,
  nav: navReducer,
  site: siteReducer,
  res: resReducer,
  img: imgReducer,
  agent: agentReducer,
});


