export interface Legislator {
  id: string;
  name: string;
  party: string;
  state: string;
  chamber: string;
  imageUrl: string;
  district?: string;
  topIssues: string[];
  phone: string;
  office: string;
  facebook: string;
  twitter: string;
  instagram: string;
}

export interface Bill {
  id: string;
  identifier: string;
  state: string;
  body: string;
  session: string;
  sponsorIds: string[];
  status: string;
  title: string;
  description: string;
  tags: string[];
  briefing: string;
  communityYesVotes: number;
  communityNoVotes: number;
}

export type ItemType = 'bill' | 'legislator';
