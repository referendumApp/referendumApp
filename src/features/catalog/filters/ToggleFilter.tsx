import React, {  useCallback } from 'react';
import { View } from 'react-native';

import ToggleButton from '@/components/ToggleButton';

import { ToggleOptions } from './constants';
import { useFilterContext } from './FilterProvider';
import styles from './styles';

const ToggleFilter = () => {
  const { activeToggle, setActiveToggle, setFilterOptions } = useFilterContext();

  const onToggle = useCallback(
    (isActive: boolean, buttonValue: ToggleOptions) => {
      if (!isActive) {
        setActiveToggle(buttonValue);

        switch (buttonValue) {
          case ToggleOptions.federal:
            setFilterOptions(prev => {
              const newFilters = { ...prev };
              delete newFilters.stateId;
              return { ...newFilters, federal: true };
            });
            break;
          case ToggleOptions.state:
            setFilterOptions(prev => {
              const { stateId } = prev;
              return stateId ?? {};
            });
            break;
        }
      }
    },
    [setActiveToggle, setFilterOptions],
  );

  return (
    <View style={styles.buttonContainer}>
      <ToggleButton
        buttonText={ToggleOptions.all}
        buttonTextStyles={styles.buttonText}
        buttonValue={ToggleOptions.all}
        isActive={activeToggle === ToggleOptions.all}
        onToggle={onToggle}
      />
      <ToggleButton
        iconName="flag"
        buttonText={ToggleOptions.federal}
        buttonTextStyles={styles.buttonText}
        buttonValue={ToggleOptions.federal}
        isActive={activeToggle === ToggleOptions.federal}
        onToggle={onToggle}
      />
      <ToggleButton
        iconName="star"
        buttonText={ToggleOptions.state}
        buttonTextStyles={styles.buttonText}
        buttonValue={ToggleOptions.state}
        isActive={activeToggle === ToggleOptions.state}
        onToggle={onToggle}
      />
    </View>
  );
};

export default ToggleFilter;
