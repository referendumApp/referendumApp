import { BillDetail, Legislator } from '@/appTypes';
import { SortFields, TabMappingItem, TabMappingSortFields, TabType } from '@/screens/Catalog/types';

import { SortOptions } from './types';

const sortFunctionsMap = {
  [SortFields.identifier]: (a: BillDetail, b: BillDetail) =>
    a.identifier.localeCompare(b.identifier),
  [SortFields.title]: (a: BillDetail, b: BillDetail) => a.title.localeCompare(b.title),
  [SortFields.statusDate]: (a: BillDetail, b: BillDetail) =>
    new Date(b.statusDate).getTime() - new Date(a.statusDate).getTime(),
  [SortFields.name]: (a: Legislator, b: Legislator) => a.name.localeCompare(b.name),
};

type SortFunction<I extends BillDetail | Legislator> = (a: I, b: I) => number;

export type SortFunctions = {
  [T in TabType]: {
    [K in TabMappingSortFields<T>]: SortFunction<TabMappingItem<T>>;
  };
};

export const sortFunctions: SortFunctions = {
  bill: {
    [SortFields.identifier]: sortFunctionsMap.identifier,
    [SortFields.title]: sortFunctionsMap.title,
    [SortFields.statusDate]: sortFunctionsMap.statusDate,
  },
  legislator: {
    [SortFields.name]: sortFunctionsMap.name,
  },
};

type SortOptionsMap = { [T in TabType]: SortOptions };

export const sortOptionsMap: SortOptionsMap = {
  bill: [
    {
      field: SortFields.identifier,
      label: 'Bill ID (A-Z)',
    },
    {
      field: SortFields.title,
      label: 'Bill Title (A-Z)',
    },
    {
      field: SortFields.statusDate,
      label: 'Status Date (Newest)',
    },
  ],
  legislator: [
    {
      field: SortFields.name,
      label: 'Legislator Name (A-Z)',
    },
  ],
};
