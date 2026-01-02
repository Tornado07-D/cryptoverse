import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const cryptoNewsApi = createApi({
  reducerPath: 'cryptoNewsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://cryptopanic.com/api/developer/v2/',
  }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: () =>
        `posts/?auth_token=${process.env.REACT_APP_CRYPTOPANIC_KEY}&public=true&kind=news&filter=important&regions=en`,
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
