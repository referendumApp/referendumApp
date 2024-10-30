import { Legislator } from '@/appTypes';
import baseApi, { ApiResource, createGetQuery } from '@/store/baseApi';
import { isDevEnv } from '@/store/utils';

import { setLegislators } from './duck';

const catalogApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getLegislators: createGetQuery<Legislator[]>({
      builder,
      resource: ApiResource.legislators,
      reducer: setLegislators,
    }),
  }),
  overrideExisting: isDevEnv(),
});

export const { useGetLegislatorsQuery } = catalogApi;
