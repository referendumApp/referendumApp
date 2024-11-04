export const VoteChoice = {
  YES: 1,
  NO: 2,
} as const;

export type VoteChoiceType = typeof VoteChoice[keyof typeof VoteChoice];
