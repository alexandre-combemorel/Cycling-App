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
      const keyWord = action.keyWord.toLowerCase();
      const filteredCities = state.listCities.filter(city => city.toLowerCase().includes(keyWord));
      return { ...state, filterCities: filteredCities };
    default:
      return state;
  }
};