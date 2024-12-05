import React from 'react';
import { TextInput, TextInputProps } from 'react-native';

import ToolTip from '@/components/ToolTip';
import { FormError } from '@/store/baseApi';

import styles from './styles';

interface FormFieldProps<T extends Record<string, any>> extends Omit<TextInputProps, 'style'> {
  name: keyof T;
  value: string;
  onChangeValue: (name: keyof T, value: string) => void;
  errorState?: FormError<T> | null;
}

type FormFieldComponent = <T extends Record<string, any>>(
  props: FormFieldProps<T>,
) => React.ReactNode;

const FormField: FormFieldComponent = React.memo(
  ({ name, value, onChangeValue, errorState, ...props }) => {
    const hasError = errorState?.field === name;

    const handleChange = (text: string) => {
      onChangeValue(name, text);
    };

    return (
      <>
        {hasError && <ToolTip style={styles.tooltip} text={errorState?.message} isError={true} />}
        <TextInput
          {...props}
          value={value}
          onChangeText={handleChange}
          style={[styles.input, hasError && styles.inputError]}
        />
      </>
    );
  },
);

export default FormField;
