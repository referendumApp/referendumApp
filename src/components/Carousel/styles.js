import { StyleSheet } from 'react-native';

import { colors, componentStyles, size, typography } from '@/themes';

const styles = StyleSheet.create({
    container: {
      ...componentStyles.carouselContainer,
    },
    title: {
      ...typography.subtitle,
      marginBottom: size.s,
    },
    item: {
      ...componentStyles.carouselItem,
      backgroundColor: colors.tertiary,
    },
    itemSelected: {
      ...componentStyles.carouselItem,
      backgroundColor: colors.secondary,
    },
    itemText: {
      ...typography.body,
      color: colors.primary,
    },
    itemTextSelected: {
      ...typography.body,
      color: colors.tertiary,
    },
});

export default styles;
