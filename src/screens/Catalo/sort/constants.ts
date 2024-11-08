import { Bill, Legislator } from '@/appTypes';
import { SortFields, TabMappingItem, TabMappingSortFields, TabType } from '@/screens/Catalo/types';

import { SortOptions } from './types';

const sortFunctionsMap = {
  [SortFields.identifier]: (a: Bill, b: Bill) => a.identifier.localeCompare(b.identifier),
  [SortFields.title]: (a: Bill, b: Bill) => a.title.localeCompare(b.title),
  [SortFields.statusDate]: (a: Bill, b: Bill) =>
    new Date(b.statusDate).getTime() - new Date(a.statusDate).getTime(),
  [SortFields.name]: (a: Legislator, b: Legislator) => a.name.localeCompare(b.name),
};

type SortFunction<I extends Bill | Legislator> = (a: I, b: I) => number;

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
