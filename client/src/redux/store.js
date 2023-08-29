import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import adsReducer from './adsRedux';
import usersReducer from './usersRedux';

const subreducers = {
  ads: adsReducer,
  users: usersReducer,
};

const reducer = combineReducers(subreducers);
const store = createStore(
  reducer,

  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f) => f
  )
);

export default store;
