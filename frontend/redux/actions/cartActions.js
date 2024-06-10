//redux/actions/cartActions.js
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  SET_CENTER,
  UPDATE_TOTAL_PRICE,
} from '../types/actionTypes';

export const addToCart = (item) => {
  return {
    type: ADD_TO_CART,
    payload: item,
  };
};

export const removeFromCart = (item) => {
  return {
    type: REMOVE_FROM_CART,
    payload: item,
  };
};

export const setCenter = (center) => ({
  type: SET_CENTER,
  payload: center,
});

export const updateTotalPrice = (totalPrice) => {
  return {
    type: UPDATE_TOTAL_PRICE,
    payload: totalPrice,
  };
};
