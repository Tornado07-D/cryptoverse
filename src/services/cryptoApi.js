import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoApiHeaders = {
  'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY,
  'x-rapidapi-host': process.env.REACT_APP_CRYPTO_RAPIDAPI_HOST,
};

const baseUrl = process.env.REACT_APP_CRYPTO_API_URL;

const createRequest = (url) => ({ url, headers: cryptoApiHeaders });

export const cryptoApi = createApi({
  reducerPath: 'cryptoApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    // ✅ Get list of cryptos
    getCryptos: builder.query({
      query: (count) => createRequest(`/coins?limit=${count}`),
    }),

    // ✅ Get single crypto details
    getCryptoDetails: builder.query({
      query: (coinId) => createRequest(`/coin/${coinId}`),
    }),

    // ✅ Get crypto price history
    getCryptoHistory: builder.query({
      query: ({ coinId, timeperiod }) =>
        createRequest(`/coin/${coinId}/history?timeperiod=${timeperiod}`),
    }),

    // ✅ Get exchanges
    getExchanges: builder.query({
      query: () => createRequest('/exchanges'),
    }),
  }),
});

// ✅ VERY IMPORTANT EXPORTS
export const {
  useGetCryptosQuery,
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
  useGetExchangesQuery,
} = cryptoApi;
