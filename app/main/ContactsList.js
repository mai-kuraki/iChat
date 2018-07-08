/**
 * Created by zhengliuyang on 2018/5/30.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableNativeFeedback,
    SectionList,
    Image,
    RefreshControl,
    AsyncStorage
} from 'react-native';
import config from '../config';
import Feather from 'react-native-vector-icons/Feather';
import request from '../utils/request';
const api = config.api;

export default class ContactsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRefreshing: false,
            item: [],
            notice: [],
        };
        this.request = request(this);
    }

    componentWillMount() {
        this.getNoticeCache();
        this.refreshItem();
    }

    refreshItem() {
        this.getNotice();
        this.getFriend();
    }

    setNoticeCache(notice) {
        AsyncStorage.setItem('newFriendNotice', JSON.stringify(notice));
    }

    getNoticeCache() {
        AsyncStorage.getItem('newFriendNotice', (error, data) => {
            data = JSON.parse(data || '[]');
            this.setState({
                notice: data,
            });
        });
    }

    getNotice() {
        this.request(`${api}/user/notice`, 'GET').then((data) => {
            if(data.code == 200) {
                let notice = this.state.notice;
                notice = (data.data || []).concat(notice);
                this.setState({
                    notice: notice,
                });
                this.setNoticeCache(notice);
            }
        })
    }

    getFriend() {
        this.request(`${api}/user/all`, 'GET').then((data) => {
            if(data.code == 200) {
                let item = data.data || [];
                item.map((d, j) => {
                    d.key = j;
                });
                this.setState({
                    item: [{
                        key: 'ALL',
                        data: item,
                    }],
                })
            }
        })
    }

    getNoticeUnread() {
        let notice = this.state.notice;
        let f = 0;
        notice.map((data) => {
            if(data.type === 1) {
                f++;
            }
        });
        return f;
    }

    setRead() {
        // AsyncStorage.setItem('newFriendNotice', JSON.stringify([]));
    }

    render() {
        const {navigate} = this.props.navigation;
        const unread = this.getNoticeUnread();
        return (
            <View style={styles.container}>
                <TouchableNativeFeedback
                    onPress={() => {
                        this.setRead();
                        navigate('HandleFriendNotice');
                    }}
                >
                    <View style={styles.nrow}>
                        <Feather name="bell" size={20} color="#333"/>
                        <Text style={styles.name}>新的朋友</Text>
                        {
                            unread > 0?
                                <View style={styles.unread}>
                                    <Text style={styles.unreadText}>{unread > 99?'99+':unread}</Text>
                                </View>:null
                        }
                    </View>
                </TouchableNativeFeedback>
                <SectionList
                    sections={this.state.item}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this.refreshItem.bind(this)}
                            colors={['#999', '#666', '#333']}
                            progressBackgroundColor="#FFF"
                        />
                    }
                    renderSectionHeader={({section, k}) => {
                        if(section.key) {
                            return (
                                <View style={styles.header} key={k}>
                                    <Text style={styles.headerTxt}>{section.key}</Text>
                                </View>
                            )
                        }else {
                            return null
                        }
                    }}
                    renderItem={({item, k}) => {
                        return (
                            <TouchableNativeFeedback
                                onPress={() => {
                                    navigate('Chat', item);
                                }}
                            >
                                <View style={styles.row} key={k}>
                                    <Image source={item.avator || require('../images/av1.jpg')} style={styles.avator}/>
                                    <Text style={styles.name}>{item.nick}</Text>
                                </View>
                            </TouchableNativeFeedback>
                        )
                    }}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        height: 40,
        justifyContent: 'center',
        paddingLeft: 30,
    },
    headerTxt: {
        fontSize: 14,
        justifyContent: 'center',
        color: '#BBB',
    },
    row: {
        height: 60,
        backgroundColor: '#FFF',
        padding: 5,
        paddingLeft: 30,
        paddingRight: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    nrow: {
        height: 60,
        backgroundColor: '#FFF',
        padding: 5,
        paddingLeft: 30,
        paddingRight: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    avator: {
        width: 36,
        height: 36,
        borderRadius: 18,
    },
    name: {
        fontSize: 16,
        color: '#666',
        paddingLeft: 15
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