import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import initialState from './initialState';
import adsReducer from './adsReducer';
import userReducer from './userReducer';
import statusReducer from './statusReducer';

const subreducers = {
    ads: adsReducer,
    user: userReducer,
    status: statusReducer,
}

const reducer = combineReducers(subreducers);
const store = createStore(
  reducer,
  initialState,

  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
  )
);

export default store;