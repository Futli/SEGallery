import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

axios.defaults.baseURL = 'https://rickandmortyapi.com/api/';

export type ApiServiceResponseType = Promise<AxiosResponse<any>>;

const apiService = {
  get: function (
    url: string,
    config?: AxiosRequestConfig,
  ): ApiServiceResponseType {
    return axios.get(url, config);
  },

};

export default apiService;
