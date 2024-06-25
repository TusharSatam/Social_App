import {colors} from "@social/utils/colors";
import {
    ActivityIndicator,
    StyleSheet,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import HomeHeader from "./components/HomeHeader";
import FollowerStatus from "./components/FollowerStatus";
import {FlashList} from "@shopify/flash-list";
import PostCard from "./components/PostCard";
import {useCallback, useEffect, useRef, useState} from "react";
import Animated, {useSharedValue} from "react-native-reanimated";
import CommentBox from "./components/CommentBox";
import {useGetFeedQuery} from "@social/redux/services/auth/authApi";
import {useSelector} from "react-redux";
import dayjs from "dayjs";

const AnimatedTouchableWithoutFeedback = Animated.createAnimatedComponent(
    TouchableWithoutFeedback,
);

const Home = () => {
    const postFlashListRef = useRef<FlashList<number> | null>(null);
    const loggedInProfileData = useSelector((state: any) => state.auth);

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
    } = useGetFeedQuery({id: loggedInProfileData?.user?._id, pageNo: pageNo});

    const renderPost = ({item, index: postIndex}) => {
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
        if (feedData?.pagination?.totalPages === pageNo) {
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

    if (isLoading) {
        return (
            <View style={{flex: 1, justifyContent: "center"}}>
                <ActivityIndicator size={"large"} color={colors.primary} />
            </View>
        );
    }

    return (
        <View style={styles.rootView}>
            <HomeHeader />
            <FlashList
                ref={postFlashListRef}
                data={feedData?.data}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled
                onEndReachedThreshold={0.7}
                onEndReached={handlePagination}
                ListHeaderComponentStyle={styles.headerStyle}
                contentContainerStyle={styles.containerStyle}
                ItemSeparatorComponent={() => (
                    <View style={{marginVertical: 6}} />
                )}
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
                ListFooterComponent={() => (
                    <View style={{marginBottom: 40}}>
                        {footerLoader && (
                            <ActivityIndicator
                                style={{marginTop: 20}}
                                size={"large"}
                                color={colors.primary}
                            />
                        )}
                    </View>
                )}
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
        marginBottom: 12,
    },
    containerStyle: {backgroundColor: colors.f6Color},
});
