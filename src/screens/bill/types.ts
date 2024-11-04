import { VoteChoiceType } from '@/screens/constants';

export type BillVote = {
  billId: number;
  voteChoice: VoteChoiceType;
}

export type UserBillVote = BillVote & {
  userId: number;
}
