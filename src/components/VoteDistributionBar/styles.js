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
    backgroundColor: colors.oldGloryRed,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  percentageText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: typography.caption.fontSize,
    paddingHorizontal: size.xs,
  },
  floatingTextContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  floatingText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: typography.caption.fontSize,
  },
  leftFloatingText: {
    left: size.xs,
  },
  rightFloatingText: {
    right: size.xs,
  },
  emptyBar: {
    backgroundColor: colors.lightGray,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: colors.mediumGray,
    fontWeight: 'bold',
    fontSize: typography.caption.fontSize,
  },
});

export default styles;
