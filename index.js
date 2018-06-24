import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import {Provider} from 'react-redux';
import store from './app/store';
import App from './app/contaniers';

class Root extends Component {
    render() {
        return (
            <Provider store={store}>
                <App/>
            </Provider>
        )
    }
}

AppRegistry.registerComponent('iChat', () => Root);
