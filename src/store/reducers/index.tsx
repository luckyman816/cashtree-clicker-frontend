// third-party
import { combineReducers } from 'redux';

// project import
import wallet from './wallet';
import dailyCoins from './dailyCoins';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({
  wallet,
  dailyCoins
});

export default reducers;
