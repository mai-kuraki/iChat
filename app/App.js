/**
 * Created by zhengliuyang on 2018/5/30.
 */
import {
    createStackNavigator,
} from 'react-navigation';
import SignIn from './user/SignIn';
import Register from './user/Register';
import Main from './main/Main';
import Chat from './main/Chat';
// GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;
const App = createStackNavigator({
    Main: {screen: Main},
    Chat: {screen: Chat},
    SignIn: {screen: SignIn},
    Register: {screen: Register},
});

export default App;