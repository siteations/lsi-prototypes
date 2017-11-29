import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory'
import store from './store';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const history = createHistory()


ReactDOM.render(
     <Provider store={store}>
     <Router history={history}>
     	<Route path="/" component={App} />
     </Router>
     </Provider>,
  document.getElementById('root'));

registerServiceWorker();
