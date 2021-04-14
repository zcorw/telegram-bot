import { UserServiceType } from '@/globel';
import axios, {AxiosResponse} from 'axios';

const instance = axios.create({
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

export const addUser = (data: UserServiceType) => {
  return instance.post('/add/book', data);
}