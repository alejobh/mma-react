import api from 'config/api';
import { Error, LoginValues, SignUpValues } from 'utils/types';

export const signUp = (data: SignUpValues) => api.post<Response, Error>('/users', data);

export const login = (data: LoginValues) =>
  api.post<Response, Error>('/users/sign_in', data).then(response => ({
    ...response.data,
    token: response.headers?.['access-token'],
    uid: response.headers?.uid,
    client: response.headers?.client
  }));
