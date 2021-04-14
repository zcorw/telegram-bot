import { UserServiceType } from '@/globel';
import axios, {AxiosResponse, AxiosInstance} from 'axios';

let instance: AxiosInstance;
const createInstance = () => {
  if (instance) {
    return instance;
  }
  instance = axios.create({
    baseURL: process.env.FORM_HOST + 'user',
    proxy: process.env.NODE_ENV === 'development' ? {
      host: '127.0.0.1',
      port: 8888,
    } : undefined,
  })
  
  instance.interceptors.response.use(
    (res: AxiosResponse<any>) => {
      const {
        data,
        status
      } = res;
      if (
        data.code !== 200 &&
        data.code !== 0 &&
        res.headers['content-type'] !== 'application/octet-stream'
      ) {
        return Promise.reject(data);
      }
      return res;
    },
    error => {
      return Promise.reject(error);
    }
  );
  return instance;
}


export const addUser = (data: UserServiceType) => {
  return createInstance().post('/user/video', data);
}