/**
 * Created by zhengliuyang on 2018/6/5.
 */
import {
    AsyncStorage
} from 'react-native';
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
                console.log(data)
                resolve(data);
            }).catch((error) => {
                reject(error);
            })
        });
    })
};

export default request;