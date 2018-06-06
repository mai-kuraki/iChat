/**
 * Created by zhengliuyang on 2018/5/30.
 */
import React, {Component} from 'react';
import {
    Dimensions,
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableNativeFeedback,
    Image
} from 'react-native';

export default class MsgList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: [
                {
                    key: '0',
                    avator: require('../images/av4.jpg'),
                    name: 'Emly Dove',
                    time: '09:13 AM',
                    msg: 'More complex, multi-select example demonstrating PureComponent usage for perf optimization and avoiding bugs.',
                    unread: 2,
                },
                {
                    key: '1',
                    avator: require('../images/av3.jpg'),
                    name: 'Ramin Nasibow',
                    time: '11:24 AM',
                    msg: 'nternal state is not preserved when content scrolls out of the render window.',
                    unread: 10,
                },
                {
                    key: '2',
                    avator: require('../images/av1.jpg'),
                    name: 'Emly Dove',
                    time: '09:13 AM',
                    msg: 'More complex, multi-select example demonstrating PureComponent usage for perf optimization and avoiding bugs.',
                    unread: 0,
                },
                {
                    key: '3',
                    avator: require('../images/av2.jpg'),
                    name: 'Ramin Nasibow',
                    time: '11:24 AM',
                    msg: 'nternal state is not preserved when content scrolls out of the render window.',
                    unread: 18,
                },
                {
                    key: '4',
                    avator: require('../images/av5.jpg'),
                    name: 'Emly Dove',
                    time: '09:13 AM',
                    msg: 'More complex, multi-select example demonstrating PureComponent usage for perf optimization and avoiding bugs.',
                    unread: 0,
                },
                {
                    key: '5',
                    avator: require('../images/av6.jpg'),
                    name: 'Ramin Nasibow',
                    time: '11:24 AM',
                    msg: 'nternal state is not preserved when content scrolls out of the render window.',
                    unread: 0,
                },
                {
                    key: '6',
                    avator: require('../images/av3.jpg'),
                    name: 'Emly Dove',
                    time: '09:13 AM',
                    msg: 'More complex, multi-select example demonstrating PureComponent usage for perf optimization and avoiding bugs.',
                    unread: 0,
                },
                {
                    key: '7',
                    avator: require('../images/av5.jpg'),
                    name: 'Ramin Nasibow',
                    time: '11:24 AM',
                    msg: 'nternal state is not preserved when content scrolls out of the render window.',
                    unread: 0,
                },
                {
                    key: '8',
                    avator: require('../images/av1.jpg'),
                    name: 'Emly Dove',
                    time: '09:13 AM',
                    msg: 'More complex, multi-select example demonstrating PureComponent usage for perf optimization and avoiding bugs.',
                    unread: 0,
                },
                {
                    key: '9',
                    avator: require('../images/av6.jpg'),
                    name: 'Ramin Nasibow',
                    time: '11:24 AM',
                    msg: 'nternal state is not preserved when content scrolls out of the render window.',
                    unread: 0,
                },
            ]
        }
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.item}
                    renderItem={({item}) =>
                        <TouchableNativeFeedback>
                            <View style={styles.row}>
                                <View style={styles.avator}>
                                    <Image source={item.avator} style={styles.avatorPic}/>
                                </View>
                                <View style={styles.detail}>
                                    <View style={styles.nameRow}>
                                        <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
                                        <Text style={styles.time}>{item.time}</Text>
                                    </View>
                                    <View style={styles.msg}>
                                        <Text style={styles.msgText} numberOfLines={1}>{item.msg}</Text>
                                        <View style={styles.unread}>
                                            {
                                                item.unread?
                                                    <Text style={styles.unreadText}>{item.unread}</Text>:null
                                            }
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </TouchableNativeFeedback>
                    }
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    row:{
        height: 80,
        backgroundColor: '#FFF',
        paddingLeft: 30,
        paddingRight: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    avator: {
        width: 36,
        height: 80,
        paddingTop: 14,
    },
    avatorPic: {
        width: 36,
        height: 36,
        borderRadius: 18,
    },
    detail: {
        flex: 1,
        paddingLeft: 15,
    },
    nameRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 10,
    },
    name: {
        fontSize: 16,
        color: '#333',
        fontWeight: 'bold',
        flex: 1,
    },
    time: {
        width: 100,
        fontSize: 12,
        color: '#DDD',
        textAlign: 'right'
    },
    msg: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 6,
    },
    msgText: {
        height: 18,
        flex: 1,
        fontSize: 13,
        color: '#BBB',
        textAlignVertical: 'center',
    },
    unread: {
        width: 60,
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingLeft: 15,
    },
    unreadText: {
        height: 18,
        backgroundColor: '#4BCCBE',
        fontSize: 10,
        borderRadius: 9,
        paddingLeft: 6,
        paddingRight: 6,
        color: '#FFF',
        textAlignVertical: 'center',
    }
});