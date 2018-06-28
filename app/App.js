/**
 * Created by zhengliuyang on 2018/5/30.
 */
import {
    createStackNavigator,
} from 'react-navigation';
import SignIn from './user/SignIn';
import Register from './user/Register';
import Main from './contaniers/main';
import Chat from './contaniers/chat';
import Search from './main/Search';

// GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;
const App = createStackNavigator({
    Search: {screen: Search},
    Main: {screen: Main},
    Chat: {screen: Chat},
    SignIn: {screen: SignIn},
    Register: {screen: Register},
});

export default App;