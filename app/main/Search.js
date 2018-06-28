/**
 * Created by zhengliuyang on 2018/6/28.
 */
import React, {Component} from 'react';
import {
    Dimensions,
    StyleSheet,
    Text,
    View,
    TextInput,
    StatusBar,
    ScrollView,
    TouchableNativeFeedback,
    Image,
    ProgressBarAndroid,
    Modal,
    TouchableWithoutFeedback
} from 'react-native';
import request from '../utils/request';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Snackbar from 'react-native-snackbar';
import UserCard from './UserCard';
import config from '../config';
const api = config.api;
const staticHost = config.staticHost;
export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: '',
            resItem: [],
            loading: false,
            cardVisible: false,
            activeId: null,
        };
        this.request = request(this);
    }

    static navigationOptions = {
        header: null,
    };

    init() {
        this.setState({
            keyword: '',
            resItem: [],
            activeId: null,
        })
    }

    search() {
        let keyword = this.state.keyword;
        if(!keyword) {
            return this.setState({
                resItem: [],
            })
        }
        this.setState({
            loading: true,
        });
        this.request(`${api}/user/search?q=${keyword}`, 'GET').then((data) => {
            if(data.code == 200) {
                let item = data.data || [];
                item.map((d, j) => {
                    d.key = j;
                });
                this.setState({
                    resItem: item,
                })
            }else {
                Snackbar.show({
                    title: `搜索失败, ${data.msg}`,
                    duration: 1500,
                });
            }
            this.setState({
                loading: false,
            });
        }).catch(e => {
            this.setState({
                loading: false,
            });
        });
    }

    cardClose() {
        this.setState({
            cardVisible: false,
        })
    }

    cardOpen(id) {
        this.setState({
            cardVisible: true,
            activeId: id,
        })
    }

    render() {
        const {navigate} = this.props.navigation;
        const {keyword, resItem, loading, cardVisible, activeId} = this.state;
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="#FFF"
                    barStyle="dark-content"
                />
                <Modal
                    visible={cardVisible}
                    animationType='fade'
                    transparent={true}
                    onRequestClose={this.cardClose.bind(this)}
                >
                    <View style={styles.modalBg}>
                        <UserCard
                            uid={activeId}
                            close={this.cardClose.bind(this)}
                        />
                    </View>
                </Modal>
                <View style={styles.header}>
                    <TouchableNativeFeedback
                        background={TouchableNativeFeedback.Ripple('rgba(0, 0, 0, .2)', true)}
                        onPress={() => {
                            this.init();
                            navigate('Main');
                        }}
                    >
                        <View style={styles.headerIcon}>
                            <Feather name="arrow-left" size={20} color="#666"/>
                        </View>
                    </TouchableNativeFeedback>
                    <View style={styles.viewInput}>
                        <TextInput
                            autoFocus={true}
                            placeholder="邮箱/ID"
                            style={styles.input}
                            value={keyword}
                            onChangeText={(value) => {
                                this.setState({
                                    keyword: value,
                                });
                                setTimeout(() => {
                                    this.search();
                                });
                            }}
                            onSubmitEditing={this.search.bind(this)}
                        />
                        {
                            loading?
                                <ProgressBarAndroid
                                    style={styles.loading}
                                    color="#169588"
                                    styleAttr="Small"
                                />:null
                        }
                    </View>
                </View>
                <ScrollView style={styles.list}>
                    {
                        resItem.map((data, k) => {
                            let avator = require('../images/defaultAv2.jpg');
                            if(data.sex == 2) {
                                avator = require('../images/defaultAv.jpg');
                            }
                            if(data.avator) {
                                avator = {uri: `${staticHost}${data.avator}`};
                            }
                            return (
                                <TouchableNativeFeedback
                                    key={k}
                                    onPress={this.cardOpen.bind(this, data.uid)}
                                >
                                    <View style={styles.row} key={k}>
                                        <Image source={avator} style={styles.avator}/>
                                        <View style={styles.info}>
                                            <View style={styles.nw}>
                                                <Text style={styles.name}>{data.nick}</Text>
                                                <View style={[styles.sex, {backgroundColor: data.sex == 2?'#E97971':'#148D80'}]}>
                                                    <FontAwesome name={data.sex == 0?'intersex':(data.sex == 1?'mars':'venus')} size={10} color="#FFF"/>
                                                </View>
                                            </View>
                                            <Text style={styles.email}>{data.email}</Text>
                                        </View>
                                    </View>
                                </TouchableNativeFeedback>
                            )
                        })
                    }
                    {
                        resItem.length == 0 && keyword?
                            <View style={styles.empty}>
                                <Image source={require('../images/empty.png')} style={styles.emptyIcon}/>
                                <Text style={styles.emptyLabel}>没有符合的用户</Text>
                            </View>:null
                    }
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    modalBg: {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'rgba(0, 0, 0, 0.55)'
    },
    empty: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 200,
    },
    emptyIcon: {
        width: 45,
        height: 45,
    },
    emptyLabel: {
        color: '#DDD',
        fontSize: 16,
    },
    header: {
        height: 52,
        backgroundColor: '#FFF',
        flexDirection: 'row',
    },
    list: {
        flex: 1,
        paddingTop: 25,
    },
    headerIcon: {
        width: 52,
        height: 52,
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewInput: {
        flex: 1,
        height: 52,
        paddingRight: 20,
    },
    input: {
        flex: 1,
        paddingRight: 36,
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
    avator: {
        width: 36,
        height: 36,
        borderRadius: 18,
    },
    info: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        color: '#666',
    },
    email: {
        color: '#999',
        paddingLeft: 15,
        fontSize: 14,
    },
    nw: {
        flexDirection: 'row',
        paddingLeft: 15,
        alignItems: 'center',
        height: 20,
    },
    sex: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 18,
        height: 16,
        borderRadius: 3,
        marginLeft: 12,
    },
    loading: {
        position: 'absolute',
        right: 24,
        top: 18,
    }
});