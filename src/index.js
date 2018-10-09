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
import {loadResources, setSelResources} from './action-creators/resActions.js';
import {loadFigures} from './action-creators/imgActions.js';
import {loadSites} from './action-creators/siteActions.js';
import {loadAgents} from './action-creators/agentActions.js';

const history = createHistory();

function setText (){
	store.dispatch(setCoreText());
	store.dispatch(loadResources(7));
	store.dispatch(loadFigures());
	store.dispatch(loadSites());
	store.dispatch(loadAgents());
}




ReactDOM.render(
     <Provider store={store}>
     <Router history={history}>
     	<Route path="/" component={App} onEnter={setText()}/>
     </Router>
     </Provider>,
  document.getElementById('root'));

registerServiceWorker();
