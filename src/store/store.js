import {applyMiddleware, createStore } from 'redux';
import rootReducer from './reducers';
import logger from 'redux-logger';

const middleware = applyMiddleware( logger)

const store = createStore(rootReducer, middleware);

export default store;