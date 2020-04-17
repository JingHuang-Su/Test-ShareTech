import axios from 'axios';
const fetchApi = 'https://coronavirus-19-api.herokuapp.com';

export const getCovidByCountry = async (countryName = 'taiwan', cb) => {
  let response;
  await fetch(`${fetchApi}/countries/${countryName}`)
    .then((response) => response.json())
    .then((data) => {
      response = data;
    });
  if (cb) cb(response);
};

export const getCovidGlobalInfo = async (cb) => {
  let response;

  await axios
    .get(`${fetchApi}/all`)
    .then((response) => response.data)
    .then((data) => {
      response = data;
    });

  if (cb) cb(response);
};

export const getCovidCountries = async (cb) => {
  let response;
  await fetch(`${fetchApi}/countries/`)
    .then((response) => response.json())
    .then((data) => {
      response = data;
    });
  if (cb) cb(response);
};

export default {
  getCovidByCountry,
  getCovidGlobalInfo,
  getCovidCountries,
};
