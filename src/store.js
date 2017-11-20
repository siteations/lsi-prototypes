import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './action-creators/rootReducer';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer
                          , composeEnhancers(
  applyMiddleware(
    thunkMiddleware,
    createLogger({ collapsed: true }),
  ),
	)
);

export default store;
