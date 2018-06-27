/**
 * Created by zhengliuyang on 2018/5/30.
 */
import React, {Component} from 'react';
import {
    Dimensions,
    StyleSheet,
    Text,
    View,
    TouchableNativeFeedback,
    SectionList,
    Image,
    RefreshControl
} from 'react-native';
import config from '../config';
import request from '../utils/request';
const api = config.api;

export default class ContactsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRefreshing: false,
            item: []
        };
        this.request = request(this);
    }

    componentWillMount() {
        this.refreshItem();
    }

    refreshItem() {
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

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
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
    avator: {
        width: 36,
        height: 36,
        borderRadius: 18,
    },
    name: {
        fontSize: 16,
        color: '#666',
        paddingLeft: 15
    }
});