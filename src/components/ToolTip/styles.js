import { StyleSheet } from 'react-native';

import { colors, size, typography } from '@/themes';

const ARROW_SIZE = size.xs + 1;

const styles = StyleSheet.create({
  tooltipContainer: {
    position: 'relative',
  },
  tooltip: {
    position: 'absolute',
    bottom: '100%',
    alignSelf: 'center',
    marginBottom: ARROW_SIZE,
  },
  bubble: {
    backgroundColor: colors.semiTransparent,
    padding: size.s,
    borderRadius: 4,
    maxWidth: 200,
  },
  errorBubble: {
    backgroundColor: colors.errorRed,
  },
  text: {
    ...typography.caption,
    color: colors.white,
  },
  arrow: {
    position: 'absolute',
    bottom: -5,
    left: ARROW_SIZE,
    width: 0,
    height: 0,
    borderLeftWidth: ARROW_SIZE,
    borderRightWidth: ARROW_SIZE,
    borderTopWidth: ARROW_SIZE,
    borderStyle: 'solid',
    backgroundColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: colors.semiTransparent,
  },
  errorArrow: {
    borderTopColor: colors.errorRed,
  },
});

export default styles;
