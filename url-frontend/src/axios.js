// axios.js

import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080/url', // Adjust the URL based on your backend setup
});

export default instance;
