import React, { ReactNode, useMemo } from 'react';

import { FilterTitles, ToggleOptions } from '@/screens/Catalog/filters/constants';
import {
  PartyFilter,
  RoleFilter,
  StateFilter,
  StatusFilter,
} from '@/screens/Catalog/filters/FilterComponents';
import {
  FilterComponentFields,
  FilterComponentFieldTypes,
  ValidFilterFields,
} from '@/screens/Catalog/types';

interface FilterComponentConfigs {
  key: number;
  title: string;
  content: ReactNode;
  category: ToggleOptions;
}

type FilterComponents = { [K in FilterComponentFieldTypes]: FilterComponentConfigs };

const components: FilterComponents = {
  [FilterComponentFields.partyId]: {
    key: 0,
    title: FilterTitles[FilterComponentFields.partyId],
    content: <PartyFilter />,
    category: ToggleOptions.all,
  },
  [FilterComponentFields.roleId]: {
    key: 1,
    title: FilterTitles[FilterComponentFields.roleId],
    content: <RoleFilter />,
    category: ToggleOptions.federal,
  },
  [FilterComponentFields.statusId]: {
    key: 2,
    title: FilterTitles[FilterComponentFields.statusId],
    content: <StatusFilter />,
    category: ToggleOptions.all,
  },
  [FilterComponentFields.stateId]: {
    key: 3,
    title: FilterTitles[FilterComponentFields.stateId],
    content: <StateFilter />,
    category: ToggleOptions.state,
  },
};

const useFilterComponents = (activeToggle: ToggleOptions, filterFields: ValidFilterFields) => {
  const filterComponents = useMemo(() => {
    const componentConfigs = filterFields.map(field => components[field]);

    return activeToggle === ToggleOptions.all
      ? componentConfigs
      : componentConfigs.filter(
          config => config.category === activeToggle || config.category === ToggleOptions.all,
        );
  }, [activeToggle, filterFields]);

  return filterComponents;
};

export default useFilterComponents;
