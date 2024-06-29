import CustomText from '@social/components/Text/CustomText'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { FlashList, MasonryFlashList } from "@shopify/flash-list";
import Feed from './Feed';
import { useGetAllExplorePostsQuery, useGetLocationBasedExploresQuery } from '@social/redux/services/auth/authApi';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { setAllExplores } from '@social/redux/Slice/ExploreSlice';
import { typography } from '@social/utils/typography';
import { colors } from '@social/utils/colors';
const ExploreFeeds = ({ paramLocation }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const loggedInProfileData = useSelector((state: any) => state.auth?.user);

    const [page, setPage] = useState(1);
    const { data: explorePosts, isLoading: isAllPostLoading, error: postError, isFetching: isFetchingExplores, refetch } = paramLocation
        ? useGetLocationBasedExploresQuery({ page, limit: 18, location: paramLocation })
        : useGetAllExplorePostsQuery({ page, size: 18 });
    const [allExplorePosts, setAllExplorePosts] = useState<any[]>([]);
    const [isFetchingMore, setIsFetchingMore] = useState(false);
    const [hasFetchedPosts, setHasFetchedPosts] = useState(false);


    const loadMorePosts = () => {
        console.log("fetch more 1");
        if (!isFetchingMore && explorePosts && page < explorePosts.totalPages) {
            console.log("fetch more 2");
            console.log(explorePosts.totalPages, "page:", page);

            setIsFetchingMore(true);
            setPage(prevPage => prevPage + 1); // Increment page using previous state
        }
    };

    useEffect(() => {
        if (explorePosts?.data) {
            if (page === 1) {
                setAllExplorePosts(explorePosts.data);
            } else {
                setAllExplorePosts(prevPosts => [...prevPosts, ...explorePosts.data]);
            }
            setIsFetchingMore(false);
            setHasFetchedPosts(true);
        }
    }, [explorePosts, page]);

    useEffect(() => {
        if (allExplorePosts.length > 0) {
            dispatch(setAllExplores(allExplorePosts));
        }
    }, [allExplorePosts, dispatch]);

    // useEffect(() => {
    //     refetch();
    // }, []);

    if (isFetchingExplores && !hasFetchedPosts) {
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

    const shouldShowEmptyMessage = hasFetchedPosts && allExplorePosts.length === 0;
    return (
        <View style={styles.FeedsContainer}>
            <MasonryFlashList
                data={allExplorePosts}
                numColumns={3}
                // keyExtractor={(item) => item._id}
                renderItem={({ item, index }) => <Feed item={item} key={item?._id} index={index} />}
                estimatedItemSize={200}
                ListEmptyComponent={
                    shouldShowEmptyMessage ? (
                        <View style={styles.emptyListComponent}>
                            <CustomText style={styles.emptyPostText}>No Posts Yet</CustomText>
                        </View>
                    ) : null
                }
                onEndReached={loadMorePosts}
                onEndReachedThreshold={0.5}
                ListFooterComponent={() => (
                    isFetchingMore ? <ActivityIndicator size="large" color="#FF4D67" /> : null
                )}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    FeedsContainer: {
        width: "100%",
        display: "flex",
        flex: 1,
        marginTop: 10,
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
})
export default ExploreFeeds