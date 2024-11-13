import { VoteChoiceType } from '@/appTypes';

export type BillVote = {
  billId: number;
  voteChoice: VoteChoiceType;
}

export type UserBillVote = BillVote & {
  userId: number;
}
