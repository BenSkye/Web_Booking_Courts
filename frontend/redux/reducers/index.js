// reducers/index.js
import { combineReducers } from 'redux';
import cartReducer from './cartReducer';

const rootReducer = combineReducers({
  cart: cartReducer,
  // other reducers can be added here
});

export default rootReducer;
