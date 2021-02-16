import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from 'react-native';

import firebase from 'firebase';
require('firebase/storage');

export default function Search(props) {
  const [users, setUsers] = useState([]);

  const fetchUser = (search) => {
    firebase.firestore()
      .collection('users')
      .where('name', '>=', search)
      .get()
      .then((snapshot) => {
        let users = snapshot.docs.map(doc => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data };
        });
        setUsers(users);
      })
  };
  return (
    <View style={styles.container}>
      <TextInput
        placeholder='Type to search'
        onChangeText={(search) => fetchUser(search)}
      />
      <FlatList
        numColumns={1}
        horizontal={false}
        data={users}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Profile', { uid: item.id})}>
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
