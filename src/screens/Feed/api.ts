import { Bill, Legislator } from '@/appTypes';
import baseApi, { ApiResource, createGetQueryAndReducer } from '@/store/baseApi';
import { isDevEnv } from '@/store/utils';

import { setUserBills, setUserLegislators } from './duck';

const catalogApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getUserBills: createGetQueryAndReducer<Bill[]>({
      builder,
      resource: ApiResource.bills,
      pathParams: ApiResource.legislators,
      reducer: setUserBills,
    }),
    getUserLegislators: createGetQueryAndReducer<Legislator[]>({
      builder,
      resource: ApiResource.users,
      pathParams: ApiResource.legislators,
      reducer: setUserLegislators,
    }),
  }),
  overrideExisting: isDevEnv(),
});

export const { useGetUserBillsQuery, useGetUserLegislatorsQuery } = catalogApi;
