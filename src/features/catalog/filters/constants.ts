import { FilterComponentFields } from '@/features/catalog/types';

export const FEDERAL_ID = 52;

export enum ToggleOptions {
  all = 'All',
  federal = 'Federal',
  state = 'State',
}

export const FilterTitles = {
  [FilterComponentFields.roleId]: 'Legislative Body',
  [FilterComponentFields.stateId]: 'States',
  [FilterComponentFields.partyId]: 'Political Party',
} as const;

