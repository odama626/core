import createReduxProxy from 'react-cosmos-redux-proxy';
import { createStore, combineReducers } from 'redux';
import StatefulProxy from 'react-cosmos-stateful-proxy';

const ReduxProxy = createReduxProxy({
  createStore: state => createStore(combineReducers({}), state)
});

export default [
  ReduxProxy,
  StatefulProxy
]

