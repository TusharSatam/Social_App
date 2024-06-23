import { useNavigation } from '@react-navigation/native';
import ScreenHeader from '@social/components/ScreenHeader/ScreenHeader';
import CustomText from '@social/components/Text/CustomText';
import { setSavedPosts } from '@social/redux/Slice/UserProfileActivitySlice';
import { useGetAllMySavedPostsQuery } from '@social/redux/services/auth/authApi';
import { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, Dimensions, ActivityIndicator, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useDispatch, useSelector } from 'react-redux';
import { typography } from '@social/utils/typography';
import { colors } from '@social/utils/colors';

const windowWidth = Dimensions.get('window').width;
const numColumns = 3; // Number of columns

const MySavedPosts = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const loggedInProfileData = useSelector((state: any) => state.auth?.user);
    const { data: savedPosts, error: postError, isLoading: isAllPostLoading, refetch } = useGetAllMySavedPostsQuery({ id: loggedInProfileData?._id });

    const [page, setPage] = useState(1);
    const [allPosts, setAllPosts] = useState<any[]>([]);
    const [isFetchingMore, setIsFetchingMore] = useState(false);
    const [hasFetchedPosts, setHasFetchedPosts] = useState(false);

    useEffect(() => {
        console.log("savedPosts", savedPosts);
        console.log("allPosts", allPosts);
    }, [savedPosts, allPosts]);

    const handlePostClick = (postId) => {
        (navigation as any).navigate('PostDetailsScreen', { postId });
    };

    const loadMorePosts = () => {
        if (!isFetchingMore && savedPosts && page < savedPosts.pagination.totalPages) {
            setIsFetchingMore(true);
            setPage(prevPage => prevPage + 1); // Increment page using previous state
        }
    };

    useEffect(() => {
        if (savedPosts?.data) {
            if (page === 1) {
                setAllPosts(savedPosts.data);
            } else {
                setAllPosts(prevPosts => [...prevPosts, ...savedPosts.data]);
            }
            setIsFetchingMore(false);
            setHasFetchedPosts(true);
        }
    }, [savedPosts, page]);

    useEffect(() => {
        if (allPosts.length > 0) {
            dispatch(setSavedPosts(allPosts));
        }
    }, [allPosts, dispatch]);

    useEffect(() => {
        refetch();
    }, []);

    if (isAllPostLoading && !hasFetchedPosts) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#FF4D67" />
            </View>
        );
    }

    if (postError) {
        return (
            <View style={styles.errorContainer}>
                <CustomText>Error fetching posts. Please try again later.</CustomText>
            </View>
        );
    }

    const shouldShowEmptyMessage = hasFetchedPosts && allPosts.length === 0;
    const itemWidth = (windowWidth - 32 - (numColumns - 1) * 10) / numColumns;

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => handlePostClick(item.postId)}>
            <FastImage
                key={item?.postId}
                source={{ uri: item?.media[0]?.url }}
                style={{ width: itemWidth, height: itemWidth, margin: 2.5, borderRadius: 8 }}
            />
        </TouchableOpacity>
    );

    return (
        <View style={styles.savedContainer}>
            <ScreenHeader headerName='Saved Posts' />
             <FlatList
                data={allPosts}
                renderItem={renderItem}
                keyExtractor={(item) => item.postId}
                numColumns={numColumns}
                ListEmptyComponent={
                    shouldShowEmptyMessage ? (
                        <View style={styles.emptyListComponent}>
                            <CustomText style={styles.emptyPostText}>No Posts Yet</CustomText>
                        </View>
                    ) : null
                }
                contentContainerStyle={styles.savedPosts}
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
    savedContainer: {
        paddingHorizontal: 16,
    },
    savedPosts: {
        // paddingTop: 16,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyListComponent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 30,
    },
    emptyPostText: {
        fontFamily: typography.sfSemiBold,
        fontSize: 16,
        color: colors['24Color'],
    },
});

export default MySavedPosts;
