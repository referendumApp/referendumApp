import { Bill } from '@/appTypes';
import baseApi, { ApiResource, OnQueryStarted } from '@/store/baseApi';

import { setBills } from './duck';

const catalogApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getBills: builder.query({
      query: () => ({
        url: `${ApiResource.bills}/`,
      }),
      async onQueryStarted(
        _: void,
        { dispatch, queryFulfilled }: OnQueryStarted<Bill[]>,
      ) {
        const { data } = await queryFulfilled;
        dispatch(setBills(data));
      },
    }),
  }),
  overrideExisting: true,
});

export const { useGetBillsQuery } = catalogApi;
