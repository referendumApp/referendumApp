import { StyleSheet } from 'react-native';

const referendumStyleSheet = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#002868', // oldGloryBlue
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },
  button: {
    width: '100%',
    backgroundColor: '#BF0A30', // oldGloryRed
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  linkButton: {
    marginTop: 15,
  },
  linkButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default referendumStyleSheet;
