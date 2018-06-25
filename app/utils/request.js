/**
 * Created by zhengliuyang on 2018/6/5.
 */
import {
    AsyncStorage
} from 'react-native';
import store from '../store';
import jwtDecode from 'jwt-decode';
import * as TYPE from '../const';
const request = (url, method, body, headers) => {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem('webToken', (error, token) => {
            let header = {
                'Webtoken': token || '',
            };
            if(headers) {
                Object.assign(header, headers);
            }else {
                Object.assign(header, {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                })
            }
            let options = {
                method: method,
                headers: header,
            };
            if(method.toLocaleUpperCase() !== 'GET' && header['Content-Type'] == 'application/json') {
                options.body = JSON.stringify(body);
            }else {
                options.body = body;
            }
            fetch(url, options).then((response) => {
                try{
                    return response.json();
                }catch (e) {
                    console.log(e);
                }
            }).then((data) => {
                if(data.code == 200) {
                    if(data.hasOwnProperty('token')) {
                        let profile = jwtDecode(data.token);
                        store.dispatch({
                            type: TYPE.SET_WEBTOKEN,
                            value: data.token,
                        });
                        store.dispatch({
                            type: TYPE.SET_PROFILE,
                            value: profile,
                        });
                    }
                }
                resolve(data);
            }).catch((error) => {
                reject(error);
            })
        });
    })
};

export default request;