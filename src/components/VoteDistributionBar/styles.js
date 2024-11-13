import { StyleSheet } from 'react-native';

import { colors, size, typography } from '@/themes';

const styles = StyleSheet.create({
  container: {
    height: 30,
    borderRadius: 15,
    overflow: 'hidden',
    position: 'relative',
  },
  bar: {
    flexDirection: 'row',
    height: '100%',
  },
  yesBar: {
    backgroundColor: colors.yesVoteGreen,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  noBar: {
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  percentageText: {
    ...typography.caption,
    color: colors.tertiary,
    fontWeight: 'bold',
    paddingHorizontal: size.xs,
  },
  floatingTextContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  floatingText: {
    ...typography.caption,
    color: colors.tertiary,
    fontWeight: 'bold',
  },
  leftFloatingText: {
    fontFamily: 'OpenSans-Regular',
    left: size.xs,
  },
  rightFloatingText: {
    fontFamily: 'OpenSans-Regular',
    right: size.xs,
  },
  emptyBar: {
    backgroundColor: colors.mediumGray,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    ...typography.caption,
    fontFamily: 'Inter-Bold',
    color: colors.darkGray,
  },
});

export default styles;
