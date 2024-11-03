import React from 'react';

import CheckBoxList from '@/components/CheckBoxList';
import MultiSelect from '@/components/MultiSelect';
import { useGetPartysQuery, useGetRolesQuery, useGetStatesQuery } from '@/store/baseApi';

import { useFilterContext } from './FilterProvider';

export const PartyFilter = () => {
  const { data: partys } = useGetPartysQuery();
  const { filterOptions, setFilterOptions } = useFilterContext();

  return (
    <CheckBoxList
      options={partys}
      onSelect={options => setFilterOptions(prev => ({ ...prev, roleId: options }))}
      selectedOptions={filterOptions?.partyId}
    />
  );
};

export const RoleFilter = () => {
  const { data: roles } = useGetRolesQuery();
  const { filterOptions, setFilterOptions } = useFilterContext();

  return (
    <CheckBoxList
      options={roles}
      onSelect={options => setFilterOptions(prev => ({ ...prev, roleId: options }))}
      selectedOptions={filterOptions?.roleId}
    />
  );
};

export const StateFilter = () => {
  const { states } = useGetStatesQuery(undefined, {
    selectFromResult: ({ data }) => ({
      states: data?.filter(state => state.id < 51),
    }),
  });
  const { filterOptions, setFilterOptions } = useFilterContext();

  return (
    <MultiSelect
      options={states}
      onSelect={ids => setFilterOptions(prev => ({ ...prev, stateId: ids }))}
      selectedOptions={filterOptions?.stateId}
    />
  );
};

