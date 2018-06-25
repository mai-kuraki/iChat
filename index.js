import React, { Component } from 'react';
import { AppRegistry, AsyncStorage } from 'react-native';
import {Provider} from 'react-redux';
import store from './app/store';
import App from './app/contaniers';
import jwtDecode from 'jwt-decode';
import * as TYPE from './app/const';

class Root extends Component {
    componentWillMount() {
        this.initStore();
    }

    initStore() {
        AsyncStorage.getItem('webToken', (error, token) => {
            if(token) {
                let profile = jwtDecode(token);
                store.dispatch({
                    type: TYPE.SET_WEBTOKEN,
                    value: token,
                });
                store.dispatch({
                    type: TYPE.SET_PROFILE,
                    value: profile,
                });
                setTimeout(() => {
                    console.log(store.getState())
                })
            }
        });
    }

    render() {
        return (
            <Provider store={store}>
                <App/>
            </Provider>
        )
    }
}

AppRegistry.registerComponent('iChat', () => Root);
