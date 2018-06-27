import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import {Provider} from 'react-redux';
import store from './store';
import App from './contaniers/app';
import jwtDecode from 'jwt-decode';
import * as TYPE from './const';

export default class Root extends Component {
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