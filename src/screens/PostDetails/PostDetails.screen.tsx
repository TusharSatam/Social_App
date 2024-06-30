import { colors } from "@social/utils/colors";
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import { useCallback, useEffect, useRef, useState } from "react";
import Animated, { useSharedValue } from "react-native-reanimated";
import { useGetFeedQuery, useGetSinglePostQuery } from "@social/redux/services/auth/authApi";
import { useSelector } from "react-redux";
import { typography } from "@social/utils/typography";
import { WINDOW_HEIGHT } from "@social/constants/screenSize";
import { useNavigation } from "@react-navigation/native";
import PostCard from "./components/PostCard";

const AnimatedTouchableWithoutFeedback = Animated.createAnimatedComponent(
    TouchableWithoutFeedback,
);

const PostDetails = ({ route }) => {
    const { postId } = route.params;
    console.log("Params postId", postId);

    const postFlashListRef = useRef<FlashList<number> | null>(null);
    const loggedInProfileData = useSelector((state: any) => state.auth);
    const navigation = useNavigation()
    const forScroll = useSharedValue(false);

    const [viewIndex, setViewIndex] = useState(0);
    const [footerLoader, setFooterLoader] = useState(false);
    const [post, setpost] = useState(null)
    // const pageNoRef = useRef(1);
    const [pageNo, setPageNo] = useState(1);

    const {
        isError,
        isFetching,
        isLoading,
        data: feedData,
        refetch
    } = useGetSinglePostQuery({ postId, user: loggedInProfileData?.user?._id });

    useEffect(() => {
        if (feedData && loggedInProfileData?.user?._id) {
            console.log("feedData:", feedData?.post);
            setpost([feedData?.post])
        }
    }, [feedData, loggedInProfileData])

    useEffect(() => {
        refetch()
    }, [postId])


    useEffect(() => {
        if (post) {
            console.log("post:", post);
        }
    }, [post])




    const renderPost = ({ item, index: postIndex }) => {
        if (post?.length < 1) {
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


    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: "center" }}>
                <ActivityIndicator size={"large"} color={colors.primary} />
            </View>
        );
    }

    return (
        <View style={styles.rootView}>
            {post && <PostCard
                forScroll={forScroll}
                viewIndex={viewIndex}
                item={post[0]}
                postIndex={0}
            />}

        </View>
    );
};

export default PostDetails;

const styles = StyleSheet.create({
    rootView: {
        flex: 1,
        backgroundColor: colors.white,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    flashWrap: {
        width: "100%"
    },
    headerStyle: {
        // backgroundColor: colors.white,
        // paddingBottom: 20,
    },
    containerStyle: { backgroundColor: colors.f6Color },
});
