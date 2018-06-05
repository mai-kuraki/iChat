/**
 * Created by zhengliuyang on 2018/5/31.
 */
import React, {Component} from 'react';
import {
    Dimensions,
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableNativeFeedback,
    TouchableWithoutFeedback,
    Image,
    AsyncStorage
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import config from '../config';
import request from '../utils/request';
import jwtDecode from 'jwt-decode';
const api = config.api;
export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: {},
        }
    }

    componentWillMount() {
        AsyncStorage.getItem('webToken', (error, token) => {
            if(token) {
                let profile = jwtDecode(token);
                this.setState({
                    profile: profile,
                })
            }
        });
    }

    static navigationOptions = {
        header: null,
    };

    logout() {
        request(`${api}/user/logout`, 'GET').then((data) => {
            if(data.code == 200) {
                AsyncStorage.removeItem('webToken');
                const { navigate } = this.props.navigation;
                navigate('SignIn');
            }
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.listWrap}>
                    <View style={styles.avatorWrap}>
                        <TouchableNativeFeedback
                            background={TouchableNativeFeedback.Ripple('rgba(0, 0, 0, .2)', true)}
                        >
                            <View style={styles.avator}>
                                <Image source={require('../images/av4.jpg')} style={styles.avImg}/>
                                <View style={styles.editAv}>
                                    <FontAwesome name="mars" size={14} color="#666"/>
                                </View>
                            </View>
                        </TouchableNativeFeedback>
                        <View style={styles.info}>
                            <Text style={styles.nick}>{this.state.profile.nick || ''}</Text>
                            <Text style={styles.id}>{(this.state.profile.uid || '').substr(0, 12) }</Text>
                            <Text style={styles.email}>{this.state.profile.email || ''}</Text>
                        </View>
                    </View>
                    <View style={styles.buttonItem}>
                        <TouchableNativeFeedback>
                            <View style={styles.button}>
                                <Feather name="image" size={28} color="#333"/>
                                <Text style={styles.buttonLabel}>修改头像</Text>
                            </View>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback>
                            <View style={styles.button}>
                                <Feather name="gitlab" size={28} color="#333"/>
                                <Text style={styles.buttonLabel}>修改昵称</Text>
                            </View>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback>
                            <View style={styles.button}>
                                <FontAwesome name="transgender" size={28} color="#333"/>
                                <Text style={styles.buttonLabel}>设置性别</Text>
                            </View>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback>
                            <View style={styles.button}>
                                <Feather name="calendar" size={28} color="#333"/>
                                <Text style={styles.buttonLabel}>设置生日</Text>
                            </View>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback>
                            <View style={styles.button}>
                                <Feather name="at-sign" size={28} color="#333"/>
                                <Text style={styles.buttonLabel}>设置邮箱</Text>
                            </View>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback onPress={this.logout.bind(this)}>
                            <View style={styles.button}>
                                <Feather name="log-out" size={28} color="#333"/>
                                <Text style={styles.buttonLabel}>退出</Text>
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                </ScrollView>
                <View style={styles.header}>
                    <TouchableNativeFeedback
                        background={TouchableNativeFeedback.Ripple('rgba(0, 0, 0, .2)', true)}
                        onPress={() => {
                            this.props.close(false);
                        }}
                    >
                        <View style={styles.headerIcon}>
                            <Feather name="arrow-left" size={20} color="#666"/>
                        </View>
                    </TouchableNativeFeedback>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listWrap: {
        flex: 1,
    },
    buttonItem: {
        paddingTop: 30,
        paddingBottom: 30,
        paddingLeft: 50,
        paddingRight: 50,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    button: {
        width: (Dimensions.get('window').width - 100) / 2,
        paddingTop: 30,
        paddingBottom: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonLabel: {
        fontSize: 14,
        marginTop: 15,
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: 52,
    },
    headerIcon: {
        width: 52,
        height: 52,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatorWrap: {
        alignItems: 'center',
    },
    avator: {
        width: 120,
        alignItems: 'center',
        paddingTop: 100,
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
        top: 95,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },
    info: {
        alignItems: 'center',
    },
    nick: {
        fontSize: 20,
        color: '#333',
        fontWeight: 'bold',
        marginTop: -10,
    },
    id: {
        fontSize: 13,
        color: '#BBB',
        marginTop: 4,
    },
    email: {
        fontSize: 14,
        color: '#999',
        marginTop: 10,
    },
});
