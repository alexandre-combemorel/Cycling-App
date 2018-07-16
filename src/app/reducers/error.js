import { DISPLAY_ERROR, RESET_ERROR } from '../constants/action-types';

const initialeState = {
  errorMessage: [],
};

export default function errorReducer(state = initialeState, action) {
  switch(action.type) {
    case DISPLAY_ERROR:
      const errorMessage = state.errorMessage;
      return { ...state, errorMessage: [...errorMessage, { provider: action.payload.provider, message: action.payload.message } ] };
    case RESET_ERROR:
      return { ...state, errorMessage: state.errorMessage.filter(error => error.provider !== action.provider) };
    default:
      return state;
  }
};
