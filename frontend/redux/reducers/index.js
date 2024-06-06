// reducers/index.js
import { combineReducers } from 'redux';
import cartReducer from './cartReducer';
import userSlice from '../user/userSlice';

const rootReducer = combineReducers({
  cart: cartReducer,
  user: userSlice,
  // other reducers can be added here
});

export default rootReducer;
