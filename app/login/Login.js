/**
 * Created by zhengliuyang on 2018/5/29.
 */
import React, {Component} from 'react';
import {
    Dimensions,
    StyleSheet,
    Text,
    View,
    ART,
    Animated,
    StatusBar,
    TouchableWithoutFeedback,
    TouchableNativeFeedback,
    Keyboard,
} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const {Surface, Shape, Path} = ART;

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
            keyborder: false,
            email: '',
            password: '',
            fabScale: new Animated.Value(1),
            AniHeight: new Animated.Value(60),
        };
    }

    componentDidMount() {
        Keyboard.addListener('keyboardDidShow', this.keyboardWillShow.bind(this));
        Keyboard.addListener('keyboardDidHide', this.keyboardWillHide.bind(this));
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
                toValue: 0,
                duration: 450,
            }
        ).start();
        this.setState({
            keyborder: true,
        })
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
                toValue: 60,
                duration: 450,
            }
        ).start();
        this.setState({
            keyborder: false,
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="#2A3A6C"
                    barStyle="light-content"
                />
                <TouchableWithoutFeedback>
                    <Animated.View style={[styles.floating, {transform: [{scaleX: this.state.fabScale}, {scaleY: this.state.fabScale}],opacity: this.state.fabScale}]}>
                        <Ionicons name="md-add" size={24} color="#FFF"/>
                    </Animated.View>
                </TouchableWithoutFeedback>
                <View style={styles.main}>
                    <View style={styles.header}>
                        <Animated.View style={[styles.logo, {}]}>
                            <MaterialCommunityIcons name="facebook-messenger" color="#FFF" size={60}/>
                        </Animated.View>
                        <View style={styles.titleView}>
                            <Text style={styles.title}>SING IN</Text>
                        </View>
                    </View>
                    <TextField
                        label='Email'
                        value={this.state.email}
                        lineWidth={1}
                        textColor="#FFF"
                        baseColor="#EAEAEA"
                        tintColor="#FFF"
                        onChangeText={ (email) => this.setState({ email: email }) }
                    />
                    <TextField
                        label='Password'
                        secureTextEntry={true}
                        lineWidth={1}
                        textColor="#FFF"
                        value={this.state.password}
                        baseColor="#EAEAEA"
                        tintColor="#FFF"
                        onChangeText={ (password) => this.setState({ password: password }) }
                    />
                    <TouchableNativeFeedback>
                        <View style={[styles.loginButton, (this.state.email && this.state.password)?styles.loginButtonActive:{}]}>
                            <Text style={[styles.loginButtonLabel,(this.state.email && this.state.password)?styles.loginButtonLabelActive:{}]}>SING IN</Text>
                        </View>
                    </TouchableNativeFeedback>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#2A3A6C',
        flex: 1,
    },
    main: {
        flex: 1,
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 20,
    },
    loginButton: {
        marginTop: 32,
        borderWidth: 1,
        borderColor: '#FFF',
        height: 52,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginButtonActive: {
        borderWidth: 0,
        backgroundColor: '#FFF',
        shadowColor: '#000',
        elevation: 8,
    },
    loginButtonLabel: {
        fontSize: 16,
        color: '#FFF'
    },
    loginButtonLabelActive: {
        color: '#2A3A6C',
    },
    floating: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#D80D50',
        position: 'absolute',
        bottom: 50,
        right: 30,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        elevation: 5,
    },
    bottom: {
        width: Dimensions.get('window').width,
        height: 200,
        position: 'absolute',
        left: 0,
        bottom: 0,
    },
    header: {
        paddingTop: 40,
        paddingBottom: 30,
        justifyContent: 'flex-end',
    },
    logo: {
        flex: 1,
        alignItems: 'center',
    },
    titleView: {
        flex: 1,
        marginTop: 70,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFF',
    }
});