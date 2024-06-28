import { colors } from "@social/utils/colors";
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import HomeHeader from "./components/HomeHeader";
import FollowerStatus from "./components/FollowerStatus";
import { FlashList } from "@shopify/flash-list";
import PostCard from "./components/PostCard";
import { useCallback, useEffect, useRef, useState } from "react";
import Animated, { useSharedValue } from "react-native-reanimated";
import { useGetFeedQuery } from "@social/redux/services/auth/authApi";
import { useSelector } from "react-redux";
import { typography } from "@social/utils/typography";
import { WINDOW_HEIGHT } from "@social/constants/screenSize";
import dynamicLinks from "@react-native-firebase/dynamic-links";
import { useNavigation } from "@react-navigation/native";

const AnimatedTouchableWithoutFeedback = Animated.createAnimatedComponent(
    TouchableWithoutFeedback,
);

const Home = () => {
    const postFlashListRef = useRef<FlashList<number> | null>(null);
    const loggedInProfileData = useSelector((state: any) => state.auth);
    const navigation = useNavigation()
    const forScroll = useSharedValue(false);

    const [viewIndex, setViewIndex] = useState(0);
    const [footerLoader, setFooterLoader] = useState(false);
    // const pageNoRef = useRef(1);
    const [pageNo, setPageNo] = useState(1);

    const {
        isError,
        isFetching,
        isLoading,
        data: feedData,
    } = useGetFeedQuery({ id: loggedInProfileData?.user?._id, pageNo: pageNo });

    const renderPost = ({ item, index: postIndex }) => {
        if (feedData?.data.length < 1) {
            return (
                <View
                    style={{
                        backgroundColor: colors.white,
                        flex: 1,
                        height: WINDOW_HEIGHT - 300,
                        paddingHorizontal: 12,
                        alignItems: "center",
                    }}>
                    <View
                        style={{
                            flex: 1,
                            height: "100%",
                            alignItems: "center",
                            justifyContent: "center",
                        }}>
                        <Text
                            style={{
                                fontFamily: typography.sfSemiBold,
                                fontSize: 15,
                                color: colors["24Color"],
                                textAlignVertical: "center",
                            }}>
                            Your feed is empty
                        </Text>
                        <Text
                            style={{
                                fontFamily: typography.sfRegular,
                                fontSize: 13,
                                color: colors["24Color"],
                                textAlignVertical: "center",
                            }}>
                            You have to follow someone to see post
                        </Text>
                    </View>
                </View>
            );
        }
        return (
            <PostCard
                forScroll={forScroll}
                viewIndex={viewIndex}
                item={item}
                postIndex={postIndex}
            />
        );
    };

    const handlePagination = () => {
        if (
            feedData?.pagination?.totalPages === pageNo ||
            feedData?.pagination?.totalPosts === 0 ||
            feedData?.data.length < 1
        ) {
            setFooterLoader(false);
            return;
        }
        setFooterLoader(true);
        setPageNo(prev => prev + 1);
    };

    const postViewableItem = useCallback(info => {
        const viewableItem = info.viewableItems.filter(
            viewable => viewable.isViewable,
        );

        if (viewableItem?.length > 0) {
            setViewIndex(viewableItem[0].index);
        }
    }, []);

    //DeepLinking
    const handleLink = async (link) => {
        console.log(link);
        let postId = link.url.split('=').pop()
        console.log('link:', postId);
        (navigation as any).navigate('PostDetails', { postId })
    }

    useEffect(() => {
        const unsubscribe = dynamicLinks().onLink(handleLink)
        return () => unsubscribe
    }, [])
    useEffect(() => {
        const unsubscribe = dynamicLinks().getInitialLink().then((link) => {
            handleLink(link)
        })
        return () => unsubscribe
    }, [])

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: "center" }}>
                <ActivityIndicator size={"large"} color={colors.primary} />
            </View>
        );
    }

    return (
        <View style={styles.rootView}>
            <HomeHeader />
            <FlashList
                ref={postFlashListRef}
                data={feedData?.data?.length > 0 ? feedData?.data : [1]}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled
                onEndReachedThreshold={0.7}
                onEndReached={handlePagination}
                ListHeaderComponentStyle={[
                    styles.headerStyle,
                    {
                        marginBottom: feedData?.data?.length ? 12 : undefined,
                    },
                ]}
                contentContainerStyle={styles.containerStyle}
                ItemSeparatorComponent={() => (
                    <View style={{ marginVertical: 6 }} />
                )}
                // ListEmptyComponent={() => {
                //     return (
                //         <View
                //             style={{
                //                 backgroundColor: colors.primary,
                //                 flex: 1,
                //                 justifyContent: "center",
                //                 alignItems: "center",
                //                 borderWidth: 1,
                //                 height: "100%",
                //             }}>
                //             <Text
                //                 style={{
                //                     fontFamily: typography.sfRegular,
                //                     fontSize: 13,
                //                     color: colors["24Color"],
                //                     flex: 1,
                //                 }}>
                //                 HJIO
                //             </Text>
                //         </View>
                //     );
                // }}
                viewabilityConfig={{
                    minimumViewTime: 400,
                    viewAreaCoveragePercentThreshold: 60,
                }}
                onScroll={() => {
                    forScroll.value !== false
                        ? (forScroll.value = false)
                        : true;
                }}
                extraData={viewIndex}
                onViewableItemsChanged={postViewableItem}
                ListFooterComponent={() => {
                    if (feedData?.data?.length) {
                        return (
                            <View style={{ marginBottom: 40 }}>
                                {footerLoader && (
                                    <ActivityIndicator
                                        style={{ marginTop: 20 }}
                                        size={"large"}
                                        color={colors.primary}
                                    />
                                )}
                            </View>
                        );
                    }
                    return null;
                }}
                renderItem={renderPost}
                ListHeaderComponent={FollowerStatus}
                estimatedItemSize={400}
            />
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    rootView: {
        flex: 1,
        backgroundColor: colors.white,
    },
    headerStyle: {
        backgroundColor: colors.white,
        paddingBottom: 20,
    },
    containerStyle: { backgroundColor: colors.f6Color },
});
