import {Bill, Legislator} from '@types';

export type RootStackParamList = {
  Feed: undefined;
  CatalogStack: undefined;
  Settings: undefined;
};

export type CatalogStackParamList = {
  Catalog: undefined;
  LegislatorScreen: {legislator: Legislator};
  BillScreen: {bill: Bill};
};
