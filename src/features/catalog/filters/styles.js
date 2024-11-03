import { StyleSheet } from 'react-native';

import { spacing } from '@/themes';

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.s * 1.5,
    marginBottom: spacing.m * 1.5,
  },
  buttonText: {
    fontWeight: '500',
  },
  optionsContainer: {
    padding: spacing.m,
  },
});

export default styles;
