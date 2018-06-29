/**
 * Created by zhengliuyang on 2018/6/28.
 */
import React, {Component} from 'react';
import {
    Dimensions,
    StyleSheet,
    Text,
    View,
    TextInput,
    StatusBar,
    ScrollView,
    TouchableNativeFeedback,
    TouchableWithoutFeedback,
    Image,
    ProgressBarAndroid
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import config from '../config';
import moment from 'moment';
import store from '../store';
import request from '../utils/request';
const api = config.api;
const staticHost = config.staticHost;

export default class UserCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: {},
        };
        this.request = request(this);
    }

    componentWillMount() {
        if(this.props.uid) {
            this.getUserInfo(this.props.uid);
        }
    }

    getUserInfo(uid) {
        this.request(`${api}/user/profile?uid=${uid}`, 'GET').then((data) => {
            if(data.code == 200) {
                this.setState({
                    profile: data.data,
                })
            }
        })
    }

    render() {
        const {profile} = this.state;
        let avator = require('../images/defaultAv2.jpg');
        if(profile.sex == 2) {
            avator = require('../images/defaultAv.jpg');
        }
        if(profile.avator) {
            avator = {uri: `${staticHost}${profile.avator}`};
        }
        let age = moment().diff(profile.birthday || '', 'years');
        if(!age) {
            age = '年龄未知';
        }else {
            age = `年龄 ${age}`;
        }
        const curUid = store.getState().app.profile.uid;
        return (
            <View style={styles.container}>
                <View style={[styles.card, {paddingBottom: profile.uid !== curUid?36:80}]}>
                    <View style={styles.cardBg}></View>
                    <View style={styles.avatorWrap}>
                        <TouchableNativeFeedback
                            background={TouchableNativeFeedback.Ripple('rgba(0, 0, 0, .2)', true)}
                        >
                            <View style={styles.avator}>
                                <Image source={avator} style={styles.avImg}/>
                                <View style={styles.editAv}>
                                    <FontAwesome
                                        name={profile.sex == 0 ? 'intersex' : (profile.sex == 1 ? 'mars' : 'venus')}
                                        size={14} color="#666"/>
                                </View>
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                    <View style={styles.info}>
                        <Text style={styles.nick}>{profile.nick || ''}</Text>
                        <View style={styles.p}>
                            <Feather name="disc" size={12}/>
                            <Text style={styles.prop}>性别{profile.sex == 0?'保密':(profile.sex == 1?'男':'女') } {age}</Text>
                        </View>
                        <View style={styles.p}>
                            <Feather name="disc" size={12}/>
                            <Text style={styles.prop}>{(profile.uid || '').substr(0, 12) }</Text>
                        </View>
                        <View style={styles.p}>
                            <Feather name="disc" size={12}/>
                            <Text style={styles.prop}>{profile.email || ''}</Text>
                        </View>
                        {
                            profile.uid !== curUid?
                                <TouchableNativeFeedback
                                    background={TouchableNativeFeedback.Ripple('rgba(255, 255, 255, .5)', false)}
                                    onPress={() => {
                                        this.props.apply(profile.uid);
                                    }}
                                >
                                    <View style={styles.button}>
                                        <Text style={styles.buttonLabel}>加好友</Text>
                                    </View>
                                </TouchableNativeFeedback>:null
                        }
                    </View>
                </View>
                <TouchableWithoutFeedback
                    onPress={() => {
                        this.props.close();
                    }}
                >
                <View style={styles.close}>
                    <Ionicons name="ios-close" color="#FFF" size={52}/>
                </View>
                </TouchableWithoutFeedback>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width - 60,
        height: Dimensions.get('window').height * (2 / 3),
        alignItems: 'center',
        justifyContent: 'center'
    },
    card: {
        width: '100%',
        backgroundColor: '#FFF',
        borderRadius: 3,
        elevation: 50,
    },
    p: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 28,
    },
    cardBg: {
        width: '100%',
        height: 120,
        backgroundColor: '#36495C',
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
    },
    close: {
        width: 56,
        height: 56,
        borderRadius: 28,
        borderColor: '#FFF',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
    },
    button: {
        height: 52,
        backgroundColor: '#333',
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2,
        marginTop: 58,
    },
    buttonLabel: {
        fontSize: 16,
        color: '#FFF'
    },
    avatorWrap: {
        alignItems: 'center',
        marginTop: -98,
    },
    avator: {
        width: 120,
        alignItems: 'center',
        paddingTop: 50,
        paddingBottom: 20,
    },
    avImg: {
        width: 90,
        height: 90,
        borderRadius: 45,
    },
    editAv: {
        width: 30,
        height: 30,
        backgroundColor: '#FFF',
        borderRadius: 15,
        shadowColor: '#999',
        elevation: 3,
        right: 5,
        top: 50,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },
    info: {
        paddingLeft: 34,
        paddingRight: 34,
    },
    nick: {
        fontSize: 20,
        color: '#333',
        fontWeight: 'bold',
        marginTop: -10,
        textAlign: 'center',
        marginBottom: 25,
    },
    prop: {
        fontSize: 14,
        color: '#BBB',
        marginLeft: 6,
    },
});