import { GET_STATIONS } from '../constants/action-types';

export const addStations = listStations => ({ type: GET_STATIONS, payload: listStations});