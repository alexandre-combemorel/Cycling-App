import { DISPLAY_ERROR, RESET_ERROR } from '../constants/action-types';

const initialeState = {
  errorMessage: null,
};

export default function errorReducer(state = initialeState, action) {
  switch(action.type) {
    case DISPLAY_ERROR:
      return { ...state, errorMessage: action.errorMessage };
    case RESET_ERROR:
      return { ...state, errorMessage: null };
    default:
      return state;
  }
};
