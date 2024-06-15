import ScreenHeader from '@social/components/ScreenHeader/ScreenHeader';
import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import UserListItem from '@social/components/ProfileComponents/UserListItem';

const Following = () => {
  const [followersData, setFollowersData] = useState([
    { id: '1', source: { uri: 'https://images.freeimages.com/images/large-previews/6b2/paris-1217537.jpg?fmt=webp&w=500' }, username: "test1", Name: "test user", isFollowing: true },
    { id: '2', source: { uri: 'https://images.freeimages.com/images/large-previews/6b2/paris-1217537.jpg?fmt=webp&w=500' }, username: "test2", Name: "test user", isFollowing: true },
    { id: '3', source: { uri: 'https://images.freeimages.com/images/large-previews/6b2/paris-1217537.jpg?fmt=webp&w=500' }, username: "test3", Name: "test user", isFollowing: true },
    { id: '4', source: { uri: 'https://images.freeimages.com/images/large-previews/6b2/paris-1217537.jpg?fmt=webp&w=500' }, username: "test4", Name: "test user", isFollowing: true },
    { id: '5', source: { uri: 'https://images.freeimages.com/images/large-previews/6b2/paris-1217537.jpg?fmt=webp&w=500' }, username: "test5", Name: "test user", isFollowing: true },
  ]);

  const handleFollowUnFollow = (id) => {
    setFollowersData(prevData =>
      prevData.map(user =>
        user.id === id ? { ...user, isFollowing: !user.isFollowing } : user
      )
    );
  };

  const renderItem = ({ item }) => (
    <UserListItem
      item={item}
      buttonType={item.isFollowing ? "secondary" : "primary"}
      buttonText={item.isFollowing ? "Following" : "Follow"}
      onPress={() => handleFollowUnFollow(item.id)}
    />
  );

  return (
    <View style={styles.myFollowersContainer}>
      <ScreenHeader headerName='Following' />
      <View>
        <FlatList
          data={followersData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={1}
          contentContainerStyle={styles.videoContainer}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  myFollowersContainer: {
    paddingHorizontal: 16,
    flex: 1,
    backgroundColor: '#fff',
  },
  videoContainer: {
    width: "100%",
    paddingBottom: 100,
  },
});

export default Following;
