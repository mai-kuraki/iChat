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
    Image,
    AsyncStorage,
    RefreshControl
} from 'react-native';
import moment from 'moment';
export default class MsgList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRefreshing: false,
            item: []
        }
    }

    componentWillMount() {
        this.refreshItem();
    }

    refreshItem() {
        AsyncStorage.getItem('chatList', (err, data) => {
            data = JSON.parse(data || '[]');
            this.setState({
                item: data,
            })
        })
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.item}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this.refreshItem.bind(this)}
                            colors={['#999', '#666', '#333']}
                            progressBackgroundColor="#FFF"
                        />
                    }
                    renderItem={({item}) =>
                        <TouchableNativeFeedback
                            onPress={() => {
                                navigate('Chat', {
                                    uid: item.key,
                                    nick: item.name,
                                });
                            }}
                        >
                            <View style={styles.row}>
                                <View style={styles.avator}>
                                    <Image source={item.avator || require('../images/av4.jpg')} style={styles.avatorPic}/>
                                </View>
                                <View style={styles.detail}>
                                    <View style={styles.nameRow}>
                                        <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
                                        <Text style={styles.time}>{moment(item.time).format('h:mm A')}</Text>
                                    </View>
                                    <View style={styles.msg}>
                                        <Text style={styles.msgText} numberOfLines={1}>{item.lastMsg}</Text>
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
        backgroundColor: '#169588',
        fontSize: 10,
        borderRadius: 9,
        paddingLeft: 6,
        paddingRight: 6,
        color: '#FFF',
        textAlignVertical: 'center',
    }
});