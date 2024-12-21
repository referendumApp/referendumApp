import { BillDetail, Legislator, VoteChoiceType } from '@/appTypes';

export type RootStackParamList = {
  Auth: undefined;
  App: undefined;
};

export type AuthStackParamList = {
  Welcome: undefined;
  Login: { previousScreen: 'Welcome' | 'SignUp' };
  SignUp: undefined;
};

export type AppStackParamList = {
  Feed: undefined;
  Catalog: undefined;
  Settings: undefined;
};

export type CatalogStackParamList = {
  CatalogScreen: undefined;
  LegislatorScreen: { legislator: Legislator; initialFollow?: boolean };
  BillScreen: { bill: BillDetail; initialFollow?: boolean; initialVote?: VoteChoiceType };
};

export type SettingsStackParamList = {
  SettingsScreen: undefined;
  PasswordResetScreen: undefined;
}