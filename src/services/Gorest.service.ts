import type { GorestServiceProps } from './types/Gorest.type';

import { ApiRequest } from './Request.service';

export const GorestService: GorestServiceProps = (requestInstance = ApiRequest()) => ({
  answers: (payload) =>
    requestInstance.post('/gorest', payload).catch((err) => {
      throw err;
    }),

  paymentCheck: (_id) =>
    requestInstance.post(`/gorest/${_id}`).catch((err) => {
      throw err;
    }),
});
