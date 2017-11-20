//ONLY USEFUL FOR THE DATABASE VERSION

import axios from 'axios';
//import { create as createUser } from './users';
//import { browserHistory } from 'react-router';
import createHistory from 'history/createBrowserHistory';

const history = createHistory();

/* ------------------    ACTIONS    --------------------- */

const SET    = 'SET_CURRENT_USER';
const REMOVE = 'REMOVE_CURRENT_USER';

/* --------------    ACTION CREATORS    ----------------- */

const set     = user => ({ type: SET, user });
const remove  = () => ({ type: REMOVE });

/* ------------------    REDUCER    --------------------- */

export const adminReducer  = (currentUser = null, action) => {
  switch (action.type) {

    case SET:
      return action.user;

    case REMOVE:
      return null;

    default:
      return currentUser;
  }
}

// ------------       utility    ------------------

const resToData = res => res.data;

// ------------       dispatch    ------------------

// a "simple" dispatcher which uses API, changes state, and returns a promise.
export const login = credentials => dispatch => {
  return axios.put('/api/auth', credentials)
  .then(resToData)
  .then(user => {
    dispatch(set(user));
    return user;
  });
};

// a "composed" dispatcher which uses the "simple" one, then routes to a page.
export const loginAndGoToHome = credentials => dispatch => {
  dispatch(login(credentials))
  .then(user => history.push(`/`))
  .catch(err => console.error('Problem logging in:', err));
};

export const retrieveLoggedInUser = () => dispatch => {
  axios.get('/api/auth')
  .then(res => dispatch(set(res.data)))
  .catch(err => console.error('Problem fetching current user', err));
};

// optimistic
export const logout = () => dispatch => {
  dispatch(remove());
  axios.delete('/api/auth')
  .catch(err => console.error('logout unsuccessful', err));
};
