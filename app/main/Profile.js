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
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default class Profile extends Component {
    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        header: null,
    };

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
                            <Text style={styles.nick}>Emily Dove</Text>
                            <Text style={styles.id}>ID_Uxdispa</Text>
                            <Text style={styles.email}>exp@163.com</Text>
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
                                <Feather name="calendar" size={28} color="#333"/>
                                <Text style={styles.buttonLabel}>设置生日</Text>
                            </View>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback>
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