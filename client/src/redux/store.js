import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import initialState from './initialState';
import adsReducer from './adsReducer';
import usersReducer from './usersReducer';
import requestsReducer from './requestsReducer';

const subreducers = {
    ads: adsReducer,
    users: usersReducer,
    requests: requestsReducer,
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