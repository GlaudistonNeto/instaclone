import React, { Component } from 'react';
import { EventSubscriptionVendor, StyleSheet } from 'react-native';
import { createMaterialBottomTabNavigator }
from '@react-navigation/material-bottom-tabs';
import MaterialCommumityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUser } from '../redux/actions/index';

import FeedScreen from './main/Feed';
import ProfileScreen from './main/Profile';

const Tab = createMaterialBottomTabNavigator();

const EmptyScreen = () => {
  return (null);
};

export class Main extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <Tab.Navigator initialRouteName='Feed' labeled={false}>
        <Tab.Screen name='Feed' component={FeedScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommumityIcons name='home' color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen name='AddContainer' component={EmptyScreen}
        listeners={({ navigation }) => ({
          tabPress: event => {
            event.preventDefault();
            navigation.navigate('Add')
          }
        })}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommumityIcons name='plus-box' color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen name='Profile' component={ProfileScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommumityIcons name='account-circle' color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    )
  }
}

const styles = StyleSheet.create({
  loadingStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#97a356'
  }
});

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser
});
const mapDispatchProps = (dispatch) => bindActionCreators({
  fetchUser
}, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Main);
