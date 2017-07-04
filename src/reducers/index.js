import { combineReducers } from 'redux';

import ui from './ui';
import game from './game';

const rootReducer = combineReducers({
  ui,
  game,
});

export default rootReducer;
