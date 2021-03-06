/**
 * Created by zhengliuyang on 2018/6/5.
 */
import {
    AsyncStorage
} from 'react-native';
import store from '../store';
import jwtDecode from 'jwt-decode';
import * as TYPE from '../const';
const request = (ctx) => {
    return (url, method, body, headers) => {
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
                    });
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
                    console.log(data)
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
                        AsyncStorage.setItem('webToken', data.token);
                    }else if(data.code == 502) {
                        if(ctx.props && ctx.props.navigation) {
                            const { navigate } = ctx.props.navigation;
                            navigate('SignIn');
                        }
                        AsyncStorage.setItem('webToken', '');
                        store.dispatch({
                            type: TYPE.SET_WEBTOKEN,
                            value: '',
                        });
                        store.dispatch({
                            type: TYPE.SET_PROFILE,
                            value: {},
                        });
                    }
                    resolve(data);
                }).catch((error) => {
                    reject(error);
                })
            });
        })
    }
};

export default request;