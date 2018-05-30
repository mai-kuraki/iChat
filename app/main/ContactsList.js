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
    Image
} from 'react-native';

export default class ContactsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: [
                {
                    key: 'A',
                    data: [
                        {
                            key: '1',
                            avator: require('../images/av1.jpg'),
                            name: 'Emily Dove'
                        },
                        {
                            key: '2',
                            avator: require('../images/av2.jpg'),
                            name: 'Ramin Nasibow'
                        },
                        {
                            key: '3',
                            avator: require('../images/av3.jpg'),
                            name: 'Michael'
                        },
                        {
                            key: '4',
                            avator: require('../images/av4.jpg'),
                            name: 'Rahabi Khan'
                        }
                    ]
                },
                {
                    key: 'B',
                    data: [
                        {
                            key: '1',
                            avator: require('../images/av5.jpg'),
                            name: 'Francis Parra'
                        },
                        {
                            key: '2',
                            avator: require('../images/av6.jpg'),
                            name: 'Peter Joura'
                        },
                        {
                            key: '3',
                            avator: require('../images/av1.jpg'),
                            name: 'Michael'
                        },
                        {
                            key: '4',
                            avator: require('../images/av4.jpg'),
                            name: 'Rahabi Khan'
                        }
                    ]
                },
                {
                    key: 'C',
                    data: [
                        {
                            key: '1',
                            avator: require('../images/av5.jpg'),
                            name: 'Francis Parra'
                        },
                        {
                            key: '2',
                            avator: require('../images/av6.jpg'),
                            name: 'Peter Joura'
                        },
                        {
                            key: '3',
                            avator: require('../images/av1.jpg'),
                            name: 'Michael'
                        },
                        {
                            key: '4',
                            avator: require('../images/av4.jpg'),
                            name: 'Rahabi Khan'
                        }
                    ]
                }
            ]
        }
    }

    render() {
        const navigate = this.props.navigate;
        return (
            <View style={styles.container}>
                <SectionList
                    sections={this.state.item}
                    renderSectionHeader={({section}) => {
                        if(section.key) {
                            return (
                                <View style={styles.header}>
                                    <Text style={styles.headerTxt}>{section.key}</Text>
                                </View>
                            )
                        }else {
                            return null
                        }
                    }}
                    renderItem={({item}) => {
                        return (
                            <TouchableNativeFeedback>
                                <View style={styles.row}>
                                    <Image source={item.avator} style={styles.avator}/>
                                    <Text style={styles.name}>{item.name}</Text>
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