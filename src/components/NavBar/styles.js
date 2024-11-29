import { StyleSheet } from 'react-native';

import { colors, componentStyles, size, typography } from '@/themes';

const styles = StyleSheet.create({
  headerNavBar: {
    ...componentStyles.header,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: size.m,
  },
  backButtonText: {
    ...typography.body,
    color: colors.tertiary,
  },
  followButton: componentStyles.followButton,
  followButtonText: componentStyles.followButtonText,
  selectedFollowButton: componentStyles.selectedFollowButton,
  selectedFollowButtonText: componentStyles.selectedFollowButtonText,
});

export default styles;
