import { DISPLAY_ERROR, RESET_ERROR } from '../constants/action-types';

export const displayError = (provider, message) => ({ type: DISPLAY_ERROR, payload: { message: message, provider: provider } });
export const resetError = (provider) => ({ type: RESET_ERROR, provider: provider })