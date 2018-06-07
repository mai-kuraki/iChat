/**
 * Created by zhengliuyang on 2018/5/31.
 */
import React, {Component} from 'react';
import {
    Dimensions,
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableNativeFeedback,
    StatusBar,
    Image,
    TextInput,
    ScrollView,
    AsyncStorage
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import io from '../utils/socket';
import jwtDecode from 'jwt-decode';
import _ from 'underscore';
export default class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: '',
            items: [],
            profile: {},
            fProfile: {},
        }
    }

    componentWillMount() {
        let params = this.props.navigation.state.params;
        this.setState({
            fProfile: params,
        });
        AsyncStorage.getItem('webToken', (error, token) => {
            if(token) {
                let profile = jwtDecode(token);
                this.setState({
                    profile: profile,
                })
            }
        });
        AsyncStorage.getItem(params.uid, (error, item) => {
            if(!item) {
                item = '[]';
            }
            this.setState({
                items: JSON.parse(item),
            })
        });
        io.on('message', (message) => {
            let items = this.state.items;
            if(message.uid != this.state.profile.uid) {
                items.push({
                    key: _.uniqueId('chat_'),
                    message: message.message,
                    self: false,
                });
                this.setState({
                    items: items,
                });
                setTimeout(() => {
                    if(this.refs.scrollView) {
                        this.refs.scrollView.scrollToEnd();
                    }
                })
            }
        });
    }

    static navigationOptions = {
        header: null,
    };

    saveChatRecord() {
        let items = this.state.items || [];
        let fProfile = this.state.fProfile;
        AsyncStorage.setItem(fProfile.uid, JSON.stringify(items));
    }

    updateChatList(msg) {
        AsyncStorage.getItem('chatList', (error, data) => {
            if(!data) {
                data = '[]';
            }
            data = JSON.parse(data);
            let inList = false,
                position = null;
            data.map((d, k) => {
                if(data.id == this.state.fProfile.uid) {
                    inList = true;
                    position = k;
                }
            });
            let items = this.state.items || [];
            let obj = {
                key: this.state.fProfile.uid,
                name: this.state.fProfile.nick,
                time: new Date().getTime(),
                avator: '',
                lastMsg: items[items.length - 1].message,
                unread: 0,
            };
            if(inList) {
                data = data.splice(position, 1);
            }
            data.unshift(obj);
            AsyncStorage.setItem('chatList', JSON.stringify(data));
        });
    }

    submit() {
        let state = this.state;
        let input = state.input;
        let items = state.items;
        items.push({
            key: _.uniqueId('chat_'),
            message: input,
            self: true,
        });
        io.emit('sendMessage', {
            toUid: this.state.fProfile.uid,
            message: input,
        });
        this.setState({
            input: '',
            items: items,
        });
        setTimeout(() => {
            this.refs.scrollView.scrollToEnd();
            this.updateChatList();
            this.saveChatRecord();
        });
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="#FFF"
                    barStyle="dark-content"
                />
                <View style={styles.header}>
                    <TouchableNativeFeedback
                        background={TouchableNativeFeedback.Ripple('rgba(0, 0, 0, .2)', true)}
                        onPress={() => {
                            navigate('Tab')
                        }}
                    >
                        <View style={styles.headerIcon}>
                            <Feather name="chevron-left" size={20} color="#666"/>
                        </View>
                    </TouchableNativeFeedback>
                    <View style={styles.chatTitle}><Text style={styles.chatTitleTxt}>{this.state.fProfile.nick || ''}</Text></View>
                    <View style={styles.headerIcon}>
                    </View>
                </View>
                <View style={styles.chatItem}>
                    <ScrollView ref="scrollView" style={styles.scroll}>
                        {
                            this.state.items.map((data, k) => {
                               if(data.self) {
                                   return (
                                       <View style={styles.mine} key={k}>
                                           <View style={[styles.wrap, styles.wrapRight]}>
                                               <View style={[styles.chatContent, styles.chatContentRight]}>
                                                   <Text style={[styles.chatTxt, styles.chatTxtRight]}>{data.message}</Text>
                                               </View>
                                           </View>
                                           <View style={styles.avator}>
                                               <Image source={require('../images/av2.jpg')} style={styles.avatorPic}/>
                                           </View>
                                       </View>
                                   )
                               } else {
                                   return (
                                       <View style={styles.side} key={k}>
                                           <View style={styles.avator}>
                                               <Image source={require('../images/av1.jpg')} style={styles.avatorPic}/>
                                           </View>
                                           <View style={[styles.wrap, styles.wrapLeft]}>
                                               <View style={[styles.chatContent, styles.chatContentLeft]}>
                                                   <Text style={[styles.chatTxt, styles.chatTxtLeft]}>{data.message}</Text>
                                               </View>
                                           </View>
                                       </View>
                                   )
                               }
                            })
                        }
                        <View style={{height: 50}}></View>
                    </ScrollView>
                </View>
                <View style={styles.bottom}>
                    <TouchableNativeFeedback
                        background={TouchableNativeFeedback.Ripple('rgba(0, 0, 0, .2)', true)}
                    >
                        <View style={styles.headerIcon}>
                            <Entypo name="emoji-flirt" size={20} color="#666"/>
                        </View>
                    </TouchableNativeFeedback>
                    <View style={styles.bottomInput}>
                        <TextInput
                            value={this.state.input}
                            onChangeText={(text) => {
                                this.setState({
                                    input: text,
                                })
                            }}
                            onSubmitEditing={this.submit.bind(this)}
                        />
                    </View>
                    <TouchableNativeFeedback
                        background={TouchableNativeFeedback.Ripple('rgba(0, 0, 0, .2)', true)}
                    >
                        <View style={styles.headerIcon}>
                            <Feather name="image" size={20} color="#666"/>
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
        backgroundColor: '#F9FAFC',
    },
    side: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 5,
        marginBottom: 5,
    },
    chatTitle: {
        flex: 1,
        justifyContent: 'center',
    },
    chatTitleTxt: {
        fontSize: 16,
        color: '#333',
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    wrap: {
    },
    wrapLeft: {
        paddingRight: 120,
    },
    wrapRight: {
        paddingLeft: 120,
    },
    avator: {
        width: 34,
        height: 34,
    },
    avatorPic: {
        width: 34,
        height: 34,
        borderRadius: 17,
    },
    chatContent: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 16,
        paddingRight: 16,
        borderRadius: 18,
        flexWrap: 'wrap',
        marginTop: 18,
    },
    chatContentLeft: {
        backgroundColor: '#3B414A',
        marginLeft: 16,
        paddingRight: 20,
        borderTopLeftRadius: 0,
    },
    chatContentRight: {
        backgroundColor: '#FFF',
        marginRight: 16,
        paddingLeft: 20,
        borderTopRightRadius: 0,
    },
    chatTxt: {
        fontSize: 14,
        lineHeight: 24
    },
    mine: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 10,
        marginBottom: 5,
    },
    chatTxtLeft: {
        color: '#FFF'
    },
    chatTxtRight: {
        color: '#333'
    },
    header: {
        height: 52,
        backgroundColor: '#FFF',
        shadowColor: '#000',
        flexDirection: 'row',
        elevation: 3,
    },
    headerIcon: {
        width: 52,
        height: 52,
        justifyContent: 'center',
        alignItems: 'center',
    },
    chatItem: {
        flex: 1,
    },
    bottom: {
        height: 50,
        backgroundColor: '#FFF',
        shadowColor: '#000',
        flexDirection: 'row',
        elevation: 8,
    },
    bottomInput: {
        flex: 1,
    },
    scroll: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 20,
    }
});