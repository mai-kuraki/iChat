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
    Image
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

export default class Chat extends Component {
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
                            navigate('Tab')
                        }}
                    >
                        <View style={styles.headerIcon}>
                            <Feather name="chevron-left" size={20} color="#666"/>
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
    header: {
        height: 52,
        backgroundColor: '#FFF',
        shadowColor: '#000',
        flexDirection: 'row',
        elevation: 4,
    },
    headerIcon: {
        width: 52,
        height: 52,
        justifyContent: 'center',
        alignItems: 'center',
    },
})