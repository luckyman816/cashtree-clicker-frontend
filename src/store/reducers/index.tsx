// third-party
import { combineReducers } from 'redux';

// project import
import wallet from './wallet';
import dailyCoins from './dailyCoins';
import dailyBoost from './dailyBoost';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({
  wallet,
  dailyCoins,
  dailyBoost
});

export default reducers;
