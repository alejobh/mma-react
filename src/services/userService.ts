import api from 'config/api';
import { Error, Response } from 'config/apiTypes';
import { SignUpValues } from 'utils/types';

export const signUp = (data: SignUpValues) => api.post<Response, Error>('/users', data);
