import {
  FilterComponentFields,
  FilterOptionFieldTypes,
  FilterOptionValueMap,
  TabMappingItem,
  TabType,
  ValidFilterFields,
} from '@/screens/Catalog/types';

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

export type FilterConfig<T extends TabType> = {
  fields: ValidFilterFields;
  filterFn: <F extends FilterOptionFieldTypes>(
    item: TabMappingItem<T>,
    field: F,
    filterValue: FilterOptionValueMap[F],
  ) => boolean;
  searchFn: (item: TabMappingItem<T>, query: string) => boolean;
};

type FilterConfigs = {
  [T in TabType]: FilterConfig<T>;
};

export const filterConfigs: FilterConfigs = {
  bill: {
    fields: [FilterComponentFields.roleId, FilterComponentFields.stateId],
    filterFn: (item, field, filterValue) => {
      if (Array.isArray(filterValue)) {
        switch (field) {
          case FilterComponentFields.roleId:
            return filterValue.includes(item.legislativeBody.roleId);
          case FilterComponentFields.stateId:
            return filterValue.includes(item.stateId);
        }
      }

      if (field === 'federal' && filterValue) {
        return item.stateId === FEDERAL_ID;
      }

      return true;
    },
    searchFn: (item, query) => {
      query = query.toLowerCase();
      return (
        item.identifier.toLowerCase().includes(query) || item.title.toLowerCase().includes(query)
      );
    },
  },
  legislator: {
    fields: [
      FilterComponentFields.roleId,
      FilterComponentFields.partyId,
      FilterComponentFields.stateId,
    ],
    filterFn: (item, field, filterValue) => {
      if (Array.isArray(filterValue)) {
        switch (field) {
          case FilterComponentFields.roleId:
            return filterValue.includes(item.roleId);
          case FilterComponentFields.stateId:
            return filterValue.includes(item.stateId);
          case FilterComponentFields.partyId:
            return filterValue.includes(item.partyId);
        }
      }

      return true;
    },
    searchFn: (item, query) => {
      query = query.toLowerCase();
      return (
        item.name.toLowerCase().includes(query) ||
        item.party.name.toLowerCase().includes(query) ||
        item.state.name.toLowerCase().includes(query) ||
        item.role.name.toLowerCase().includes(query)
      );
    },
  },
};
