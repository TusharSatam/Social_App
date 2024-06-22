import ScreenHeader from '@social/components/ScreenHeader/ScreenHeader';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import UserListItem from '@social/components/ProfileComponents/UserListItem';
import { useDispatch, useSelector } from 'react-redux';
import { useFollowUserMutation, useGetAllMyFollowingMutation, useGetOtherPersonFollowingListMutation, useUnfollowUserMutation } from '@social/redux/services/auth/authApi';
import { setFollowings } from '@social/redux/Slice/UserProfileActivitySlice';
import EmptyMessage from '@social/components/ProfileComponents/EmptyMessage';
import FetchingLoader from '@social/components/Loader/FetchingLoader';

const MyFollowing = ({ route }) => {
  const paramUserId = route.params;
  const dispatch = useDispatch();
  const loggedInProfileData = useSelector((state: any) => state.auth);
  const [getOtherPersonFollowingList, { isLoading: isAllFollowingLoading }] = useGetOtherPersonFollowingListMutation();
  const [unfollowUser, { isLoading: isUnFollowingLoading }] = useUnfollowUserMutation();
  const [followUser, { isLoading: isFollowingLoading }] = useFollowUserMutation();

  const [followings, setFollowingList] = useState([]);
  const [page, setPage] = useState(1);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true);
  const handleFollowUnFollow = async (id) => {
    const user = followings.find(user => user.userId === id);
    if (user && user.isFollowedByMe) {

      setFollowingList(prevData =>
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
      setFollowingList(prevData =>
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

  
  

  const fetchAllFollowings = async (pageNumber = 1) => {
    if (!hasMoreData) return; // Stop fetching if no more data is available
    setIsFetchingMore(true);
    try {

      const followingResponse = await getOtherPersonFollowingList({
        myUserId: loggedInProfileData?.user?._id,
        page: pageNumber,
        limit: 13,
        otherPersonId:paramUserId,
      }).unwrap();

      if (followingResponse?.data) {

        if (pageNumber === 1) {
         
          setFollowingList(followingResponse.data);
          dispatch(setFollowings(followingResponse.data));
        } else {
         
          const newFollowingList = [...followings, ...followingResponse.data];
          setFollowingList(newFollowingList);
          dispatch(setFollowings(newFollowingList));
        }
        setPage(pageNumber);
        // Check if there are more pages to fetch
        if (followingResponse.data.length < 13) {
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
    fetchAllFollowings();
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
        
    if (!isFetchingMore && hasMoreData && followings.length >= 13) {
      fetchAllFollowings(page + 1);
    }
};

if (isAllFollowingLoading && page === 1 && followings?.length===0 ) {
    console.log("page:",page);
    
    return <FetchingLoader />;
}
  return (
    <View style={styles.myFollowingContainer}>
      <ScreenHeader headerName='Following' />
      <View>
      {followings.length === 0 ? (
                    <EmptyMessage header="No users found" />
                ) : (
        <FlatList
          data={followings}
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
  myFollowingContainer: {
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
