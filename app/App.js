/**
 * Created by zhengliuyang on 2018/5/30.
 */
import {
    StackNavigator,
} from 'react-navigation';
import SignIn from './user/SignIn';
import Register from './user/Register';
import Tab from './main/Tab';
import Chat from './main/Chat';
// GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;
const App = StackNavigator({
    Tab: {screen: Tab},
    Chat: {screen: Chat},
    SignIn: {screen: SignIn},
    Register: {screen: Register},
});

export default App;