import { StyleSheet } from 'react-native';

import { size } from '@/themes';

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: size.s * 1.5,
    marginBottom: size.m * 1.5,
  },
  button: {
    borderRadius: 8,
  },
  buttonText: {
    fontWeight: '500',
  },
  optionsContainer: {
    padding: size.m,
  },
});

export default styles;
