import { StyleSheet } from 'react-native';

import { colors, componentStyles, size, typography } from '@/themes';

const styles = StyleSheet.create({
  card: {
    ...componentStyles.card,
    padding: 0,
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    paddingLeft: size.m,
    paddingTop: size.s,
    paddingBottom: size.xs,
    backgroundColor: colors.primary,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  cardTitle: {
    ...typography.title,
    fontSize: size.m + 2,
  },
  cardContent: {
    padding: size.m,
  },
});

export default styles;
