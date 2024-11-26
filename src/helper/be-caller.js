import axios from "axios";
import Cookies from 'universal-cookie';

const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
  }
});

const authInterceptor = function(config) {
  const cookies = new Cookies(null, {path:'/'});
  const token = cookies.get('token');
  // const token = localStorage.getItem('token');

  if (token !== undefined && token !== null) {
    config.headers['Authorization'] = token;
  }
  return config;
}

const targetURLInterceptor = function(config) {
  config.url = process.env.NEXT_PUBLIC_BE_HOST + config.url;

  return config;
}

const reformatResponse = async function(resp) {
  resp.data = resp.data.data;

  return resp;
}

const handleErrorResponse = async function(error) {
  if (error.response.status === 401) {
    const cookies = new Cookies(null, {path:'/'});
    const refreshToken = cookies.get('refreshToken');

    // const refreshToken = localStorage.getItem('refreshToken');

    const resp = await axios.post(process.env.NEXT_PUBLIC_BE_HOST + '/auth/refresh-token', {
      data: {
        'refreshToken': refreshToken,
      }
    });

    cookies.set('token', resp.data.data.token);
    cookies.set('refreshToken', resp.data.data.refreshToken);
    // localStorage.setItem('token', resp.data.data.token);
    // localStorage.setItem('refreshToken', resp.data.data.refreshToken);

    return axiosInstance(error.config);
  }

  error.response.data = error.response.data.data;

  return Promise.reject(error);
}

axiosInstance.interceptors.request.use(authInterceptor);
axiosInstance.interceptors.request.use(targetURLInterceptor);

axiosInstance.interceptors.response.use(reformatResponse, handleErrorResponse)


export async function callGet(path, params) {

  await axiosInstance.get(path, {
    params: params,
  }).then(res => {
    return res
  }).catch(error => {
    console.log(error);
  });

}

export async function callPost(path, data) {

  return await axiosInstance.post(path, data)
    .then(res => {
      return res;
    }).catch(error => {
      return error.response;
    });

}