import React, { useEffect, useMemo } from 'react';

import filterConfigs from '@/screens/catalog/filters/filterConfigs';
import {
  FilterOptionFieldTypes,
  FilterOptions,
  TabMappingItem,
  TabType,
  ValidFilterFields,
} from '@/screens/catalog/types';


interface UseCatalogItems<T extends TabType> {
  items: TabMappingItem<T>[] | undefined;
  selectedTab: T;
  filter: FilterOptions;
  searchQuery: string;
  setFilterFields: React.Dispatch<React.SetStateAction<ValidFilterFields>>;
}

export default function useCatalogItems<T extends TabType>({
  items,
  selectedTab,
  filter,
  searchQuery,
  setFilterFields,
}: UseCatalogItems<T>) {
  const config = filterConfigs[selectedTab];

  useEffect(() => {
    setFilterFields(config.fields);
  }, [config.fields, setFilterFields]);

  const catalogItems = useMemo(() => {
    if (!items) return [];

    const filteredItems =
      Object.keys(filter).length === 0
        ? items
        : items.filter(item => {
            for (const [field, filterValue] of Object.entries(filter)) {
              if (!config.filterFn(item, field as FilterOptionFieldTypes, filterValue)) return false;
            }

            return true;
          });

    return filteredItems.filter(item => config.searchFn(item, searchQuery));
  }, [config, items, filter, searchQuery]);

  return catalogItems;
}
