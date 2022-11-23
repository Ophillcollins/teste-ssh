import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://localhost:8000/api',
  // baseURL: 'https://api-calc-emissions.herokuapp.com/api/',
  baseURL: 'https://homologa-api-calc-emissions.herokuapp.com/api/',
});

export default api;
