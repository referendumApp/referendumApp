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

export interface Sponsor {
  billId: number;
  legislatorId: number;
  rank: number;
  type: string;
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

export type BillActionVote = {
  billActionId: number;
  date: string;
  actionDescription: string;
  voteChoiceId: number;
};

export type LegislatorVote = {
  billId: number;
  identifier: string;
  title: string;
  billActionVotes: BillActionVote[];
};

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

export interface BillDetail {
  id: number;
  legiscanId: number;
  identifier: string;
  title: string;
  description: string;
  briefing: string;
  stateId: number;
  stateName: string;
  legislativeBodyId: number;
  legislativeBodyRoleId: number;
  legislativeBodyRole: string;
  sessionId: number;
  statusId: number;
  status: string;
  statusDate: string;
  sponsors: Sponsor[];
}

export type BillDetailField = FlattenFieldKeys<BillDetail>;

export interface BillVersion {
  id: number;
  billId: number;
  url: string;
  hash: string;
}

export interface BillText {
  billVersionId: number;
  hash: string;
  text: string;
}

export interface User {
  email: string;
  name: string;
  id: number;
  followedBills: [];
  followedTopics: [];
  followedLegislators: [];
}

export interface Token {
  accessToken: string;
  tokenType: string;
}

export const VoteChoice = {
  YES: 1,
  NO: 2,
} as const;

export type VoteChoiceType = (typeof VoteChoice)[keyof typeof VoteChoice];

export type VoteCountByChoice = {
  voteChoiceId: number;
  count: number;
};

export type VoteCountByParty = {
  voteChoiceId: number;
  partyId: number;
  count: number;
};

export type VoteSummary = {
  billActionId: number;
  totalVotes: number;
  voteCountsByChoice: VoteCountByChoice[];
  voteCountsByParty: VoteCountByParty[];
};

export type LegislatorVoteDetail = {
  billActionId: number;
  date: string;
  actionDescription: string;
  legislativeBodyId: number;
  legislatorId: number;
  legislatorName: string;
  partyName: string;
  roleName: string;
  stateName: string;
  voteChoiceId: number;
};

export type BillVotingHistory = {
  billId: number;
  votes: LegislatorVoteDetail[];
  summaries: VoteSummary[];
};
