import { Bill, BillDetail, BillText, BillVersion, BillVotingHistory } from '@/appTypes';
import baseApi, { ApiResource, HttpMethod, createGetQueryAndReducer } from '@/store/baseApi';
import { isDevEnv } from '@/store/utils';

import { setBills, setBillDetails } from './duck';
import { BillVote, UserBillVote, UserBillVotes } from './types';

enum BillTags {
  follow = 'BillFollow',
  text = 'BillText',
  versions = 'BillVersions',
  vote = 'BillVote',
  votingHistory = 'BillVotingHistory',
  userVotes = 'UserBillVotes',
}

const catalogApi = baseApi
  .enhanceEndpoints({
    addTagTypes: [
      BillTags.follow,
      BillTags.text,
      BillTags.versions,
      BillTags.vote,
      BillTags.votingHistory,
      BillTags.userVotes,
    ],
  })
  .injectEndpoints({
    endpoints: builder => ({
      getBills: createGetQueryAndReducer<Bill[]>({
        builder,
        resource: ApiResource.bills,
        reducer: setBills,
      }),
      getBillDetails: createGetQueryAndReducer<BillDetail[]>({
        builder,
        resource: ApiResource.bills,
        pathParams: 'details',
        reducer: setBillDetails,
      }),
      getBillVotingHistory: builder.query<BillVotingHistory, { billId: number }>({
        query: ({ billId }) => ({
          url: `${ApiResource.bills}/${billId}/voting_history`,
        }),
        providesTags: (result, _, { billId }) =>
          result ? [{ type: BillTags.votingHistory, id: billId }] : [],
      }),
      getBillVersions: builder.query<BillVersion[], { billId: number }>({
        query: ({ billId }) => ({
          url: `${ApiResource.bills}/${billId}/bill_versions`,
        }),
        providesTags: (result, _, { billId }) =>
          result && result.length > 0 ? [{ type: BillTags.versions, id: billId }] : [],
      }),
      getUserBillVotes: builder.query<UserBillVotes, { billId: number }>({
        query: ({ billId }) => ({
          url: `${ApiResource.bills}/${billId}/user_votes`,
        }),
        providesTags: (result, _, { billId }) =>
          result ? [{ type: BillTags.userVotes, id: billId }] : [],
      }),
      getBillText: builder.query<BillText, { billVersionId: number }>({
        query: ({ billVersionId }) => ({
          url: `${ApiResource.billVersions}/${billVersionId}/text`,
        }),
        providesTags: (result, _, { billVersionId }) =>
          result ? [{ type: BillTags.text, id: billVersionId }] : [],
      }),
      getBillVotes: builder.query<UserBillVote[], { billId?: number }>({
        query: params => ({
          url: `${ApiResource.users}/votes`,
          params,
        }),
        providesTags: result => (result ? [BillTags.vote] : []),
      }),
      castBillVote: builder.mutation<UserBillVote, BillVote>({
        query: body => ({
          url: `${ApiResource.users}/votes`,
          method: HttpMethod.put,
          body,
        }),
        invalidatesTags: (_, error, { billId }) =>
          error ? [] : [{ type: BillTags.vote }, { type: BillTags.userVotes, id: billId }],
      }),
      uncastBillVote: builder.mutation<undefined, { billId: number }>({
        query: params => ({
          url: `${ApiResource.users}/votes`,
          method: HttpMethod.delete,
          params,
        }),
        invalidatesTags: (_, error) => (error ? [] : [{ type: BillTags.vote }]),
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
  useGetBillDetailsQuery,
  useGetBillVersionsQuery,
  useGetBillVotingHistoryQuery,
  useGetUserBillVotesQuery,
  useGetBillTextQuery,
  useGetBillVotesQuery,
  useCastBillVoteMutation,
  useUncastBillVoteMutation,
  useGetFollowedBillsQuery,
  useFollowBillMutation,
  useUnfollowBillMutation,
} = catalogApi;
