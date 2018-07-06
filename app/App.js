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
import HandleFriendNotice from './main/HandleFriendNotice';

// GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;
const App = createStackNavigator({
    Main: {screen: Main},
    Chat: {screen: Chat},
    Search: {screen: Search},
    SignIn: {screen: SignIn},
    Register: {screen: Register},
    HandleFriendNotice: {screen: HandleFriendNotice},
});

export default App;