/**
 * Created by zhengliuyang on 2018/6/5.
 */
import {
    AsyncStorage
} from 'react-native';
import config from '../config';
import SocketIOClient from 'socket.io-client';
let io = SocketIOClient(config.api, {
    // transports: ['websocket', 'polling'],
    reconnection: true,
    // reconnectionDelay: 40000,
    // reconnectionAttempts: 10
});
AsyncStorage.getItem('webToken', (error, token) => {
    if(token) {
        io.on('connect', () => {
            console.log('socket io 已连接!');
            io.emit('authenticate', {token: token})
                .on('authenticated', () => {
                })
                .on('unauthorized', (msg) => {
                    console.log("unauthorized: " + JSON.stringify(msg.data));
                })
        });
        io.on('disconnect', (reason) => {
            console.log(`disconnect for reason ${reason}`);
        });
        io.on('reconnect', (attemptNumber) => {
            console.log('reconnect*********',attemptNumber);
        });
    }
});

export default io;