import { VoteChoiceType } from '@/appTypes';

export type BillVote = {
  billId: number;
  voteChoiceId: VoteChoiceType;
};

export type UserBillVote = BillVote & {
  userId: number;
};

export type UserBillVotes = {
  yayPercent: number;
  nayPercent: number;
  total: number;
};

export type TabType = 'overview' | 'voting' | 'fullText';
