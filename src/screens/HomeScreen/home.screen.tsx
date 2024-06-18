import {colors} from "@social/utils/colors";
import {StyleSheet, TouchableWithoutFeedback, View} from "react-native";
import HomeHeader from "./components/HomeHeader";
import FollowerStatus from "./components/FollowerStatus";
import {FlashList} from "@shopify/flash-list";
import PostCard from "./components/PostCard";
import {useCallback, useEffect, useRef, useState} from "react";
import Animated, {useSharedValue} from "react-native-reanimated";
import CommentBox from "./components/CommentBox";

const AnimatedTouchableWithoutFeedback = Animated.createAnimatedComponent(
    TouchableWithoutFeedback,
);

const Home = () => {
    const postFlashListRef = useRef<FlashList<number> | null>(null);

    const forScroll = useSharedValue(false);

    const [viewIndex, setViewIndex] = useState(null);

    const renderPost = ({item, index: postIndex}) => {
        return (
            <PostCard
                forScroll={forScroll}
                viewIndex={viewIndex}
                postIndex={postIndex}
            />
        );
    };

    const postViewableItem = useCallback(info => {
        const viewableItem = info.viewableItems.filter(
            viewable => viewable.isViewable,
        );

        if (viewableItem?.length > 0) {
            setViewIndex(viewableItem[0].index);
        }
    }, []);

    return (
        <View style={styles.rootView}>
            <HomeHeader />
            <FlashList
                ref={postFlashListRef}
                data={[1, 2, 3, 4]}
                nestedScrollEnabled
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
                onViewableItemsChanged={postViewableItem}
                ListFooterComponent={() => <View style={{marginBottom: 40}} />}
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
