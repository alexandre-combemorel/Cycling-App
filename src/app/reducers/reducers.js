import { combineReducers } from 'redux';

import stations from './stations';
import cities from './cities';
import error from './error';

export default combineReducers({
  stations,
  cities,
  error,
});