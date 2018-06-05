/**
 * Created by zhengliuyang on 2018/5/29.
 */
import React, {Component} from 'react';
import {
    Dimensions,
    StyleSheet,
    Text,
    View,
    Animated,
    StatusBar,
    TouchableNativeFeedback,
    Keyboard,
    Alert,
    ProgressBarAndroid
} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Snackbar from 'react-native-snackbar';
import config from '../config';
import request from '../utils/request';
const api = config.api;
export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
            keyborder: false,
            email: '',
            emailError: '',
            password: '',
            passwordError: '',
            password2: '',
            password2Error: '',
            pwdSecure: true,
            pwdSecure2: true,
            fabScale: new Animated.Value(1),
            AniHeight: new Animated.Value(130),
            loading: false,
        };
    }

    static navigationOptions = {
        header: null,
    };

    componentDidMount() {
        this._isMounted = true;
        Keyboard.addListener('keyboardDidShow', this.keyboardWillShow.bind(this));
        Keyboard.addListener('keyboardDidHide', this.keyboardWillHide.bind(this));
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    keyboardWillShow() {
        Animated.timing(
            this.state.fabScale,
            {
                toValue: 0,
                duration: 450,
            }
        ).start();
        Animated.timing(
            this.state.AniHeight,
            {
                toValue: 50,
                duration: 250,
            }
        ).start();
        if(this._isMounted) {
            this.setState({
                keyborder: true,
            })
        }
    }

    keyboardWillHide() {
        Animated.timing(
            this.state.fabScale,
            {
                toValue: 1,
                duration: 450,
            }
        ).start();
        Animated.timing(
            this.state.AniHeight,
            {
                toValue: 130,
                duration: 250,
            }
        ).start();
        if(this._isMounted) {
            this.setState({
                keyborder: false,
            })
        }
    }

    pwdSecure(key) {
        if(key == 1) {
            this.setState({
                pwdSecure: !this.state.pwdSecure,
            })
        }else {
            this.setState({
                pwdSecure2: !this.state.pwdSecure2,
            })
        }
    }

    loadingState(state) {
        this.setState({
            loading: state,
        })
    }

    submit() {
        let email = this.state.email,
            password = this.state.password,
            passwrod2 = this.state.password2;
        if(this.emailReg(email) && this.passwordReg(password) && this.passwordReg2(password, passwrod2)) {
            this.loadingState(true);
            request(`${api}/user/add`, 'PUT', {
                email: email,
                password: password,
            }).then((data) => {
                this.loadingState(false);
                if(data.code == 200) {
                    Snackbar.show({
                        title: '注册成功, 前往登录',
                        duration: 1500,
                    });
                    setTimeout(() => {
                        const { navigate } = this.props.navigation;
                        navigate('SignIn')
                    }, 1500);
                }else {
                    Snackbar.show({
                        title: `注册失败, ${data.msg}`,
                        duration: 8000,
                        action: {
                            title: '知道了',
                            color: '#4BCCBE',
                        },
                    })
                }
            }).catch((error) => {
                this.loadingState(false);
                console.error(error);
            });
        }
    };

    passwordReg(password) {
        if(password) {
            this.setState({
                passwordError: '',
            });
            return true;
        }else {
            this.setState({
                passwordError: 'password is required',
            });
            return false;
        }
    }

    passwordReg2(password, password2) {
        if(password) {
            if(password2) {
                if(password === password2) {
                    this.setState({
                        passwordError2: '',
                    });
                    return true;
                }else {
                    this.setState({
                        passwordError2: '两次密码不同',
                    });
                    return false;
                }
            }else {
                this.setState({
                    passwordError2: '请再次确认密码',
                });
                return false;
            }
        }else {
            this.setState({
                passwordError: '密码需必填',
            });
            return false;
        }
    }


    emailReg(email) {
        let reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
        let res = reg.test(email);
        if(!email) {
            this.setState({
                emailError: '邮箱需必填',
            });
            return false;
        }
        if(!res) {
            this.setState({
                emailError: '邮箱格式不正确',
            });
            return false;
        }else {
            this.setState({
                emailError: '',
            });
            return true;
        }
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="#FFF"
                    barStyle="dark-content"
                />
                <TouchableNativeFeedback
                    background={TouchableNativeFeedback.Ripple('rgba(0, 0, 0, .2)', true)}
                    onPress={() => {navigate('SignIn')}}
                >
                    <Animated.View style={[styles.backArrow, {transform: [{scaleX: this.state.fabScale}, {scaleY: this.state.fabScale}],opacity: this.state.fabScale}]}>
                        <Ionicons name="md-arrow-back" size={24} color="#333"/>
                    </Animated.View>
                </TouchableNativeFeedback>
                <View style={styles.main}>
                    <Animated.View style={[styles.header, {height: this.state.AniHeight}]}>
                        <View style={styles.titleView}>
                            <Text style={styles.title}>注册</Text>
                        </View>
                    </Animated.View>
                    <TextField
                        label='邮箱'
                        value={this.state.email}
                        error={this.state.emailError}
                        lineWidth={1}
                        textColor="#333"
                        baseColor="#666"
                        tintColor="#333"
                        onChangeText={ (email) => this.setState({ email: email }) }
                        onFocus={() => {this.setState({emailError: ''})}}
                    />
                    <View>
                    <TextField
                        label='密码'
                        secureTextEntry={this.state.pwdSecure}
                        lineWidth={1}
                        value={this.state.password}
                        error={this.state.passwordError}
                        textColor="#333"
                        baseColor="#666"
                        tintColor="#333"
                        onChangeText={ (password) => this.setState({ password: password }) }
                        onFocus={() => {this.setState({passwordError: ''})}}
                    />
                    <TouchableNativeFeedback
                        background={TouchableNativeFeedback.Ripple('rgba(0, 0, 0, .2)', true)}
                        onPress={this.pwdSecure.bind(this, 1)}
                    >
                        <View style={styles.eyeWrapper}>
                            <Ionicons style={styles.eye} name={this.state.pwdSecure?'md-eye-off':'md-eye'} size={24} color="#333"/>
                        </View>
                    </TouchableNativeFeedback>
                    </View>
                    <View>
                        <TextField
                            label='确认密码'
                            secureTextEntry={this.state.pwdSecure2}
                            lineWidth={1}
                            value={this.state.password2}
                            error={this.state.passwordError2}
                            textColor="#333"
                            baseColor="#666"
                            tintColor="#333"
                            onChangeText={ (password) => this.setState({ password2: password }) }
                            onFocus={() => {this.setState({passwordError2: ''})}}
                        />
                        <TouchableNativeFeedback
                            background={TouchableNativeFeedback.Ripple('rgba(0, 0, 0, .2)', true)}
                            onPress={this.pwdSecure.bind(this, 2)}
                        >
                            <View style={styles.eyeWrapper}>
                                <Ionicons style={styles.eye} name={this.state.pwdSecure2?'md-eye-off':'md-eye'} size={24} color="#333"/>
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                    <TouchableNativeFeedback
                        background={TouchableNativeFeedback.Ripple('rgba(255, 255, 255, .5)', false)}
                        onPress={this.submit.bind(this)}
                    >
                        <View style={[styles.loginButton, (this.state.email && this.state.password && this.state.password2)?styles.loginButtonActive:{}]}>
                            <Text style={[styles.loginButtonLabel,(this.state.email && this.state.password && this.state.password2)?styles.loginButtonLabelActive:{}]}>注 册</Text>
                        </View>
                    </TouchableNativeFeedback>
                </View>
                {
                    this.state.loading?
                        <View style={styles.loading}>
                            <ProgressBarAndroid
                                color="#4BCCBE"
                                styleAttr="Inverse"
                            />
                        </View>:null
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        flex: 1,
    },
    loading: {
        position: 'absolute',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        left: 0,
        top: 0,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10,
        paddingBottom: 100,
    },
    main: {
        flex: 1,
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 20,
    },
    loginButton: {
        marginTop: 32,
        height: 52,
        backgroundColor: '#333',
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginButtonActive: {
        borderWidth: 0,
        backgroundColor: '#333',
        shadowColor: '#000',
        elevation: 8,
    },
    loginButtonLabel: {
        fontSize: 16,
        color: '#FFF'
    },
    loginButtonLabelActive: {
        color: '#FFF',
    },
    backArrow: {
        width: 50,
        height: 50,
        borderRadius: 25,
        position: 'absolute',
        top: 10,
        left: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottom: {
        width: Dimensions.get('window').width,
        height: 200,
        position: 'absolute',
        left: 0,
        bottom: 0,
    },
    header: {
        justifyContent: 'flex-end',
    },
    titleView: {
        justifyContent: 'flex-end',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    eyeWrapper: {
        width: 32,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        borderRadius: 16,
        right: 0,
        top: 24,
    },
    eye: {
    }
});