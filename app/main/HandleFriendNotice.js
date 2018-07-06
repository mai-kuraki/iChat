/**
 * Created by zhengliuyang on 2018/7/6.
 */
import React, {Component} from 'react';
import {
    Dimensions,
    StyleSheet,
    Text,
    StatusBar,
    View,
    ScrollView,
    TouchableNativeFeedback,
    Switch
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

export default class HandleFriendNotice extends Component {
    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        header: null,
    };

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
                            navigate('Main');
                        }}
                    >
                        <View style={styles.headerIcon}>
                            <Feather name="arrow-left" size={20} color="#666"/>
                        </View>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback
                        background={TouchableNativeFeedback.Ripple('rgba(0, 0, 0, .2)', true)}
                        onPress={() => {
                            navigate('Search');
                        }}
                    >
                        <View style={styles.headerIcon}>
                            <Feather name="user-plus" size={20} color="#666"/>
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
    header: {
        height: 52,
        backgroundColor: '#FFF',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    headerIcon: {
        width: 52,
        height: 52,
        justifyContent: 'center',
        alignItems: 'center',
    },
});