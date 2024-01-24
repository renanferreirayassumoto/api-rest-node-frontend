import axios, { AxiosInstance } from 'axios';
import { errorInterceptor, responseInterceptor } from './interceptors';
import { Environment } from '../../../environment';

const createApiInstance = (): AxiosInstance => {
	const api = axios.create({
	   baseURL: Environment.URL_BASE,
	});
 
	const cancelToken = axios.CancelToken;
	const source = cancelToken.source();
 
	api.interceptors.request.use(
	   async (config) => {
		  try {
			 config.cancelToken = source.token;
 
			 const accessToken = localStorage.getItem('APP_ACCESS_TOKEN');

			 if (accessToken) {
				config.headers.Authorization = `Bearer ${accessToken}`;
			 }
 
			 return config;
		  } catch (error) {
			 console.error('Erro durante a configuração da solicitação:', error);
			 return Promise.reject(error);
		  }
	   },
	   (error) => Promise.reject(error)
	);
 
	api.interceptors.response.use(
	   (response) => responseInterceptor(response),
	   (error) => errorInterceptor(error)
	);
 
	return api;
 };
 
 const Api = createApiInstance();
 
 export { Api };
 