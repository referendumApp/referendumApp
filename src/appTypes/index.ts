export interface Legislator {
  id: number;
  name: string;
  party: string;
  state: string;
  chamber: string;
  imageUrl: string;
  district?: string;
  topIssues: string[];
  address: string;
  phone: string;
  committees: string[];
  facebook: string;
  twitter: string;
  instagram: string;
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

export type ItemType = 'bill' | 'legislator';

export interface User {
  accessToken: string;
  tokenType: string;
  username: string;
}
