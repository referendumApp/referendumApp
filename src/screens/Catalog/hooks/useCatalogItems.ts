import { useMemo, useState } from 'react';

import { filterConfigs } from '@/screens/Catalog/filters/constants';
import { sortFunctions } from '@/screens/Catalog/sort/constants';
import {
  FilterOptionFieldTypes,
  FilterOptions,
  TabMappingItem,
  TabMappingSortFields,
  TabType,
} from '@/screens/Catalog/types';

interface UseCatalogItems<T extends TabType> {
  items: TabMappingItem<T>[] | undefined;
  selectedTab: T;
  filter: FilterOptions;
  searchQuery: string;
  selectedSort: TabMappingSortFields<T> | undefined;
}

export default function useCatalogItems<T extends TabType>({
  items,
  selectedTab,
  filter,
  searchQuery,
  selectedSort,
}: UseCatalogItems<T>) {
  const catalogItems = useMemo(() => {
    if (!items) return [];

    const config = filterConfigs[selectedTab];
    const sortFunctionsMap = sortFunctions[selectedTab];

    let filteredItems: TabMappingItem<T>[] = [];
    if (Object.keys(filter).length !== 0 || searchQuery !== '') {
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        let shouldInclude = true;

        // Apply filters
        for (const [field, filterValue] of Object.entries(filter)) {
          if (!config.filterFn(item, field as FilterOptionFieldTypes, filterValue)) {
            shouldInclude = false;
            break;
          }
        }

        if (!shouldInclude) continue;

        // Apply search
        if (searchQuery) {
          shouldInclude = config.searchFn(item, searchQuery);
        }

        if (shouldInclude) {
          filteredItems.push(item);
        }
      }
    } else {
      filteredItems = [...items];
    }

    return selectedSort ? [...filteredItems].sort(sortFunctionsMap[selectedSort]) : filteredItems;
  }, [items, filter, searchQuery, selectedSort, selectedTab]);

  return catalogItems;
}
