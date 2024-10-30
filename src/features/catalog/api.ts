// import { Bill, Legislator } from '@/appTypes';
// import baseApi, { ApiResource, createGetQuery } from '@/store/baseApi';
// import { isDevEnv } from '@/store/utils';
//
// import { setBills, setLegislators } from './duck';
//
// const catalogApi = baseApi.injectEndpoints({
//   endpoints: builder => ({
//     getBills: createGetQuery<Bill[]>({
//       builder,
//       resource: ApiResource.bills,
//       reducer: setBills,
//     }),
//     getLegislators: createGetQuery<Legislator[]>({
//       builder,
//       resource: ApiResource.legislators,
//       reducer: setLegislators,
//     }),
//   }),
//   overrideExisting: isDevEnv(),
// });
//
// export const { useGetBillsQuery, useGetLegislatorsQuery } = catalogApi;
