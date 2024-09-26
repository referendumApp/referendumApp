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
  title: string;
  description: string;
  tags: string[];
}

export type ItemType = 'bill' | 'legislator';
