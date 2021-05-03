import api from 'config/api';
import { Error } from 'config/apiTypes';
import { SignUpValues } from 'utils/types';

type SignUpResponse = {
  data: Record<string, string | number>;
};

export const signUp = (data: SignUpValues) => api.post<SignUpResponse, Error>('/users', data);
