/**
 * Created by zhengliuyang on 2018/6/5.
 */
import {
    AsyncStorage
} from 'react-native';
import config from '../config';
import SocketIOClient from 'socket.io-client';
let io = SocketIOClient(config.api);
AsyncStorage.getItem('webToken', (error, token) => {
    if(token) {
        io.on('connect', () => {
            console.log('socket io 已连接!');
            io.emit('authenticate', {token: token})
                .on('authenticated', function () {
                })
                .on('unauthorized', function(msg) {
                    console.log("unauthorized: " + JSON.stringify(msg.data));
                })
        });
    }
});

export default io;