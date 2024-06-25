import React, {useCallback, useEffect, useState} from "react";
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    View,
    TouchableOpacity,
} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import FastImage from "react-native-fast-image";
import MultiPostIcon from "react-native-vector-icons/MaterialCommunityIcons";
import AddContentIcon from "react-native-vector-icons/Ionicons";
import CustomText from "../Text/CustomText";
import {typography} from "@social/utils/typography";
import {colors} from "@social/utils/colors";
import {useNavigation, useFocusEffect} from "@react-navigation/native";
import {useGetAllMyPostsQuery} from "@social/redux/services/auth/authApi";
import {setPosts} from "@social/redux/Slice/UserProfileActivitySlice";
import {WINDOW_WIDTH} from "@social/constants/screenSize";
import Spacing from "../Spacing";

const ProfilePostsTab = ({userId}) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const loggedInProfileData = useSelector((state: any) => state?.auth?.user);
    const [page, setPage] = useState(1);
    const {
        data: postResponse,
        isLoading: isAllPostLoading,
        error: postError,
        refetch,
    } = useGetAllMyPostsQuery({
        userId,
        page,
        limit: 9, // Example limit value, adjust as needed
    });
    const [allPosts, setAllPosts] = useState<any[]>([]);
    const [isFetchingMore, setIsFetchingMore] = useState(false);
    const [hasFetchedPosts, setHasFetchedPosts] = useState(false);

    const handlePostClick = postId => {
        (navigation as any).navigate("PostDetailsScreen", {postId});
    };

    // Function to fetch more posts when end of list is reached
    const loadMorePosts = () => {
        if (!isFetchingMore && postResponse && page < postResponse.totalPages) {
            setIsFetchingMore(true);
            setPage(prevPage => prevPage + 1); // Increment page using previous state
        }
    };

    useEffect(() => {
        if (postResponse?.data) {
            if (page === 1) {
                // Initialize allPosts with the fetched data when page is 1
                setAllPosts(postResponse.data);
            } else {
                // Concatenate new posts to existing posts using callback in setAllPosts
                setAllPosts(prevPosts => [...prevPosts, ...postResponse.data]);
            }
            setIsFetchingMore(false); // Reset fetching state
            setHasFetchedPosts(true); // Indicate that posts have been fetched
        }
    }, [postResponse, page]);

    useEffect(() => {
        if (postResponse?.data) {
            // Dispatch action to update Redux state
            dispatch(setPosts([...allPosts, ...postResponse.data]));
        }
    }, [postResponse, dispatch, allPosts]);

    // Fetch posts on initial render
    useEffect(() => {
        refetch();
    }, []);

    const renderItem = ({item, index}) => (
        <TouchableOpacity
            onPress={() => handlePostClick(item._id)}
            key={`${item._id} ${index}`}>
            <View style={[styles.postItem, {width: WINDOW_WIDTH / 3 - 16}]}>
                {item?.Media?.length > 1 && (
                    <View style={styles.multiPostIcon}>
                        <MultiPostIcon name="card-multiple-outline" />
                    </View>
                )}
                <FastImage
                    source={{uri: item?.Media[0]?.url}}
                    style={styles.profileImage}
                    resizeMode={FastImage.resizeMode.cover}
                />
            </View>
        </TouchableOpacity>
    );

    if (isAllPostLoading && !hasFetchedPosts) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#FF4D67" />
            </View>
        );
    }

    if (postError) {
        // Handle error state
        return (
            <View style={styles.errorContainer}>
                <CustomText>
                    Error fetching posts. Please try again later.
                </CustomText>
            </View>
        );
    }

    // Determine whether to show the empty message
    const shouldShowEmptyMessage = hasFetchedPosts && allPosts.length === 0;

    return (
        <FlatList
            data={allPosts}
            renderItem={renderItem}
            ListEmptyComponent={
                shouldShowEmptyMessage ? (
                    <View style={styles.emptyListComponent}>
                        {loggedInProfileData?._id === userId ? (
                            <TouchableOpacity
                                onPress={() =>
                                    (navigation as any).navigate(
                                        "PostCreationStack",
                                    )
                                }
                                style={styles.createPostBtn}>
                                <AddContentIcon
                                    name="add-circle-outline"
                                    size={24}
                                    color={colors["24Color"]}
                                />
                                <CustomText style={styles.emptyPostText}>
                                    Create your first post
                                </CustomText>
                            </TouchableOpacity>
                        ) : (
                            <CustomText style={styles.emptyPostText}>
                                No Posts Yet
                            </CustomText>
                        )}
                    </View>
                ) : null
            }
            columnWrapperStyle={{
                paddingHorizontal: 5,
                gap: 5,
            }}
            ItemSeparatorComponent={() => <Spacing size={3} />}
            numColumns={3}
            contentContainerStyle={styles.postContainer}
            onEndReached={loadMorePosts}
            onEndReachedThreshold={0.5}
            ListFooterComponent={() => {
                return isFetchingMore ? (
                    <View>
                        <ActivityIndicator size="large" color="#FF4D67" />
                    </View>
                ) : (
                    <View style={{marginBottom: 40}} />
                );
            }}
        />
    );
};

const styles = StyleSheet.create({
    postContainer: {
        paddingVertical: 11,
        paddingHorizontal: 16,
        minWidth: "100%",
    },
    postItem: {
        borderRadius: 5,
    },
    profileImage: {
        aspectRatio: 1,
        borderRadius: 5,
    },
    emptyListComponent: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 30,
    },
    emptyPostText: {
        fontFamily: typography.sfSemiBold,
        fontSize: 16,
        color: colors["24Color"],
    },
    multiPostIcon: {
        position: "absolute",
        top: 8,
        right: 8,
        zIndex: 10,
    },
    createPostBtn: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    errorContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default ProfilePostsTab;
