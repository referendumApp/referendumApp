import { Legislator } from '@/appTypes';
import baseApi, { ApiResource, HttpMethod, createGetQueryAndReducer } from '@/store/baseApi';
import { isDevEnv } from '@/store/utils';

import { setLegislators } from './duck';

enum LegislatorTags {
  follow = 'LegislatorFollow',
}

const catalogApi = baseApi
  .enhanceEndpoints({
    addTagTypes: [LegislatorTags.follow],
  })
  .injectEndpoints({
    endpoints: builder => ({
      getLegislators: createGetQueryAndReducer<Legislator[]>({
        builder,
        resource: ApiResource.legislators,
        reducer: setLegislators,
      }),
      getFollowedLegislators: builder.query<Legislator[], void>({
        query: () => ({
          url: `${ApiResource.users}/legislators`,
        }),
        providesTags: result => (result ? [{ type: LegislatorTags.follow }] : []),
      }),
      followLegislator: builder.mutation<void, { legislatorId: number }>({
        query: ({ legislatorId }) => ({
          url: `${ApiResource.users}/legislators/${legislatorId}`,
          method: HttpMethod.post,
        }),
        invalidatesTags: (_, error) => (error ? [] : [{ type: LegislatorTags.follow }]),
      }),
      unfollowLegislator: builder.mutation<undefined, { legislatorId: number }>({
        query: ({ legislatorId }) => ({
          url: `${ApiResource.users}/legislators/${legislatorId}`,
          method: HttpMethod.delete,
        }),
        invalidatesTags: (_, error) => (error ? [] : [{ type: LegislatorTags.follow }]),
      }),
    }),
    overrideExisting: isDevEnv(),
  });

export const {
  useGetLegislatorsQuery,
  useGetFollowedLegislatorsQuery,
  useFollowLegislatorMutation,
  useUnfollowLegislatorMutation,
} = catalogApi;
