/**
 * Created by zhengliuyang on 2018/6/5.
 */
import config from '../config';
import SocketIOClient from 'socket.io-client';
const io = SocketIOClient(config.socket);
io.on('connect', () => {
    console.log('socket io 已连接!')
});
export default io;