import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { connect } from 'react-redux';

function Profile(props) {
  const { currentUser, posts } = props;
  console.log({ currentUser, posts });
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text>{currentUser.name}</Text>
        <Text>{currentUser.email}</Text>
      </View>

      <View style={styles.galleryContainer}>
        <FlatList
          numColumns={3}
          horizontal={false}
          data={posts}
          renderItem={({item}) => (
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={{ uri: item.downloadURL }}
              />
            </View>
          )}
        />
      </View>
    </View>
  );
};

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  posts: store.userState.posts
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
  },
  infoContainer: {
    margin: 10,
  },
  galleryContainer: {
    flex: 1,
  },
  imageContainer: {
    flex: 1/1
  },
  image: {
    flex: 1,
    aspectRatio: 1/3
  },
});

export default connect(mapStateToProps, null)(Profile);
