import AmazedIcon from "@social/components/SvgIcons/AmazedIcon";
import BookmarkIcon from "@social/components/SvgIcons/BookmarkIcon";
import CommentIcon from "@social/components/SvgIcons/CommentIcon";
import CryingIcon from "@social/components/SvgIcons/CryingIcon";
import HaloEmojiIcon from "@social/components/SvgIcons/HaloEmojiIcon";
import HeartIcon from "@social/components/SvgIcons/HeartIcon";
import HighlightLike from "@social/components/SvgIcons/HighlightLike";
import LikeThumb from "@social/components/SvgIcons/LikeThumb";
import LolIcon from "@social/components/SvgIcons/LolIcon";
import ShareIcon from "@social/components/SvgIcons/ShareIcon";
import WinkIcon from "@social/components/SvgIcons/WinkIcon";
import {
    useDeletePostMutation,
    useLikePostMutation,
    useSavePostMutation,
} from "@social/redux/services/auth/authApi";
import {colors} from "@social/utils/colors";
import {commonStyles} from "@social/utils/common-styles";
import {helpers} from "@social/utils/helpers";
import {typography} from "@social/utils/typography";
import {useEffect, useState} from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Animated, {SharedValue} from "react-native-reanimated";
import {useSelector} from "react-redux";

interface PostFooterProps {
    showLikeVariant: SharedValue<boolean | number>;
    postIndex: number;
    forScroll: SharedValue<boolean | number>;
    setActivePoint: React.Dispatch<React.SetStateAction<-1 | 0>>;
    showComment: any;
    likeCount: number;
    commentsCount: number;
    likePostFn: (request: {
        userId: string;
        postId: string;
        likeType: string;
    }) => any;
    like: string | null;
    setLike: React.Dispatch<React.SetStateAction<string | null>>;
    id: string;
    likeAs: null | string;
    isPostSaved: boolean;
    localCommentCount: number;
}

const AnimatedTouchaableOpacity =
    Animated.createAnimatedComponent(TouchableOpacity);

const PostFooter = (props: PostFooterProps) => {
    const {
        showLikeVariant,
        postIndex,
        forScroll,
        setActivePoint,
        showComment,
        likeCount,
        commentsCount = 0,
        // likePostFn,
        like,
        setLike,
        id,
        likeAs,
        isPostSaved,
        localCommentCount,
    } = props;

    const loggedInProfileData = useSelector((state: any) => state.auth);
    const [isSavePost, setIsSavePost] = useState(isPostSaved);

    const [likePostFn, {isLoading, isSuccess, isError, status}] =
        useLikePostMutation();

    const [savePostFn] = useSavePostMutation();
    const [deletePostFn] = useDeletePostMutation();

    const deletePost = async () => {
        try {
            setIsSavePost(false);
            const resp = await deletePostFn(id);
        } catch (error) {
            setIsSavePost(null);
        }
    };

    const savePost = async () => {
        try {
            setIsSavePost(true);
            const resp = await savePostFn({
                userId: loggedInProfileData?.user?._id,
                postId: id,
            });
        } catch (error) {
            setIsSavePost(null);
        }
    };

    const likedAPost = async () => {
        try {
            setLike("like");
            const resp = await likePostFn({
                likeType: "like",
                userId: loggedInProfileData?.user?._id,
                postId: id,
            });
        } catch (error) {
            setLike(null);
        }
    };

    const renderLikeBased = likeType => {
        switch (likeType) {
            case "like":
                return <HighlightLike />;

            case "heart":
                return <HeartIcon />;

            case "amazed":
                return <AmazedIcon />;

            case "halo":
                return <HaloEmojiIcon />;

            case "lol":
                return <LolIcon />;

            case "crying":
                return <CryingIcon />;

            case "wink":
                return <WinkIcon />;

            default:
                return <LikeThumb />;
        }
    };

    return (
        <View style={styles.footer}>
            <View style={[commonStyles.rowAlignJustifyBetween, styles.gap]}>
                <AnimatedTouchaableOpacity
                    disabled={!!likeAs || !!like}
                    delayLongPress={200}
                    onPress={() => {
                        if (likeAs) {
                            return;
                        }
                        likedAPost();
                    }}
                    onLongPress={() => {
                        if (likeAs) {
                            return;
                        }
                        forScroll.value = postIndex;
                    }}
                    style={[commonStyles.rowAlignJustifyBetween, styles.smGap]}>
                    {renderLikeBased(likeAs ?? like)}
                    {!!likeCount && (
                        <Text style={styles.footerText}>
                            {helpers.formatNumber(likeCount)}
                        </Text>
                    )}
                </AnimatedTouchaableOpacity>
                <TouchableOpacity
                    onPress={() => showComment()}
                    style={[commonStyles.rowAlignJustifyBetween, styles.smGap]}>
                    <CommentIcon />
                    {(!!commentsCount || !!localCommentCount) && (
                        <Text style={styles.footerText}>
                            {helpers.formatNumber(
                                commentsCount + localCommentCount,
                            )}
                        </Text>
                    )}
                </TouchableOpacity>
            </View>
            <View style={[commonStyles.rowAlignJustifyBetween, styles.gap]}>
                <View>
                    <ShareIcon />
                </View>
                <TouchableOpacity onPress={isSavePost ? deletePost : savePost}>
                    {isSavePost ? (
                        <BookmarkIcon fill={"#3467CE"} stroke={"#FFF"} />
                    ) : (
                        <BookmarkIcon />
                    )}
                </TouchableOpacity>
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
