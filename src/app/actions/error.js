import { DISPLAY_ERROR, RESET_ERROR } from '../constants/action-types';

export const displayError = errorMessage => ({ type: DISPLAY_ERROR, errorMessage: errorMessage });
export const resetError = () => ({ type: RESET_ERROR })