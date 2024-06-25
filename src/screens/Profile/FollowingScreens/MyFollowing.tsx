import ScreenHeader from "@social/components/ScreenHeader/ScreenHeader";
import React, {useEffect, useState} from "react";
import {ActivityIndicator, FlatList, StyleSheet, View} from "react-native";
import UserListItem from "@social/components/ProfileComponents/UserListItem";
import {useDispatch, useSelector} from "react-redux";
import {
    useFollowUserMutation,
    useGetAllMyFollowingMutation,
    useUnfollowUserMutation,
} from "@social/redux/services/auth/authApi";
import {setFollowings} from "@social/redux/Slice/UserProfileActivitySlice";
import EmptyMessage from "@social/components/ProfileComponents/EmptyMessage";
import FetchingLoader from "@social/components/Loader/FetchingLoader";

const MyFollowing = () => {
    const dispatch = useDispatch();
    const loggedInProfileData = useSelector((state: any) => state.auth);
    const [getAllMyFollowing, {isLoading: isAllFollowingLoading}] =
        useGetAllMyFollowingMutation();
    const [unfollowUser, {isLoading: isUnFollowingLoading}] =
        useUnfollowUserMutation();
    const [followUser, {isLoading: isFollowingLoading}] =
        useFollowUserMutation();

    const [followings, setFollowingList] = useState([]);
    const [page, setPage] = useState(1);
    const [isFetchingMore, setIsFetchingMore] = useState(false);
    const [hasMoreData, setHasMoreData] = useState(true);
    const handleFollowUnFollow = async id => {
        const user = followings.find(user => user._id === id);
        if (user && user.isFollowing) {
            setFollowingList(prevData =>
                prevData.map(user =>
                    user._id === id
                        ? {...user, isFollowing: !user.isFollowing}
                        : user,
                ),
            );
            try {
                await unfollowUser({
                    myUserId: loggedInProfileData?.user?._id,
                    myFollowingUserId: id,
                }).unwrap();
            } catch (error) {
                console.error("Failed to unfollow user: ", error);
            }
        } else {
            setFollowingList(prevData =>
                prevData.map(user =>
                    user._id === id
                        ? {...user, isFollowing: !user.isFollowing}
                        : user,
                ),
            );
            try {
                await followUser({
                    myUserId: loggedInProfileData?.user?._id,
                    followUserId: id,
                }).unwrap();
            } catch (error) {
                console.error("Failed to follow user: ", error);
            }
        }
    };

    const fetchAllFollowings = async (pageNumber = 1) => {
        if (!hasMoreData) return; // Stop fetching if no more data is available
        setIsFetchingMore(true);
        try {
            const followingResponse = await getAllMyFollowing({
                userId: loggedInProfileData?.user?._id,
                page: pageNumber,
                limit: 13,
            }).unwrap();

            if (followingResponse?.data) {
                if (pageNumber === 1) {
                    const updatedData = followingResponse.data.map(item => ({
                        ...item,
                        isFollowing: true,
                    }));
                    setFollowingList(updatedData);
                    dispatch(setFollowings(updatedData));
                } else {
                    const updatedData = followingResponse.data.map(item => ({
                        ...item,
                        isFollowing: true,
                    }));
                    const newFollowingList = [...followings, ...updatedData];
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
        } catch (error) {
            console.error("Failed to fetch following users: ", error);
        } finally {
            setIsFetchingMore(false);
        }
    };

    useEffect(() => {
        fetchAllFollowings();
    }, []);

    const renderItem = ({item}) => (
        <UserListItem
            item={item}
            buttonType={item?.isFollowing ? "secondary" : "primary"}
            buttonText={item?.isFollowing ? "Following" : "Follow"}
            onPress={() => handleFollowUnFollow(item?._id)}
            key={item?._id}
        />
    );
    const handleLoadMore = () => {
        if (!isFetchingMore && hasMoreData && followings.length >= 13) {
            fetchAllFollowings(page + 1);
        }
    };

    if (isAllFollowingLoading && page === 1 && followings?.length === 0) {
        return <FetchingLoader />;
    }
    return (
        <View style={styles.myFollowersContainer}>
            <ScreenHeader headerName="Following" />
            <View>
                {followings.length === 0 ? (
                    <EmptyMessage
                        header="Add Following"
                        description="Once you follow people, you'll see them here"
                    />
                ) : (
                    <FlatList
                        data={followings}
                        renderItem={renderItem}
                        numColumns={1}
                        contentContainerStyle={styles.videoContainer}
                        onEndReached={handleLoadMore}
                        onEndReachedThreshold={0.1}
                        ListFooterComponent={
                            isFetchingMore ? (
                                <ActivityIndicator
                                    size="large"
                                    color="#FF4D67"
                                />
                            ) : null
                        }
                    />
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    myFollowersContainer: {
        paddingHorizontal: 16,
        flex: 1,
        backgroundColor: "#fff",
    },
    videoContainer: {
        width: "100%",
        paddingBottom: 100,
    },
});

export default MyFollowing;
