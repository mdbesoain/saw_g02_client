import axios from 'axios';
import {API_URL} from '../variables/urls';
import { setupCache } from 'axios-cache-adapter'

const cache = setupCache({
  maxAge: 15 * 60 * 1000
})
const instance =  axios.create({
  baseURL: API_URL,
  headers: {'Content-Type': 'application/json' ,"Access-Control-Allow-Origin" : '*', 'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS', "Accept": "*"},
  adapter: cache.adapter
});


instance.interceptors.request.use(function (config) {
  // Do something before request is sent

  return config;
}, function (error) {

    console.log("error");
    return Promise.reject(error);
});

// Add a response interceptor

instance.interceptors.response.use(function (response) {

  return response;
}, function (error) {
  var response = error.response; 
  return Promise.reject(response);
});

export default instance;