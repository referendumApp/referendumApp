import { Bill } from '@/appTypes';
import baseApi, { ApiResource, HttpMethod, createGetQuery } from '@/store/baseApi';
import { isDevEnv } from '@/store/utils';

import { setBills } from './duck';
import { BillVote, UserBillVote } from './types';

enum BillTags {
  follow = 'BillFollow',
  vote = 'BillVote',
}

const catalogApi = baseApi
  .enhanceEndpoints({
    addTagTypes: [BillTags.follow, BillTags.vote],
  })
  .injectEndpoints({
    endpoints: builder => ({
      getBills: createGetQuery<Bill[]>({
        builder,
        resource: ApiResource.bills,
        reducer: setBills,
      }),
      getBillVotes: builder.query<UserBillVote[], { billId?: number }>({
        query: params => ({
          url: `${ApiResource.users}/votes`,
          params,
        }),
        providesTags: (result, _, { billId }) =>
          result ? [{ type: BillTags.vote, id: billId }] : [],
      }),
      castBillVote: builder.mutation<UserBillVote, BillVote>({
        query: body => ({
          url: `${ApiResource.users}/votes`,
          method: HttpMethod.put,
          body,
        }),
        invalidatesTags: (_, error, { billId }) =>
          error ? [] : [{ type: BillTags.vote, id: billId }],
      }),
      getFollowedBills: builder.query<Bill[], void>({
        query: () => ({
          url: `${ApiResource.users}/bills`,
        }),
        providesTags: result => (result ? [{ type: BillTags.follow }] : []),
      }),
      followBill: builder.mutation<void, { billId: number }>({
        query: ({ billId }) => ({
          url: `${ApiResource.users}/bills/${billId}`,
          method: HttpMethod.post,
        }),
        invalidatesTags: (_, error) => (error ? [] : [{ type: BillTags.follow }]),
      }),
      unfollowBill: builder.mutation<undefined, { billId: number }>({
        query: ({ billId }) => ({
          url: `${ApiResource.users}/bills/${billId}`,
          method: HttpMethod.delete,
        }),
        invalidatesTags: (_, error) => (error ? [] : [{ type: BillTags.follow }]),
      }),
    }),
    overrideExisting: isDevEnv(),
  });

export const {
  useGetBillsQuery,
  useGetBillVotesQuery,
  useCastBillVoteMutation,
  useGetFollowedBillsQuery,
  useFollowBillMutation,
  useUnfollowBillMutation,
} = catalogApi;
