import { StyleSheet } from 'react-native';

import { colors, size } from '@/themes';

const styles = StyleSheet.create({
  default: {
    padding: size.s * 1.5,
    backgroundColor: colors.lightMediumGray,
    borderRadius: 9999,
  },
  noVote: {
    padding: size.s * 1.5,
    backgroundColor: colors.errorRed,
    borderRadius: 9999,
  },
  yesVote: {
    padding: size.s * 1.5,
    backgroundColor: colors.successGreen,
    borderRadius: 9999,
  },
});

export default styles;
