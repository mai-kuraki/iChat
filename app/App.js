/**
 * Created by zhengliuyang on 2018/5/30.
 */
import {
    StackNavigator,
} from 'react-navigation';

import SignIn from './login/SignIn';
import Register from './login/Register';
import Tab from './main/Tab';

const App = StackNavigator({
    Tab: {screen: Tab},
    SignIn: {screen: SignIn},
    Register: {screen: Register},
});

export default App;