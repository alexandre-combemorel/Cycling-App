import { FETCH_CITIES, FILTER_CITIES } from '../constants/action-types';

const initialState = {
  listCities: null,
  filterCities: null,
};

export default function citiesReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CITIES:
      return { ...state, listCities: action.payload };
    case FILTER_CITIES:
      return { ...state, filterCities: action.payload };
    default:
      return state;
  }
};