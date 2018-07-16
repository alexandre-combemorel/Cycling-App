import { FETCH_CITIES, FILTER_CITIES } from '../constants/action-types';

export const fetchCities = listCities => ({ type: FETCH_CITIES, payload: listCities });
export const filterCities = listCities => ({ type: FILTER_CITIES, payload: listCities });