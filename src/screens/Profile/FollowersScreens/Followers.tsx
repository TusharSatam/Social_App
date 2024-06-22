import ScreenHeader from '@social/components/ScreenHeader/ScreenHeader';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import UserListItem from '@social/components/ProfileComponents/UserListItem';
import { useDispatch, useSelector } from 'react-redux';
import { useFollowUserMutation, useGetAllFollowersMutation, useGetAllMyFollowingMutation, useGetOtherPersonFollowersListMutation, useGetOtherPersonFollowingListMutation, useUnfollowUserMutation } from '@social/redux/services/auth/authApi';
import { setFollowings } from '@social/redux/Slice/UserProfileActivitySlice';
import EmptyMessage from '@social/components/ProfileComponents/EmptyMessage';
import FetchingLoader from '@social/components/Loader/FetchingLoader';

const MyFollowing = ({ route }) => {
  const paramUserId = route.params;
  const dispatch = useDispatch();
  const loggedInProfileData = useSelector((state: any) => state.auth);
  const [getOtherPersonFollowersList, { isLoading: isAllFollowingLoading }] = useGetOtherPersonFollowersListMutation();
  const [unfollowUser, { isLoading: isUnFollowingLoading }] = useUnfollowUserMutation();
  const [followUser, { isLoading: isFollowingLoading }] = useFollowUserMutation();

  const [followers, setFollowersList] = useState([]);
  const [page, setPage] = useState(1);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true);
  const handleFollowUnFollow = async (id) => {
    const user = followers.find(user => user.userId === id);
    if (user && user.isFollowedByMe) {

      setFollowersList(prevData =>
        prevData.map(user =>
          user.userId === id ? { ...user, isFollowedByMe: !user.isFollowedByMe } : user
        )
      );
      try {
        await unfollowUser({ myUserId: loggedInProfileData?.user?._id,myFollowingUserId:id }).unwrap();
      } catch (error) {
        console.error("Failed to unfollow user: ", error);
      }
    }
     else {
      setFollowersList(prevData =>
        prevData.map(user =>
          user.userId === id ? { ...user, isFollowedByMe: !user.isFollowedByMe } : user
        )
      );
      try {
        await followUser({ myUserId: loggedInProfileData?.user?._id,followUserId:id }).unwrap();
      } catch (error) {
        console.error("Failed to follow user: ", error);
      }
    }
  };

  
  

  const fetchAllFollowers = async (pageNumber = 1) => {
    if (!hasMoreData) return; // Stop fetching if no more data is available
    setIsFetchingMore(true);
    try {

      const followersResponse = await getOtherPersonFollowersList({
        myUserId: loggedInProfileData?.user?._id,
        page: pageNumber,
        limit: 13,
        otherPersonId:paramUserId,
      }).unwrap();

      if (followersResponse?.data) {

        if (pageNumber === 1) {
         
          setFollowersList(followersResponse.data);
          dispatch(setFollowings(followersResponse.data));
        } else {
         
          const newFollowingList = [...followers, ...followersResponse.data];
          setFollowersList(newFollowingList);
          dispatch(setFollowings(newFollowingList));
        }
        setPage(pageNumber);
        // Check if there are more pages to fetch
        if (followersResponse.data.length < 13) {
          setHasMoreData(false); // No more data available
        }

      } else {
        setHasMoreData(false); // No more data available
      }

    }
    catch (error) {
      console.error("Failed to fetch following users: ", error);
    } finally {
      setIsFetchingMore(false);
    }
  }

  useEffect(() => {
    fetchAllFollowers();
  }, []);

  const renderItem = ({ item }) => (
    <UserListItem
      item={item}
      buttonType={item.isFollowedByMe ? "secondary" : "primary"}
      buttonText={item.isFollowedByMe ? "Following" : "Follow"}
      onPress={() => handleFollowUnFollow(item.userId)}
    />
  );
  const handleLoadMore = () => {
        
    if (!isFetchingMore && hasMoreData && followers.length >= 13) {
      fetchAllFollowers(page + 1);
    }
};

if (isAllFollowingLoading && page === 1 && followers?.length===0 ) {
    console.log("page:",page);
    
    return <FetchingLoader />;
}
  return (
    <View style={styles.myFollowersContainer}>
      <ScreenHeader headerName='Followers' />
      <View>
      {followers.length === 0 ? (
                    <EmptyMessage header="No users found" />
                ) : (
        <FlatList
          data={followers}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          numColumns={1}
          contentContainerStyle={styles.videoContainer}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.1}
          ListFooterComponent={isFetchingMore ? <ActivityIndicator size="large" color="#FF4D67" /> : null}
        />  )}
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

export default MyFollowing;
