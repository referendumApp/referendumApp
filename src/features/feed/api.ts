import { Bill, Legislator } from '@/appTypes';
import baseApi, { ApiResource, createGetQuery } from '@/store/baseApi';
import { isDevEnv } from '@/store/utils';

import { setUserBills, setUserLegislators } from './duck';

const catalogApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getUserBills: createGetQuery<Bill[]>({
      builder,
      resource: ApiResource.bills,
      pathParams: ApiResource.legislators,
      reducer: setUserBills,
    }),
    getUserLegislators: createGetQuery<Legislator[]>({
      builder,
      resource: ApiResource.users,
      pathParams: ApiResource.legislators,
      reducer: setUserLegislators,
    }),
  }),
  overrideExisting: isDevEnv(),
});

export const { useGetUserBillsQuery, useGetUserLegislatorsQuery } = catalogApi;
