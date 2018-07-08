/**
 * Created by zhengliuyang on 2018/7/6.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    StatusBar,
    View,
    ScrollView,
    TouchableNativeFeedback,
    Image,
    AsyncStorage
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import config from '../config';
import request from '../utils/request';
const api = config.api;

export default class HandleFriendNotice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: [],
        };
        this.request = request(this);
    }

    getUserProfile(uid) {
        return new Promise((resolve, reject) => {
            this.request(`${api}/user/profile?uid=${uid}`, 'GET').then((data) => {
                if(data.code == 200) {
                    resolve(data.data);
                }else {
                    resolve();
                }
            }).catch((e) => {
                reject();
            });
        });
    }

    init() {
        AsyncStorage.getItem('newFriendNotice', (error, data) => {
            data = JSON.parse(data || '[]');
            this.setState({
                item: data,
            });
            setTimeout(() => {
                let item = this.state.item;
                item.map((d) => {
                    let res = this.getUserProfile(d.from);
                    res.then((profile) => {
                        d.profile = profile;
                        this.setState({
                            item: item,
                        })
                    })
                });
            });
        });
    }

    componentWillMount() {
        this.init();
    }

    static navigationOptions = {
        header: null,
    };

    render() {
        const {navigate} = this.props.navigation;
        const {item} = this.state;
        console.log(item)
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="#FFF"
                    barStyle="dark-content"
                />
                <View style={styles.header}>
                    <TouchableNativeFeedback
                        background={TouchableNativeFeedback.Ripple('rgba(0, 0, 0, .2)', true)}
                        onPress={() => {
                            navigate('Main');
                        }}
                    >
                        <View style={styles.headerIcon}>
                            <Feather name="arrow-left" size={20} color="#666"/>
                        </View>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback
                        background={TouchableNativeFeedback.Ripple('rgba(0, 0, 0, .2)', true)}
                        onPress={() => {
                            navigate('Search');
                        }}
                    >
                        <View style={styles.headerIcon}>
                            <Feather name="user-plus" size={20} color="#666"/>
                        </View>
                    </TouchableNativeFeedback>
                </View>
                <ScrollView>
                    <Text style={styles.labelText}>新朋友</Text>
                    {
                        item.map((data, k) => {
                            let profile = data.profile || {};
                            let avator = require('../images/defaultAv2.jpg');
                            if(profile.sex == 2) {
                                avator = require('../images/defaultAv.jpg');
                            }
                            if(profile.avator) {
                                avator = {uri: `${staticHost}${profile.avator}`};
                            }
                            return (
                                <View style={styles.row} key={k}>
                                    <View style={styles.rowLeft}>
                                        <Image source={avator} style={styles.avator}/>
                                        <View>
                                            <Text style={styles.name}>{profile.nick || ' '}</Text>
                                            <Text style={styles.msg}>{data.msg}</Text>
                                        </View>
                                    </View>
                                    {
                                        data.handle?
                                            <View style={styles.buttonStatus}>
                                                <Text style={styles.buttonStatusLabel}>已同意</Text>
                                            </View>:
                                            <TouchableNativeFeedback
                                                background={TouchableNativeFeedback.Ripple('rgba(255, 255, 255, .5)', false)}
                                                onPress={() => {
                                                }}
                                            >
                                                <View style={styles.button}>
                                                    <Text style={styles.buttonLabel}>接受</Text>
                                                </View>
                                            </TouchableNativeFeedback>
                                    }

                                </View>
                            )
                        })
                    }
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        height: 52,
        backgroundColor: '#FFF',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    headerIcon: {
        width: 52,
        height: 52,
        justifyContent: 'center',
        alignItems: 'center',
    },
    labelText: {
        color: '#999',
        fontSize: 14,
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 15,
    },
    row: {
        height: 60,
        backgroundColor: '#FFF',
        padding: 5,
        paddingLeft: 30,
        paddingRight: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    rowLeft: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    avator: {
        width: 36,
        height: 36,
        borderRadius: 18,
    },
    name: {
        fontSize: 16,
        color: '#333',
        paddingLeft: 15
    },
    msg: {
        fontSize: 14,
        color: '#999',
        paddingLeft: 15
    },
    button: {
        width: 60,
        height: 32,
        backgroundColor: '#333',
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonStatus: {
        width: 60,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonLabel: {
        fontSize: 14,
        color: '#FFF'
    },
    buttonStatusLabel: {
        fontSize: 13,
        color: '#999'
    },
});