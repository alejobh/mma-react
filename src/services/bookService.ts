import api from 'config/api';
import { Error } from 'utils/types';

export const getBookList = () => api.get<Response, Error>('/books').then(response => response.data);
