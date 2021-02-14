import React, { Component } from 'react';
import { StyleSheet, View, Text, LogBox } from 'react-native'

import * as firebase from 'firebase';
import firebaseKeys from './connection/firebaseKeys';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './redux/reducers';
import thunk from 'redux-thunk';

LogBox.ignoreAllLogs();

const store = createStore(rootReducer, applyMiddleware(thunk))

firebaseKeys;

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseKeys);
};

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LandingScreen from './screens/auth/Landing';
import LoginScreen from './screens/auth/Login';
import RegisterScreen from './screens/auth/Register';
import MainScreen from './screens/Main';

const Stack = createStackNavigator();
export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.setState({
          loggedIn: false,
          loaded: true,
        });
      } else {
        this.setState({
          loggedIn: true,
          loaded: true,
        });
      }
    });
  };
  render() {
    const { loggedIn, loaded } = this.state;
    if (!loaded) {
      return(
        <View style={styles.loadingStyle}>
          <Text>Loading...</Text>
        </View>
      );
    }

    if (!loggedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen name="Landing" component={LandingScreen} options={{
              headerShown: false
            }} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    };

    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Main'>
            <Stack.Screen
              name='Main'
              component={MainScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  };
};

const styles = StyleSheet.create({
  loadingStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#97a356'
  }
});

export default App;
