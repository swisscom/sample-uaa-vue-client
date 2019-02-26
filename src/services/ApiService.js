/* eslint-disable */
import axios from 'axios'
import Mgr from './SecurityService'
import 'babel-polyfill';
import ConfService from './ConfService'


export default class ApiService {

  constructor () {
    this.conf = new ConfService();
  }

  async defineAxiosDefaults () {
    let conf = await this.conf.getConfig();
    let user = new Mgr(conf);

    await user.getAcessToken().then(
      accessToken => {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
        axios.defaults.baseURL = conf.serverUrl;
      }, err => {
        console.log(err)
      })
  }

  async getEnv(){
    await this.defineAxiosDefaults()
    return axios
      .get('/env')
      .then(response => response.data)
      .catch(err => {
        console.log(err);
      })
  }
}

