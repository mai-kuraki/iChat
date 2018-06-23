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
    AsyncStorage,
    Modal,
    Button,
    DatePickerAndroid,
    ProgressBarAndroid,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Snackbar from 'react-native-snackbar';
import config from '../config';
import request from '../utils/request';
import { TextField } from 'react-native-material-textfield';
import { TextButton } from 'react-native-material-buttons';
import ImagePicker from 'react-native-image-crop-picker';
import jwtDecode from 'jwt-decode';
const api = config.api;
const staticHost = config.staticHost;
const sexData = [
    {
        key: 0,
        label: '保密',
    },
    {
        key: 1,
        label: '男',
    },
    {
        key: 2,
        label: '女',
    }
];

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: {},
            emailEdit: false,
            nickEdit: false,
            sexEdit: false,
            nickTemp: '',
            nickError: '',
            sexTemp: 0,
            emailTemp: '',
            emailError: '',
            birthdayTemp: null,
            loading: false,
            confirmLoading: false,
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
                this.props.close(false);
                navigate('SignIn');
            }
        });
    }

    nickEditDialogOpen() {
        let profile = this.state.profile;
        this.setState({
            nickEdit: true,
            nickTemp: profile.nick,
            nickError: '',
        });
        setTimeout(() => {
            this.refs.nickEdit.focus();
        })
    }

    emailEditDialogOpen() {
        let profile = this.state.profile;
        this.setState({
            emailEdit: true,
            emailTemp: profile.email,
        });
        setTimeout(() => {
            this.refs.emailEdit.focus();
        })
    }

    sexEditDialogOpen() {
        this.setState({
            sexEdit: true,
            sexTemp: this.state.profile.sex,
        });
    }

    nickEditDialogClose() {
        this.setState({nickEdit: false});
    }

    emailEditDialogClose(e) {
        console.log(e.target)
        this.setState({emailEdit: false});
    }

    sexEditDialogClose() {
        this.setState({sexEdit: false});
    }

    sexEditDialogConfirm() {
        this.updateProfile('sex');
        this.sexEditDialogClose();
    }

    nickEditDialogConfirm() {
        if(this.state.nickTemp) {
            this.nickEditDialogClose();
            this.updateProfile('nick');
        }else {
            this.setState({
                nickError: '请输入昵称',
            });
        }
    }

    emailEditDialogConfirm() {
        if(this.state.emailTemp) {
            this.emailEditDialogClose();
            this.updateProfile('email');
        }else {
            this.setState({
                emailError: '请输入邮箱',
            })
        }
    }

    async openDatePicker() {
        try {
            const {action, year, month, day} = await DatePickerAndroid.open({
                date: new Date()
            });
            if(action === DatePickerAndroid.dismissedAction){
            }else{
                let date = new Date(year,month,day);
                this.setState({
                    birthdayTemp: date,
                });
                setTimeout(() => {
                    this.updateProfile('birthday');
                })
            }
        } catch ({code, message}) {
            console.warn('Cannot open date picker', message);
        }
    }

    cropPickAvator() {
        ImagePicker.openPicker({
            width: 300,
            height: 300,
            cropping: true
        }).then(image => {
            console.log(image);
            if(image.path) {
                this.uploadAvator(image.path);
            }
        });
    }

    uploadAvator(path) {
        let formData = new FormData();
        let file = {
            uri: path,
            type: 'image/jpg',
            name: 'avator.jpg'
        };
        formData.append("file", file);
        request(`${api}/user/upload`, 'POST', formData, {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
        }).then((data) => {
            console.log(this.state.profile)
            if(data.code == 200) {
                let profile = this.state.profile;
                profile.avator = `${staticHost}${data.path}`;
                this.setState({
                    profile: profile,
                });
                Snackbar.show({
                    title: '头像改成功',
                    duration: 1500,
                });
            }
        });
    }

    updateProfile(key) {
        let data = {};
        data[key] = this.state[`${key}Temp`];
        console.log(data);
    }

    render() {
        const {
            profile,
            nickEdit,
            loading,
            nickTemp,
            sexTemp,
            confirmLoading,
            sexEdit,
            emailEdit,
            emailTemp,
            nickError,
            emailError
        } = this.state;
        let avator = require('../images/defaultAv2.jpg');
        if(profile.sex == 2) {
            avator = require('../images/defaultAv.jpg');
        }
        if(profile.avator) {
            avator = {uri: `${staticHost}${profile.avator}`};
        }
        return (
            <View style={styles.container}>
                <Modal
                    visible={nickEdit}
                    animationType='fade'
                    transparent={true}
                    onRequestClose={this.nickEditDialogClose.bind(this)}
                >
                    <TouchableWithoutFeedback onPress={this.nickEditDialogClose.bind(this)}>
                    <View style={styles.dialogBg}>
                        <View style={styles.dialog}>
                            <TextField
                                ref="nickEdit"
                                label='昵称'
                                lineWidth={1}
                                value={nickTemp}
                                error={nickError}
                                textColor="#333"
                                baseColor="#666"
                                tintColor="#333"
                                onChangeText={ (text) => this.setState({ nickTemp: text }) }
                            />
                            <View style={styles.actionButtons}>
                                <TextButton titleColor='#148D80' title='取消' titleStyle={{fontWeight: 'normal'}} onPress={this.nickEditDialogClose.bind(this)}/>
                                <TextButton
                                    style={{marginLeft: 8 }}
                                    titleColor='#148D80'
                                    titleStyle={{fontWeight: 'normal'}}
                                    title='确认'
                                    disabled={confirmLoading}
                                    onPress={this.nickEditDialogConfirm.bind(this)}
                                />
                            </View>
                        </View>
                    </View>
                        </TouchableWithoutFeedback>
                </Modal>
                <Modal
                    visible={emailEdit}
                    animationType='fade'
                    transparent={true}
                    onRequestClose={this.emailEditDialogClose.bind(this)}
                >
                    <TouchableWithoutFeedback onPress={this.emailEditDialogClose.bind(this)}>
                        <View style={styles.dialogBg}>
                            <View style={styles.dialog} ref="emailPanel">
                                <TextField
                                    ref="emailEdit"
                                    label='邮箱'
                                    lineWidth={1}
                                    value={emailTemp}
                                    error={emailError}
                                    textColor="#333"
                                    baseColor="#666"
                                    tintColor="#333"
                                    onChangeText={ (text) => this.setState({ emailTemp: text }) }
                                />
                                <View style={styles.actionButtons}>
                                    <TextButton titleColor='#148D80' title='取消' titleStyle={{fontWeight: 'normal'}} onPress={this.nickEditDialogClose.bind(this)}/>
                                    <TextButton
                                        style={{marginLeft: 8 }}
                                        titleColor='#148D80'
                                        titleStyle={{fontWeight: 'normal'}}
                                        title='确认'
                                        disabled={confirmLoading}
                                        onPress={this.emailEditDialogConfirm.bind(this)}
                                    />
                                </View>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
                <Modal
                    visible={sexEdit}
                    transparent={true}
                    onRequestClose={this.sexEditDialogClose.bind(this)}
                >
                    <TouchableWithoutFeedback onPress={this.sexEditDialogClose.bind(this)}>
                    <View style={styles.dialogBg}>
                        <View style={styles.selectdialog}>
                            {
                                sexData.map((data, k) => {
                                    return (
                                        <TouchableNativeFeedback key={k}
                                            onPress={() => {
                                                this.setState({
                                                    sexTemp: data.key,
                                                });
                                                setTimeout(() => {
                                                    this.sexEditDialogConfirm();
                                                }, 250);
                                            }}
                                        >
                                            <View style={styles.sexSelect}>
                                                <MaterialIcons name={sexTemp == data.key?'radio-button-checked':'radio-button-unchecked'} size={20} color={sexTemp == data.key?'#148D80':'#333'}/>
                                                <Text style={[styles.selectLabel, (sexTemp == data.key?styles.selectLabelCur:{})]}>{data.label}</Text></View>
                                        </TouchableNativeFeedback>
                                    )
                                })
                            }
                        </View>
                    </View>
                    </TouchableWithoutFeedback>
                </Modal>
                <ScrollView style={styles.listWrap}>
                    <View style={styles.avatorWrap}>
                        <TouchableNativeFeedback
                            background={TouchableNativeFeedback.Ripple('rgba(0, 0, 0, .2)', true)}
                        >
                            <View style={styles.avator}>
                                <Image source={avator} style={styles.avImg}/>
                                <View style={styles.editAv}>
                                    <FontAwesome name="mars" size={14} color="#666"/>
                                </View>
                            </View>
                        </TouchableNativeFeedback>
                        <View style={styles.info}>
                            <Text style={styles.nick}>{profile.nick || ''}</Text>
                            <Text style={styles.id}>{(profile.uid || '').substr(0, 12) }</Text>
                            <Text style={styles.email}>{profile.email || ''}</Text>
                        </View>
                    </View>
                    <View style={styles.buttonItem}>
                        <TouchableNativeFeedback
                            onPress={this.cropPickAvator.bind(this)}
                        >
                            <View style={styles.button}>
                                <Feather name="image" size={28} color="#333"/>
                                <Text style={styles.buttonLabel}>修改头像</Text>
                            </View>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback
                            onPress={this.nickEditDialogOpen.bind(this)}
                        >
                            <View style={styles.button}>
                                <Feather name="gitlab" size={28} color="#333"/>
                                <Text style={styles.buttonLabel}>修改昵称</Text>
                            </View>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback
                            onPress={this.sexEditDialogOpen.bind(this)}
                        >
                            <View style={styles.button}>
                                <FontAwesome name="transgender" size={28} color="#333"/>
                                <Text style={styles.buttonLabel}>设置性别</Text>
                            </View>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback
                            onPress={this.openDatePicker.bind(this)}
                        >
                            <View style={styles.button}>
                                <Feather name="calendar" size={28} color="#333"/>
                                <Text style={styles.buttonLabel}>设置生日</Text>
                            </View>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback
                            onPress={this.emailEditDialogOpen.bind(this)}
                        >
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
                {
                    loading?
                        <View style={styles.loading}>
                            <ProgressBarAndroid
                                color="#169588"
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
    dialogBg: {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'rgba(0, 0, 0, 0.55)'
    },
    dialog: {
        width: Dimensions.get('window').width - 60,
        backgroundColor: '#FFF',
        borderRadius: 3,
        elevation: 50,
        paddingLeft: 24,
        paddingRight: 24,
        paddingBottom: 15,
        paddingTop: 15,
    },
    selectdialog: {
        width: Dimensions.get('window').width - 60,
        backgroundColor: '#FFF',
        borderRadius: 3,
        elevation: 50,
        paddingTop: 10,
        paddingBottom: 10,
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 24,
    },
    actionbtn: {
        paddingLeft: 16,
        paddingRight: 16,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    cancel: {
    },
    confirm: {
        marginLeft: 8,
    },
    cancelLabel: {
        color: '#148D80',
        fontSize: 14.5,
    },
    confirmLabel: {
        color: '#148D80',
        fontSize: 14.5,
    },
    loading: {
        position: 'absolute',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        left: 0,
        top: 0,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 100,
        paddingBottom: 100,
    },
    sexSelect: {
        width: '100%',
        height: 50,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingLeft: 16,
    },
    selectLabel: {
        color: '#333',
        fontSize: 16,
        marginLeft: 10,
    },
    selectLabelCur: {
        color: '#148D80',
    }
});
