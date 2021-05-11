import api from 'config/api';
import { Error, Response } from 'config/apiTypes';
import { SignUpValues } from 'utils/types';

import LocalStorageService from './LocalStorageService';

export const signUp = (data: SignUpValues) => api.post<Response, Error>('/users', data);

export const login = (data: any) =>
  api.post<Response, Error>('/users/sign_in', data).then(response => {
    const token = response.headers?.['access-token'];
    LocalStorageService.setValue('session', token);
  });
