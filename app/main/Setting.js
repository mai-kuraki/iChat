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
    TouchableNativeFeedback
} from 'react-native';

export default class Setting extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.listWrap}>
                    <View style={styles.settingItem}>
                        <TouchableNativeFeedback>
                            <View style={styles.row}>
                                <Text style={styles.label}>账号</Text>
                                <View style={styles.info}>
                                    <Text style={styles.infoText}>ID_Uxdispa</Text>
                                </View>
                            </View>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback>
                            <View style={styles.row}>
                                <Text style={styles.label}>邮箱</Text>
                                <View style={styles.info}>
                                    <Text style={styles.infoText}>exp@163.com</Text>
                                </View>
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                    <View style={styles.settingItem}>
                        <TouchableNativeFeedback>
                            <View style={styles.row}>
                                <Text style={styles.label}>消息通知</Text>
                                <View style={styles.info}>
                                    <Text style={styles.infoText}>ID_Uxdispa</Text>
                                </View>
                            </View>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback>
                            <View style={styles.row}>
                                <Text style={styles.label}>聊天记录</Text>
                                <View style={styles.info}>
                                    <Text style={styles.infoText}>exp@163.com</Text>
                                </View>
                            </View>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback>
                            <View style={styles.row}>
                                <Text style={styles.label}>显示设置</Text>
                                <View style={styles.info}>
                                    <Text style={styles.infoText}>exp@163.com</Text>
                                </View>
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                    <View style={styles.settingItem}>
                        <TouchableNativeFeedback>
                            <View style={styles.row}>
                                <Text style={styles.label}>关于 iChat</Text>
                                <View style={styles.info}>
                                    <Text style={styles.infoText}>ID_Uxdispa</Text>
                                </View>
                            </View>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback>
                            <View style={styles.row}>
                                <Text style={styles.label}>检查更新</Text>
                                <View style={styles.info}>
                                    <Text style={styles.infoText}>ID_Uxdispa</Text>
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
        color: '#999',
        fontSize: 16,
    },
    info: {
        flex: 1,
    },
    infoText: {
        flex: 1,
        textAlign: 'right',
        textAlignVertical: 'center',
        fontSize: 16,
        color: '#666'
    }
});