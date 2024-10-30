import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { useGetRolesQuery, useGetStatesQuery } from '@/store/baseApi';

import Accordion from './Accordion';
import BottomModal from './BottomModal';
import CheckBoxList from './CheckBoxList';
import MultiSelect from './MultiSelect';
import ToggleButton from './ToggleButton';

interface FilterModalProps {
  // filterOptions: FilterOption[];
  isVisible: boolean;
  onFilterChange: (values: string[]) => void;
  onRequestClose: () => void;
  selectedFilters?: string[];
}

const FilterModal: React.FC<FilterModalProps> = ({
  // filterOptions,
  isVisible,
  onFilterChange,
  onRequestClose,
  // selectedFilters = [],
}) => {
  const [selectedStates, setSelectedStates] = useState<number[]>([]);
  const { data: roles } = useGetRolesQuery();
  const { data: states } = useGetStatesQuery();
  const accordionData = [
    {
      title: 'Legislative Body',
      content: <CheckBoxList options={roles ?? []} />,
    },
    {
      title: 'States',
      content: (
        <MultiSelect
          options={states ?? []}
          selectedIds={selectedStates}
          onSelect={ids => setSelectedStates(ids)}
        />
      ),
    },
  ];

  // const handleApply = () => {
  //   onFilterChange(tempFilters);
  //   onRequestClose();
  // };
  //
  // const handleReset = () => {
  //   setTempFilters([]);
  // };

  return (
    <BottomModal
      handleApply={() => undefined}
      handleReset={() => undefined}
      // handleApply={handleApply}
      // handleReset={handleReset}
      isVisible={isVisible}
      onRequestClose={onRequestClose}
      title="Filter">
      <ScrollView style={styles.optionsContainer}>
        <View style={styles.buttonContainer}>
          <ToggleButton buttonText="All" buttonTextStyles={styles.buttonText} />
          <ToggleButton
            iconName="flag"
            buttonText="Federal"
            buttonTextStyles={styles.buttonText}
          />
          <ToggleButton
            iconName="star"
            buttonText="State"
            buttonTextStyles={styles.buttonText}
          />
        </View>
        <Accordion data={accordionData} />
      </ScrollView>
    </BottomModal>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 20,
  },
  buttonText: {
    fontWeight: '500',
  },
  optionsContainer: {
    padding: 16,
  },
  optionItem: {
    paddingVertical: 12,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  optionText: {
    marginLeft: 12,
    fontSize: 16,
  },
});

export default FilterModal;
