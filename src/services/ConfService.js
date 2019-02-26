/* eslint-disable */
import axios from 'axios'

export default class ConfService {

  async getConfig() {
    if (window.appConfig) {
      return new Promise(resolve => {
        resolve(window.appConfig);
      });
    }

    return axios.get('/conf.json')
    .then(response => {
      window.appConfig = response.data;
      return response.data;
    })
    .catch(err => {
      console.log(err);
    })
  }


}
