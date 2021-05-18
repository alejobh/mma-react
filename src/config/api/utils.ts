import { Headers } from 'utils/types';

import api from '.';

const baseHeaders = ['Accept', 'Content-Type'];

export const removeHeaders = () => {
  Object.keys(api.headers).forEach(header => {
    if (!baseHeaders.includes(header)) {
      api.deleteHeader(header);
    }
  });
};

export const setHeaders = (headers: Headers) => {
  api.setHeaders({
    'access-token': headers.token || '',
    client: headers.client || '',
    uid: headers.uid || ''
  });
};
