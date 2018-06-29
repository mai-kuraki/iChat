import React, { Component } from 'react';
import {
    AsyncStorage,
    AppState
} from 'react-native';
import {Provider} from 'react-redux';
import store from './store';
import App from './contaniers/app';
import jwtDecode from 'jwt-decode';
import * as TYPE from './const';
import PushNotification from 'react-native-push-notification';
import io from './utils/socket';
PushNotification.configure({
    onRegister: (token) => {
        console.log( 'TOKEN:', token );
    },
    onNotification: (notification) => {
        console.log( 'NOTIFICATION:', notification );
    },
    senderID: "YOUR GCM SENDER ID",
    popInitialNotification: true,
    requestPermissions: true,
});

export default class Root extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.initStore();
        io.on('message', (message) => {
            let currentState = AppState.currentState;
            if(currentState) {
                PushNotification.localNotificationSchedule({
                    message: "My Notification Message", // (required)
                    date: new Date(Date.now()) // in 60 secs
                });
            }
        });

        io.on('notice', (message) => {
            console.log('ddd')
            let noticeType = message.type,
                msg = '',
                title = '';
            if(noticeType == 1) {
                msg = 'wuya请求加为好友';
                title = '好友申请'
            }
            PushNotification.localNotification({
                title: title,
                message: msg,
            });
        })
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