import { VoteChoiceType } from '@/appTypes';

export type BillVote = {
  billId: number;
  voteChoiceId: VoteChoiceType;
};

export type UserBillVote = BillVote & {
  userId: number;
};

export type UserBillVotes = {
  yay: number;
  nay: number;
};

export type TabType = 'overview' | 'voting' | 'fullText';
