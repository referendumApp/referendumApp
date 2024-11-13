import { Bill, Legislator, VoteChoiceType } from '@/appTypes';

export type RootStackParamList = {
  Feed: undefined;
  CatalogStack: undefined;
  Settings: undefined;
};

export type CatalogStackParamList = {
  Catalog: undefined;
  LegislatorScreen: { legislator: Legislator, initialFollow?: boolean };
  BillScreen: { bill: Bill, initialFollow?: boolean, initialVote?: VoteChoiceType };
};
