import BookmarkIcon from "@social/components/SvgIcons/BookmarkIcon";
import CommentIcon from "@social/components/SvgIcons/CommentIcon";
import LikeThumb from "@social/components/SvgIcons/LikeThumb";
import ShareIcon from "@social/components/SvgIcons/ShareIcon";
import {colors} from "@social/utils/colors";
import {commonStyles} from "@social/utils/common-styles";
import {typography} from "@social/utils/typography";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Animated, {SharedValue} from "react-native-reanimated";

interface PostFooterProps {
    showLikeVariant: SharedValue<boolean | number>;
    postIndex: number;
    forScroll: SharedValue<boolean | number>;
    setActivePoint: React.Dispatch<React.SetStateAction<-1 | 0>>;
    showComment: any;
}

const AnimatedTouchaableOpacity =
    Animated.createAnimatedComponent(TouchableOpacity);

const PostFooter = (props: PostFooterProps) => {
    const {showLikeVariant, postIndex, forScroll, setActivePoint, showComment} =
        props;

    return (
        <View style={styles.footer}>
            <View style={[commonStyles.rowAlignJustifyBetween, styles.gap]}>
                <AnimatedTouchaableOpacity
                    delayLongPress={200}
                    onPress={() => console.log(postIndex)}
                    onLongPress={() => {
                        forScroll.value = postIndex;
                    }}
                    style={[commonStyles.rowAlignJustifyBetween, styles.smGap]}>
                    <LikeThumb />
                    <Text style={styles.footerText}>22.2K</Text>
                </AnimatedTouchaableOpacity>
                <TouchableOpacity
                    onPress={() => showComment()}
                    style={[commonStyles.rowAlignJustifyBetween, styles.smGap]}>
                    <CommentIcon />
                    <Text style={styles.footerText}>8,123</Text>
                </TouchableOpacity>
            </View>
            <View style={[commonStyles.rowAlignJustifyBetween, styles.gap]}>
                <View>
                    <ShareIcon />
                </View>
                <View>
                    <BookmarkIcon />
                </View>
            </View>
        </View>
    );
};

export default PostFooter;

const styles = StyleSheet.create({
    footerText: {
        fontSize: 14,
        fontFamily: typography.sfRegular,
        color: colors["24Color"],
        fontWeight: "400",
    },
    smGap: {
        gap: 6,
    },
    gap: {
        gap: 16,
    },
    footer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 12,
        paddingVertical: 13,
    },
});
