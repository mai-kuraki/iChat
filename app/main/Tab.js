/**
 * Created by zhengliuyang on 2018/5/30.
 */
import React, {Component} from 'react';
import {
    Dimensions,
    StyleSheet,
    Text,
    View,
    StatusBar,
    TouchableNativeFeedback
} from 'react-native';
import MsgList from './MsgList';
import ContactsList from './ContactsList';
import Mine from './Mine';
import Feather from 'react-native-vector-icons/Feather';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {TabViewAnimated, TabBar, SceneMap} from 'react-native-tab-view';

const initialLayout = {
    height: 0,
    width: Dimensions.get('window').width,
};

export default class TabList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            routes: [
                {key: 'ChatList', icon: 'message-circle', label: 'MESSAGE'},
                {key: 'ContactsList', icon: 'users', label: 'CONTACTS'},
                {key: 'Mine', icon: 'inbox', label: 'MINE'}
            ],
        }
    }

    static navigationOptions = {
        header: null,
    };

    renderScene = SceneMap({
        ChatList: MsgList,
        ContactsList: ContactsList,
        Mine: Mine,
    });

    renderIcon({route}) {
        return (
            <Feather name={route.icon} size={20} color="#333"/>
        )
    }

    handleIndexChange(index) {
        this.setState({
            index: index,
        });
    }

    renderHeader = props => <TabBar
        style={styles.tabbar}
        indicatorStyle={styles.indicatorStyle}
        pressColor="#999"
        renderIcon={this.renderIcon.bind(this)}
        {...props} />;

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="#FFF"
                    barStyle="dark-content"
                />
                <View style={styles.header}>
                    <TouchableNativeFeedback
                        background={TouchableNativeFeedback.Ripple('rgba(0, 0, 0, .2)', true)}
                    >
                        <View style={styles.headerIcon}>
                            <Feather name="align-left" size={20} color="#666"/>
                        </View>
                    </TouchableNativeFeedback>
                    <View style={styles.headerTitleWrap}>
                        <Text style={styles.headerTitle}>
                            {
                                this.state.routes[this.state.index].label
                            }
                        </Text>
                    </View>
                    <TouchableNativeFeedback
                        background={TouchableNativeFeedback.Ripple('rgba(0, 0, 0, .2)', true)}
                        onPress={() => {navigate('SignIn')}}
                    >
                        <View style={styles.headerIcon}>
                            <Feather name="search" size={20} color="#666"/>
                        </View>
                    </TouchableNativeFeedback>
                </View>
                <TabViewAnimated
                    navigationState={this.state}
                    renderScene={this.renderScene}
                    renderHeader={this.renderHeader}
                    onIndexChange={this.handleIndexChange.bind(this)}
                    initialLayout={initialLayout}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabbar: {
        height: 70,
        backgroundColor: '#FFF',
        justifyContent: 'center',
    },
    indicatorStyle: {
        backgroundColor: '#333',
    },
    header: {
        height: 52,
        backgroundColor: '#FFF',
        flexDirection: 'row',
    },
    headerIcon: {
        width: 52,
        height: 52,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitleWrap: {
        flex: 1,
        height: 52,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 16,
        color: '#333'
    }
});