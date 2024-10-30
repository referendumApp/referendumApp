import { Bill } from '@/appTypes';
import baseApi, { ApiResource, createGetQuery } from '@/store/baseApi';
import { isDevEnv } from '@/store/utils';

import { setBills } from './duck';

const catalogApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getBills: createGetQuery<Bill[]>({
      builder,
      resource: ApiResource.bills,
      reducer: setBills,
    }),
  }),
  overrideExisting: isDevEnv(),
});

export const { useGetBillsQuery } = catalogApi;
