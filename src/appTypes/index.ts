import { FlattenFieldKeys } from './utils';

export interface Party {
  id: number;
  name: string;
}

export interface Role {
  id: number;
  name: string;
}

export interface State {
  id: number;
  name: string;
}

export interface LegislativeBody {
  id: number;
  roleId: number;
  stateId: number;
}

export interface Legislator {
  id: number;
  legiscanId: number;
  name: string;
  partyId: number;
  party: Party;
  roleId: number;
  role: Role;
  stateId: number;
  state: State;
  imageUrl: string;
  district?: string;
  address: string;
  phone: string;
  committees: any[];
  facebook: string;
  twitter: string;
  instagram: string;
}

export type LegislatorField = FlattenFieldKeys<Legislator>;

export interface Bill {
  id: number;
  legiscanId: number;
  identifier: string;
  stateId: number;
  state: State;
  legislativeBodyId: number;
  legislativeBody: LegislativeBody;
  sessionId: number;
  statusId: number;
  statusDate: string;
  title: string;
  description: string;
  tags?: string[];
  briefing: string;
  communityYesVotes?: number;
  communityNoVotes?: number;
}

export type BillField = FlattenFieldKeys<Bill>;

export interface User {
  accessToken: string;
  tokenType: string;
  username: string;
}

export const VoteChoice = {
  YES: 1,
  NO: 2,
} as const;

export type VoteChoiceType = typeof VoteChoice[keyof typeof VoteChoice];