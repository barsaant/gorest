import type { AxiosInstance, AxiosResponse } from 'axios';
import type { ApiRequestProps } from './types';

import axios from 'axios';

export const ApiRequest: ApiRequestProps = (configOverride = {}, _eventCallBack): AxiosInstance => {
  const apiHeaders = {
    'Content-Type': 'application/json',
  };

  const config = { ...configOverride };

  if (configOverride && configOverride.headers) {
    config.headers = {
      ...apiHeaders,
      ...configOverride.headers,
    };
  } else {
    config.headers = apiHeaders;
  }

  const apiInstance: AxiosInstance = axios.create(config);

  apiInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error) => {
      if (axios.isCancel(error)) {
        return Promise.resolve(null);
      }

      const errorMessage = error?.response?.data?.message ?? error;

      return Promise.reject(new axios.Cancel(errorMessage));
    }
  );

  return apiInstance;
};
