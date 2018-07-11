import { GET_STATIONS } from '../constants/action-types';

const initialState = {
  listStations: null,
};

export default function stationsReducer(state = initialState, action) {
  switch(action.type) {
    case GET_STATIONS:
      return { ...state, listStations: action.payload };
  
    default:
      return state;
  }
};

