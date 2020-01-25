import { combineReducers } from 'redux';

import interfaceReducer from './interfaceReducer';

const reducers = combineReducers({
  interface: interfaceReducer
});

export default reducers;
