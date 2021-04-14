import axios, { AxiosResponse } from 'axios';

const instance = axios.create({
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

export const register = (adminName, adminPassw, userName) => {
  return instance.get('/book/login', {
    params: {
      username: adminName,
      password: adminPassw,
    }
  })
    .then(({ data }) => {
      return instance.get('/book/register', {
        params: {
          token: data.token,
          username: userName,
        }
      })
    })
}