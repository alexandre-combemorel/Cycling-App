import { combineReducers } from 'redux';

import stations from './stations';
import cities from './cities';

export default combineReducers({
  stations,
  cities
});