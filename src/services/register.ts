import axios, { AxiosResponse, AxiosInstance } from 'axios';

let instance: AxiosInstance;
const createInstance = () => {
  if (instance) {
    return instance;
  }
  instance = axios.create({
    baseURL: `http://127.0.0.1:${process.env.PORT2}`,
    proxy: process.env.NODE_ENV === 'development' ? {
      host: '127.0.0.1',
      port: 8888,
    } : undefined,
  });
  instance.interceptors.response.use(
    (res: AxiosResponse<any>) => {
      return res;
    },
    error => {
      return Promise.reject(new Error(error.response?.data || error.code));
    }
  );
  return instance;
}




export const register = (adminName, adminPassw, userName) => {
  return createInstance().get('/video/login', {
    params: {
      username: adminName,
      password: adminPassw,
    }
  })
    .then(({ data }) => {
      return instance.get('/video/register', {
        params: {
          token: data.token,
          username: userName,
        }
      })
    })
}