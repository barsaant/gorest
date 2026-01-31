import type { AxiosInstance, AxiosResponse } from 'axios';

export type GorestAnswerPayload = {
  email: string;
  answers: Array<string | null | number>;
  fbclid?: string;
  fbp?: string;
};

interface Url {
  name: string;
  description?: string;
  logo?: string;
  link: string;
}

export type GorestAnswerResponse = {
  _id: number;
  email: string;
  quiz?: number;
  answers?: number[];
  status: string;
  styles?: Array<string>;
  total?: number;
  conclusion?: string;
  qr_text?: string;
  qr_image?: string;
  urls?: Url[];
  stepup_promo?: string;
  created_at: number;
  updated_at: number;
};

export type GorestServiceProps = (requestInstance?: AxiosInstance) => {
  answers: (payload: GorestAnswerPayload) => Promise<AxiosResponse<GorestAnswerResponse>>;
  paymentCheck: (_id: number | string) => Promise<AxiosResponse<GorestAnswerResponse>>;
};
