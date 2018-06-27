/**
 * Created by zhengliuyang on 2018/5/30.
 */
import React, {Component} from 'react';
import {
    Dimensions,
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableNativeFeedback,
    Switch
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import jwtDecode from 'jwt-decode';
import store from '../store';
import moment from 'moment';
const sexMap = ['保密', '男', '女'];
export default class Setting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            noticePush: true,
        }
    }


    render() {
        const profile = store.getState().app.profile;
        return (
            <View style={styles.container}>
                <ScrollView style={styles.listWrap}>
                    <View style={styles.settingItem}>
                        <View style={styles.row}>
                            <View style={styles.label}>
                                <Feather name="bookmark" size={20} color="#333"/>
                                <Text style={styles.labelText}>账号</Text>
                            </View>
                            <View style={styles.info}>
                                <Text style={styles.infoText}>{profile.uid || ''}</Text>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.label}>
                                <Feather name="at-sign" size={20} color="#333"/>
                                <Text style={styles.labelText}>邮箱</Text>
                            </View>
                            <View style={styles.info}>
                                <Text style={styles.infoText}>{profile.email || ''}</Text>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.label}>
                                <FontAwesome name="transgender" size={20} color="#333"/>
                                <Text style={styles.labelText}>性别</Text>
                            </View>
                            <View style={styles.info}>
                                <Text style={styles.infoText}>{sexMap[profile.sex]}</Text>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.label}>
                                <Feather name="calendar" size={20} color="#333"/>
                                <Text style={styles.labelText}>生日</Text>
                            </View>
                            <View style={styles.info}>
                                <Text style={styles.infoText}>{profile.birthday?moment(profile.birthday).format('YYYY-MM-DD'):'未知'}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.settingItem}>
                        <View style={styles.row}>
                            <View style={styles.label}>
                                <Feather name="message-square" size={20} color="#333"/>
                                <Text style={styles.labelText}>信息通知</Text>
                            </View>
                            <View style={styles.todo}>
                                <Switch
                                    value={this.state.noticePush}
                                    onTintColor="#4BCCBE"
                                    onValueChange={(value) => {
                                        this.setState({
                                            noticePush: value,
                                        })
                                    }}
                                />
                            </View>
                        </View>
                        <TouchableNativeFeedback>
                            <View style={styles.row}>
                                <View style={styles.label}>
                                    <Feather name="clipboard" size={20} color="#333"/>
                                    <Text style={styles.labelText}>聊天记录</Text>
                                </View>
                                <View style={styles.todo}>
                                    <Feather name="chevron-right" size={20} color="#DDD"/>
                                </View>
                            </View>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback>
                            <View style={styles.row}>
                                <View style={styles.label}>
                                    <Feather name="airplay" size={20} color="#333"/>
                                    <Text style={styles.labelText}>显示设置</Text>
                                </View>
                                <View style={styles.todo}>
                                    <Feather name="chevron-right" size={20} color="#DDD"/>
                                </View>
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                    <View style={styles.settingItem}>
                        <TouchableNativeFeedback>
                            <View style={styles.row}>
                                <View style={styles.label}>
                                    <Feather name="target" size={20} color="#333"/>
                                    <Text style={styles.labelText}>关于iChat</Text>
                                </View>
                                <View style={styles.todo}>
                                    <Feather name="chevron-right" size={20} color="#DDD"/>
                                </View>
                            </View>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback>
                            <View style={styles.row}>
                                <View style={styles.label}>
                                    <Feather name="trending-up" size={20} color="#333"/>
                                    <Text style={styles.labelText}>检查更新</Text>
                                </View>
                                <View style={styles.todo}>
                                    <Feather name="chevron-right" size={20} color="#DDD"/>
                                </View>
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                </ScrollView>
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
    settingItem: {
        backgroundColor: '#FFF',
        marginBottom: 40,
    },
    row: {
        height: 60,
        paddingLeft: 30,
        paddingRight: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    label: {
        width: 100,
        flexDirection: 'row',
        alignItems: 'center',
    },
    labelText: {
        color: '#333',
        fontSize: 16,
        marginLeft: 12,
    },
    info: {
        flex: 1,
    },
    todo: {
        flex: 1,
        alignItems: 'flex-end',
    },
    infoText: {
        flex: 1,
        textAlign: 'right',
        textAlignVertical: 'center',
        fontSize: 16,
        color: '#666'
    }
});