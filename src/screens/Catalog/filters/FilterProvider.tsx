import React, { ReactNode, createContext, useContext, useState } from 'react';

import { FilterOptions } from '@/screens/Catalog/types';

import { ToggleOptions } from './constants';

interface FilterContextType {
  filterOptions: FilterOptions;
  setFilterOptions: React.Dispatch<React.SetStateAction<FilterOptions>>;
  activeToggle: ToggleOptions;
  setActiveToggle: React.Dispatch<React.SetStateAction<ToggleOptions>>;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

interface FilterProviderProps {
  children: ReactNode;
  initialFilters?: FilterOptions;
}

const FilterProvider: React.FC<FilterProviderProps> = ({
  children,
  initialFilters = {},
}) => {
  const [filterOptions, setFilterOptions] = useState<FilterOptions>(initialFilters);
  const [activeToggle, setActiveToggle] = useState(ToggleOptions.all);

  return (
    <FilterContext.Provider
      value={{ filterOptions, setFilterOptions, activeToggle, setActiveToggle }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error('The useFilter hook must be used within a FilterProvider');
  }

  return context;
};

export default FilterProvider;
