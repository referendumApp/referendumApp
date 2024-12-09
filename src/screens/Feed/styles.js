import { StyleSheet } from 'react-native';

import { colors, componentStyles, size, typography, withOpacity } from '@/themes';

const styles = StyleSheet.create({
  container: componentStyles.container,
  header: {
    ...componentStyles.header,
    paddingBottom: size.m * 1.5,
  },
  headerText: componentStyles.headerText,
  subHeader: componentStyles.subHeader,
  tagCarouselContainer: {
    ...componentStyles.carouselContainer,
    paddingHorizontal: size.m,
    paddingBottom: size.m,
  },
  tagCarouselTitle: {
    ...typography.subtitle,
    color: colors.tertiary,
    paddingBottom: size.s,
  },
  tagCarouselItem: componentStyles.tagCarouselItem,
  tagCarouselSelectedItem: {
    backgroundColor: colors.tertiary,
  },
  tagCarouselItemText: {
    ...componentStyles.boldText,
    fontSize: size.m - 2,
    color: colors.tertiary,
  },
  tagCarouselSelectedItemText: {
    ...componentStyles.boldText,
    fontSize: size.m - 2,
    color: colors.primary,
  },
  feedList: {
    paddingTop: size.m,
  },
  feedItem: componentStyles.item,
  feedItemDate: {
    ...typography.date,
    marginBottom: size.s * 1.5,
  },
  feedItemTitle: {
    ...typography.subtitle,
    fontFamily: 'Inter-Bold',
    color: colors.secondary,
    marginBottom: 8,
  },
  feedItemBody: {
    ...typography.body,
    marginBottom: 12,
  },
  feedItemCarouselContainer: {
    ...componentStyles.carouselContainer,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 0,
    paddingLeft: 0,
  },
  feedItemCarouselItem: {
    ...componentStyles.carouselItem,
    backgroundColor: withOpacity(colors.lightGray, 0.6),
    padding: size.s,
  },
  feedItemCarouselItemText: {
    ...componentStyles.boldText,
    fontSize: size.s * 1.5,
  },
  feedItemCarouselLinkTitle: {
    ...typography.body,
    paddingRight: 8,
    marginBottom: 0,
  },
  feedItemCarouselLinkText: {
    ...typography.link,
    textDecorationLine: 'underline',
  },
  emptyListText: {
    ...typography.body,
    textAlign: 'center',
    marginTop: 32,
    color: colors.mediumGray,
  },
});

export default styles;
