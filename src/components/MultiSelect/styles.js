import { Platform, StyleSheet } from 'react-native';

import { colors, componentStyles, size, typography } from '@/themes';

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  header: {
    ...componentStyles.centerRow,
    justifyContent: 'space-between',
    padding: size.s * 1.5,
    backgroundColor: colors.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.lightGray,
  },
  headerOpen: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  headerText: typography.body,
  placeholder: componentStyles.placeholderText,
  dropdown: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: colors.lightGray,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    ...Platform.select({
      ios: {
        shadowColor: colors.black,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  searchContainer: {
    ...componentStyles.centerRow,
    padding: size.s,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.lightGray,
  },
  searchIcon: {
    marginRight: size.s,
  },
  searchInput: {
    flex: 1,
    height: size.xxl,
    padding: size.s,
    fontSize: size.m,
  },
  optionsList: {
    maxHeight: 300,
  },
  option: {
    padding: size.s * 1.5,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.lightGray,
  },
  selectedOption: {
    backgroundColor: colors.veryLightBlue,
  },
  optionContent: componentStyles.centerRow,
  checkbox: componentStyles.checkbox,
  checked: {
    backgroundColor: colors.appleBlue,
    borderColor: colors.appleBlue,
  },
  optionText: typography.body,
  selectedOptionText: {
    color: colors.appleBlue,
  },
  noResults: {
    padding: size.m,
    textAlign: 'center',
    color: colors.secondaryMediumGray,
  },
  footer: {
    padding: size.s,
    textAlign: 'center',
    color: colors.secondaryMediumGray,
    fontSize: size.s * 1.5,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.lightGray,
  },
});

export default styles;

