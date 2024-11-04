import { StyleSheet } from 'react-native';

import { colors, componentStyles, size } from '@/themes';

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: colors.transparent,
  },
  modalContent: {
    backgroundColor: colors.white,
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
  checkbox: {
    width: size.l,
    height: size.l,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.mediumGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    backgroundColor: colors.appleBlue,
    borderColor: colors.appleBlue,
  },
  optionText: {
    marginLeft: size.s * 1.5,
    fontSize: size.m,
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
    backgroundColor: colors.offWhite,
  },
  clearButtonText: {
    color: colors.darkGray,
    fontWeight: '600',
  },
  applyButton: {
    backgroundColor: colors.appleBlue,
  },
  applyButtonText: {
    color: colors.white,
    fontWeight: '600',
  },
});

export default styles;
