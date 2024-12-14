import React from 'react';
import { ScrollView } from 'react-native';

import Accordion from '@/components/Accordion';
import BottomModal from '@/components/BottomModal';
import { FilterOptions, ValidFilterFields } from '@/screens/Catalog/types';

import { useFilterContext } from './FilterProvider';
import useFilterComponents from './hooks/useFilterComponents';
import styles from './styles';
import ToggleFilter from './ToggleFilter';

interface FilterModalProps {
  filterFields: ValidFilterFields;
  isVisible: boolean;
  onRequestClose: () => void;
  setFilter: (options: FilterOptions) => void;
}

const FilterModal: React.FC<FilterModalProps> = ({
  filterFields,
  isVisible,
  onRequestClose,
  setFilter,
}) => {
  const { activeToggle, filterOptions, setFilterOptions } = useFilterContext();

  const filterComponents = useFilterComponents(activeToggle, filterFields);

  const handleApply = () => {
    setFilter(
      Object.entries(filterOptions).reduce((map, [field, values]) => {
        return !Array.isArray(values) || values.length > 0 ? { ...map, [field]: values } : map;
      }, {}),
    );
    onRequestClose();
  };

  const handleReset = () => setFilterOptions({});

  return (
    <BottomModal
      testID="filterModal"
      handleApply={handleApply}
      handleReset={handleReset}
      isVisible={isVisible}
      onRequestClose={onRequestClose}
      title="Filters"
      animationType="fade"
      statusBarTranslucent={true}
      presentationStyle="fullScreen">
      <ScrollView style={styles.optionsContainer}>
        <ToggleFilter />
        <Accordion data={filterComponents} />
      </ScrollView>
    </BottomModal>
  );
};

export default FilterModal;
