import baseApi, { ApiResource } from '@app-state/baseApi';

const catalogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBills: builder.query({
      query: ({ skip, limit }) => ({
        url: ApiResource.Bills,
        // params: { skip, limit },
      }),
    }),
  }),
});

export const { useGetBillsQuery } = catalogApi;
