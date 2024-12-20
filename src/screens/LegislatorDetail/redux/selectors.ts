import { RootState } from '@/store';

export const getLegislators = (state: RootState) => state.legislators.list;

export const getLegislatorById = (legislatorId: number) => (state: RootState) =>
  state.legislators.list.find(legislator => legislator.id === legislatorId);
