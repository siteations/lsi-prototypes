import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory'
import store from './store';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import {setCoreText} from './action-creators/navActions.js';
import {loadResources} from './action-creators/resActions.js';

const history = createHistory();

function setText (){
	store.dispatch(setCoreText());
	store.dispatch(loadResources());
}




ReactDOM.render(
     <Provider store={store}>
     <Router history={history}>
     	<Route path="/" component={App} onEnter={setText()}/>
     </Router>
     </Provider>,
  document.getElementById('root'));

registerServiceWorker();
