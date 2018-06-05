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
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'WebToken': token || '',
            };
            if(headers) {
                Object.assign(header, headers);
            }
            let options = {
                method: method,
                headers: header,
            };
            if(method.toLocaleUpperCase() !== 'GET') {
                options.body = JSON.stringify(body);
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