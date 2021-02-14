import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUser } from '../redux/actions/index';

export class Main extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    const { currentUser } = this.props;

    if (currentUser === undefined) {
      return (
        <View />
      );
    };
    return (
      <View style={styles.loadingStyle}>
          <Text>{currentUser.name} is logged In</Text>
      </View>
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
