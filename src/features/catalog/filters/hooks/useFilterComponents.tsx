import React, { ReactNode, useMemo } from 'react';

import { FilterTitles, ToggleOptions } from '@/features/catalog/filters/constants';
import { PartyFilter, RoleFilter, StateFilter } from '@/features/catalog/filters/FilterComponents';
import {
  FilterComponentFields,
  FilterComponentFieldTypes,
  ValidFilterFields,
} from '@/features/catalog/types';

interface FilterComponentConfigs {
  title: string;
  content: ReactNode;
  category: ToggleOptions;
}

type FilterComponents = { [K in FilterComponentFieldTypes]: FilterComponentConfigs };

const useFilterComponents = (activeToggle: ToggleOptions, filterFields: ValidFilterFields) => {
  const components: FilterComponents = useMemo(
    () => ({
      [FilterComponentFields.partyId]: {
        title: FilterTitles[FilterComponentFields.partyId],
        content: <PartyFilter />,
        category: ToggleOptions.all,
      },
      [FilterComponentFields.roleId]: {
        title: FilterTitles[FilterComponentFields.roleId],
        content: <RoleFilter />,
        category: ToggleOptions.federal,
      },
      [FilterComponentFields.stateId]: {
        title: FilterTitles[FilterComponentFields.stateId],
        content: <StateFilter />,
        category: ToggleOptions.state,
      },
    }),
    [],
  );

  const filterComponents = useMemo(() => {
    const componentConfigs = filterFields.map(field => components[field]);

    return activeToggle === ToggleOptions.all
      ? componentConfigs
      : componentConfigs.filter(
          config => config.category === activeToggle || config.category === ToggleOptions.all,
        );
  }, [activeToggle, components, filterFields]);

  return filterComponents;
};

export default useFilterComponents;
