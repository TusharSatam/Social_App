import { useNavigation } from '@react-navigation/native';
import ShortsItem from '@social/components/ProfileComponents/ShortsItem';
import ScreenHeader from '@social/components/ScreenHeader/ScreenHeader';
import CustomText from '@social/components/Text/CustomText';
import { setSavedShorts } from '@social/redux/Slice/UserProfileActivitySlice';
import { useGetAllMySavedShortsQuery } from '@social/redux/services/auth/authApi';
import { colors } from '@social/utils/colors';
import { typography } from '@social/utils/typography';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, Dimensions, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

const windowWidth = Dimensions.get('window').width;
const numColumns = 3; // Number of columns

const MySavedPosts = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const loggedInProfileData = useSelector((state: any) => state.auth?.user);
  const [page, setPage] = useState(1);

  const [allShorts, setAllShorts] = useState<any[]>([]);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [hasFetchedShorts, setHasFetchedShorts] = useState(false);
  const { data: shortsResponse, isLoading: isAllShortsLoading, error: shortsError, refetch } = useGetAllMySavedShortsQuery({
    userId: loggedInProfileData?._id,
    page,
    limit: 18, // Example limit value, adjust as needed
  });
  const [paused, setPaused] = useState(Array(shortsResponse?.length).fill(true));

  const handleShortClick = (postId) => {
    (navigation as any).navigate('PostDetailsScreen', { postId });
  };
  // Function to fetch more posts when end of list is reached
  const loadMorePosts = () => {
    if (!isFetchingMore && shortsResponse && page < shortsResponse.totalPages) {
      setIsFetchingMore(true);
      setPage(prevPage => prevPage + 1); // Increment page using previous state
    }
  };

  useEffect(() => {
    if (shortsResponse?.data) {
      if (page === 1) {
        // Initialize allShorts with the fetched data when page is 1
        setAllShorts(shortsResponse.data);
      } else {
        // Concatenate new posts to existing posts using callback in setAllShorts
        setAllShorts(prevPosts => [...prevPosts, ...shortsResponse.data]);
      }
      setIsFetchingMore(false); // Reset fetching state
      setHasFetchedShorts(true); // Indicate that posts have been fetched
    }
  }, [shortsResponse, page]);

  useEffect(() => {
    if (allShorts.length > 0) {
      // Dispatch action to update Redux state
      dispatch(setSavedShorts(allShorts));
    }
  }, [dispatch, allShorts]);


  // Fetch posts on initial render
  useEffect(() => {
    refetch();
  }, [loggedInProfileData])


  if (isAllShortsLoading && !hasFetchedShorts) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF4D67" />
      </View>
    );
  }

  if (shortsError) {
    // Handle error state
    return (
      <View style={styles.errorContainer}>
        <CustomText>Error fetching Shorts. Please try again later.</CustomText>
      </View>
    );
  }

  // Determine whether to show the empty message
  const shouldShowEmptyMessage = hasFetchedShorts && allShorts.length === 0;
  const togglePause = (index) => {
    setPaused((prevPaused) => {
      const newPaused = [...prevPaused];
      newPaused[index] = !newPaused[index];
      return newPaused;
    });
  };

  const renderItem = ({ item, index }) => (
    <ShortsItem item={item} index={index} key={item?.shortsId}/>
  );

  return (
    <View style={styles.savedContainer}>
      <ScreenHeader headerName='Saved Shorts' />
      <FlatList
        data={allShorts}
        renderItem={renderItem}
        keyExtractor={(item) => item?.shortsId}
        numColumns={numColumns} // Render 3 columns
        contentContainerStyle={styles.savedPosts}
        ListEmptyComponent={
          shouldShowEmptyMessage ? (
            <View style={styles.emptyListComponent}>
              <CustomText style={styles.emptyPostText}>No Posts Yet</CustomText>
            </View>
          ) : null
        }
        onEndReached={loadMorePosts}
        onEndReachedThreshold={0.1}
        ListFooterComponent={() => (
          isFetchingMore ? <ActivityIndicator size="large" color="#FF4D67" /> : null
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  savedContainer: {
    paddingHorizontal: 16,
    flex: 1, // Ensure the container takes full height
  },
  savedPosts: {
    paddingTop: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyPostText: {
    fontFamily: typography.sfSemiBold,
    fontSize: 16,
    color: colors['24Color'],
  },
  emptyListComponent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
  },
});

export default MySavedPosts;
