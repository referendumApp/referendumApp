import { createSelector } from '@reduxjs/toolkit';

import { BillDetail } from '@/appTypes';
import { RootState } from '@/store';

export const getBillDetails = (state: RootState) => state.bills.detail;

export const getBillDetailsMap = createSelector(
  [getBillDetails, (_, billIds: number[]) => billIds],
  (bills, billIds): Record<number, BillDetail> => {
    return bills.reduce((acc, bill) => {
      if (billIds.includes(bill.billId)) {
        return { ...acc, [bill.billId]: bill };
      }
      return acc;
    }, {});
  },
);
