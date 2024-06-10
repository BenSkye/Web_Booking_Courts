//redux/reducers/cartReducer.js
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  SET_CENTER,
  UPDATE_TOTAL_PRICE,
} from '../types/actionTypes';

const initialState = {
  selectedCourts: [],
  center: {},
  totalPrice: 0,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        selectedCourts: [...state.selectedCourts, action.payload],
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        selectedCourts: state.selectedCourts.filter(
          (court) => court.id !== action.payload
        ),
      };
    case SET_CENTER:
      return {
        ...state,
        center: action.payload,
      };

    case UPDATE_TOTAL_PRICE:
      return { ...state, totalPrice: action.payload };

    default:
      return state;
  }
};

export default cartReducer;
