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

  delete(resp.config);
  delete(resp.headers);
  delete(resp.request);

  return resp;
}

const handleErrorResponse = async function(error) {
  if (error.response.status === 401) {
    const cookies = new Cookies(null, {path:'/'});
    const refreshToken = cookies.get('refreshToken');

    const resp = await axios.post(process.env.NEXT_PUBLIC_BE_HOST + 'auth/refresh-token', {
      'refreshToken': refreshToken,
    });

    cookies.set('token', resp.data.data.accessToken);
    cookies.set('refreshToken', resp.data.data.refreshToken);

    return axiosInstance(error.config);
  }

  error.response.data = error.response.data.data;

  return Promise.reject(error);
}

axiosInstance.interceptors.request.use(authInterceptor);
axiosInstance.interceptors.request.use(targetURLInterceptor);

axiosInstance.interceptors.response.use(reformatResponse, handleErrorResponse)


export async function callGet(path, params) {
  return await axiosInstance.get(path, {
    params: params,
  }).then(res => {
    return res;
  }).catch(error => {
    return error.response;
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

export async function callPut(path, data) {

  return await axiosInstance.put(path, data)
    .then(res => {
      return res;
    }).catch(error => {
      return error.response;
    });

}

export async function callDelete(path, data) {

  return await axiosInstance.delete(path, data)
    .then(res => {
      return res;
    }).catch(error => {
      return error.response;
    });

}
