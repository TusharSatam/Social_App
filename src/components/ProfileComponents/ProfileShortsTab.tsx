import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import Video from 'react-native-video';
import ReelPlayIcon from '../SvgIcons/ProfileScreenIcons/ReelPlayIcon';
import ShortsItem from './ShortsItem';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { setShorts } from '@social/redux/Slice/UserProfileActivitySlice';
import CustomText from '../Text/CustomText';
import { useGetAllMyShortsQuery } from '@social/redux/services/auth/authApi';
import { colors } from '@social/utils/colors';
import { typography } from '@social/utils/typography';
import AddContentIcon from "react-native-vector-icons/Ionicons";

// Sample data to represent the reels
const shortsData = [
  { id: '1', source: { uri: 'https://v6.cdnpk.net/videvo_files/video/premium/partners0547/large_watermarked/2557898_preview.mp4' }, views: '56K' },
  { id: '2', source: { uri: 'https://videocdn.cdnpk.net/cdn/content/video/partners0316/large_watermarked/h7975e5ac_MotionFlow6307_preview.mp4' }, views: '56K' },
  { id: '3', source: { uri: 'https://v3.cdnpk.net/videvo_files/video/premium/partners0485/large_watermarked/BB_572945f2-0abd-4d23-84f1-76146cd7422d_preview.mp4' }, views: '56K' },
  { id: '4', source: { uri: 'https://videocdn.cdnpk.net/euphony/content/video/happy/premium/partners0067/large_watermarked/BB_fb7a63cf-7bea-46c5-ac09-36fe1f101b89_preview.mp4' }, views: '56K' },
  { id: '5', source: { uri: 'https://v1.cdnpk.net/videvo_files/video/premium/getty_160/large_watermarked/istock-1175322947_preview.mp4' }, views: '56K' },
  { id: '6', source: { uri: 'https://videocdn.cdnpk.net/excite/content/video/premium/partners0764/large_watermarked/2856991_preview.mp4' }, views: '56K' },
];

const ProfileShortsTab = ({ userId }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const loggedInProfileData = useSelector((state: any) => state.auth?.user);
  const [page, setPage] = useState(1);
  const { data: shortsResponse, isLoading: isAllShortsLoading, error: shortsError, refetch } = useGetAllMyShortsQuery({
    user: userId,
    page,
    limit: 9, // Example limit value, adjust as needed
  });
  const [paused, setPaused] = useState(Array(shortsResponse?.length).fill(true));
  console.log(shortsResponse, userId, page);

  const [allShorts, setAllShorts] = useState<any[]>([]);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [hasFetchedShorts, setHasFetchedShorts] = useState(false);

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
    if (shortsResponse?.shorts) {
      if (page === 1) {
        // Initialize allShorts with the fetched data when page is 1
        setAllShorts(shortsResponse.shorts);
      } else {
        // Concatenate new posts to existing posts using callback in setAllShorts
        setAllShorts(prevPosts => [...prevPosts, ...shortsResponse.shorts]);
      }
      setIsFetchingMore(false); // Reset fetching state
      setHasFetchedShorts(true); // Indicate that posts have been fetched
    }
  }, [shortsResponse, page]);

  useEffect(() => {
    if (shortsResponse?.shorts) {
      // Dispatch action to update Redux state
      dispatch(setShorts([...allShorts, ...shortsResponse.shorts]));
    }
  }, [shortsResponse, dispatch, allShorts]);


  // Fetch posts on initial render
  useEffect(() => {
    refetch();
  }, [])


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
    <ShortsItem item={item} paused={paused} index={index} togglePause={togglePause} key={`myshorts${index}`} handleShortClick={handleShortClick} />
  );

  return (
    <View style={styles.Reelscontainer}>
      <FlatList
        data={allShorts}
        renderItem={renderItem}
        keyExtractor={(item, index) => `myshorts${index}`}
        numColumns={3}
        contentContainerStyle={styles.videoContainer}
        ListEmptyComponent={
          shouldShowEmptyMessage ? (
            <View style={styles.emptyListComponent}>
              {loggedInProfileData?._id === userId ? (
                <TouchableOpacity onPress={() => (navigation as any).navigate("PostCreationStack")} style={styles.createPostBtn}>
                  <AddContentIcon name='add-circle-outline' size={24} color={colors['24Color']} />
                  <CustomText style={styles.emptyPostText}>Create your first Shorts</CustomText>
                </TouchableOpacity>
              ) : (
                <CustomText style={styles.emptyPostText}>No Shorts Yet</CustomText>
              )}
            </View>
          ) : null
        }
        style={{ flex: 1 }}
        onEndReached={loadMorePosts}
        onEndReachedThreshold={0.5}
        ListFooterComponent={() => (
          isFetchingMore ? <ActivityIndicator size="large" color="#FF4D67" /> : null
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  Reelscontainer: {
    width: '100%',
    paddingVertical: 11,
    paddingHorizontal: 16,
    backgroundColor: "#F6F6F6",
    flex: 1,
  },
  videoContainer: {
    paddingHorizontal: 5,
    width: '100%',
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  reelItem: {
    margin: 2.5,
    height: 174,
    width: 106,
    position: 'relative',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0', // Background color for placeholder effect
  },
  video: {
    height: '100%',
    width: '100%',
  },
  overlay: {
    position: 'absolute',
    bottom: 7,
    left: 10,
    // borderRadius: 5,
    // backgroundColor: 'rgba(0, 0, 0, 0.6)',
    // paddingHorizontal: 6,
    // paddingVertical: 3,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    gap: 3,
  },
  viewsText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  button: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 5,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
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
  emptyListComponent: {
    width: "100%",
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 30,
  },
  emptyPostText: {
    fontFamily: typography.sfSemiBold,
    fontSize: 16,
    color: colors['24Color'],
  },
  createPostBtn: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
});

export default ProfileShortsTab;
