import { StyleSheet } from 'react-native';

import { colors, componentStyles, typography } from '@/themes';

const styles = StyleSheet.create({
  container: {
    ...componentStyles.container,
    backgroundColor: colors.white,
    flex: 1,
  },
  header: {
    ...componentStyles.header,
    paddingTop: 2,
  },
  headerNavBar: {
    ...componentStyles.header,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 0,
  },
  backButton: {},
  backButtonText: {
    ...typography.body,
    color: 'white',
  },
  followButton: {
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
  followButtonText: {
    ...typography.body,
    color: 'white',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 8,
  },
  selectedFollowButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
  selectedFollowButtonText: {
    ...typography.body,
    color: colors.oldGloryRed,
    fontWeight: 'bold',
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 32,
  },
  name: {
    ...typography.title,
    justifyContent: 'left',
  },
  subtitle: typography.subtitle,
  section: componentStyles.section,
  sectionTitle: {
    ...typography.subtitle,
    color: colors.oldGloryRed,
    marginBottom: 8,
  },
  sectionBody: typography.body,
  table: {
    backgroundColor: colors.white,
    borderRadius: 8,
    marginTop: 8,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: colors.oldGloryBlue,
    padding: 8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  tableHeaderText: {
    ...typography.subtitle,
    flex: 1,
  },
  tableRow: {
    flexDirection: 'row',
    padding: 8,
    borderBottomWidth: 1,
  },
  tableCell: {
    ...typography.body,
    flex: 1,
  },
  seeMoreText: {
    ...typography.caption,
    color: colors.oldGloryBlue,
    marginTop: 8,
  },
});

export default styles;
