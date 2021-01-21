import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from  'redux';
import { fetchUser } from '../redux/actions/index';

export class Main extends Component {
  componentDidMount() {
   this.props.fetchUser();
  }
  render() {
    const { currentUser } = this.props;

    console.log(currentUser);
    return (
      <View style={styles.container}>
        <Text>, you are logged in</Text>
      </View>
    );
  ;}
};

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser
});
const mapDispatchProps = (dispatch) =>
  bindActionCreators({ fetchUser }, dispatch);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default connect(mapStateToProps, mapDispatchProps)(Main);
