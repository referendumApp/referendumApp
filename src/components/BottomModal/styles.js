import { StyleSheet } from 'react-native';

import { colors, componentStyles, size, typography } from '@/themes';

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: colors.transparent,
  },
  modalContent: {
    backgroundColor: colors.tertiary,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: size.m * 1.5,
  },
  modalHeader: {
    ...componentStyles.centerRow,
    justifyContent: 'space-between',
    paddingHorizontal: size.m,
    paddingBottom: size.m,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  modalTitle: componentStyles.modalTitle,
  optionsContainer: {
    padding: size.m,
  },
  optionItem: {
    paddingVertical: size.s * 1.5,
  },
  checkboxContainer: componentStyles.centerRow,
  checkbox: componentStyles.checkbox,
  checked: {
    backgroundColor: colors.appleBlue,
    borderColor: colors.appleBlue,
  },
  modalFooter: {
    flexDirection: 'row',
    padding: size.m,
    borderTopWidth: 1,
    borderTopColor: colors.lightGray,
    gap: size.s * 1.5,
  },
  footerButton: {
    flex: 1,
    padding: size.m,
    borderRadius: size.s,
    alignItems: 'center',
  },
  clearButton: {
    backgroundColor: colors.tertiary,
  },
  clearButtonText: {
    ...typography.body,
    textDecorationLine: 'underline',
  },
  applyButton: {
    backgroundColor: colors.appleBlue,
  },
  applyButtonText: {
    ...typography.body,
    color: colors.tertiary,
  },
});

export default styles;
