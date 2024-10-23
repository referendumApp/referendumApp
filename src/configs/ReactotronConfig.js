import Reactotron from 'reactotron-react-native';
import {reactotronRedux} from 'reactotron-redux';

const reactotron = Reactotron.configure({name: 'Referendum Debugger'}) // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  .use(reactotronRedux()) // add redux plugin
  .connect();

export default reactotron;
