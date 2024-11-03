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
      backgroundColor: colors.white,
    },
    itemSelected: {
      backgroundColor: colors.oldGloryRed,
    },
    itemText: {
      ...typography.body,
      color: colors.oldGloryBlue,
    },
    itemTextSelected: {
      color: colors.white,
    },
});

export default styles;
