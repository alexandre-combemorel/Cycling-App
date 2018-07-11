import API from './api';
import axios from 'axios';

export default {
  getCities,
  getStations,
};

function getCities() {
  return new Promise((accept, reject) => {
    axios.get(API.GET_CITIES)
    .then((data) => {
      const citiesArray = data.data.map(city => city.name);
      accept(citiesArray);
    })
    .catch((error) => {
      console.log(error);
      reject(error);
    })
  });
}

function getStations(city) {
  return new Promise((accept, reject) => {
    axios.get(API.GET_STATION_PER_CITY.replace(':city', city))
    .then((data) => {
      accept(data.data);
    })
    .catch((error) => {
      console.log(error);
      reject(error);
    })
  });
}