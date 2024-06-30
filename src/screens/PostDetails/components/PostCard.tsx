import AmazedIcon from "@social/components/SvgIcons/AmazedIcon";
import HaloEmojiIcon from "@social/components/SvgIcons/HaloEmojiIcon";
import HeartIcon from "@social/components/SvgIcons/HeartIcon";
import { colors } from "@social/utils/colors";
import { commonStyles } from "@social/utils/common-styles";
import { typography } from "@social/utils/typography";
import { Keyboard, StyleSheet, Text, View } from "react-native";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import { BottomSheetModal, WINDOW_WIDTH } from "@gorhom/bottom-sheet";
import FastImage from "react-native-fast-image";
import Video from "react-native-video";
import { useCallback, useEffect, useRef, useState } from "react";
import {
    SharedValue,
    useDerivedValue,
    useSharedValue,
} from "react-native-reanimated";
import { useLikePostMutation } from "@social/redux/services/auth/authApi";
import LikeThumb from "@social/components/SvgIcons/LikeThumb";
import LolIcon from "@social/components/SvgIcons/LolIcon";
import CryingIcon from "@social/components/SvgIcons/CryingIcon";
import WinkIcon from "@social/components/SvgIcons/WinkIcon";
import HighlightLike from "@social/components/SvgIcons/HighlightLike";
import CommentBox from "./CommentBox";
import LikeVariants from "./LikeVariants";
import PostHeader from "./PostHeader";
import Pagination from "./Pagination";
import PostFooter from "./PostFooter";

const VIDEO =
    "https://videos.pexels.com/video-files/24821519/11898319_1280_720_30fps.mp4";

const VIDEO2 =
    "https://videos.pexels.com/video-files/11580340/11580340-hd_1080_1920_25fps.mp4";

const IMAGE1 =
    "https://images.pexels.com/photos/17565977/pexels-photo-17565977/free-photo-of-legs-in-striped-socks-and-sneakers.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

const IMAGE2 =
    "https://images.pexels.com/photos/25477056/pexels-photo-25477056/free-photo-of-snow-leopard-lying-down.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

interface PostCardProps {
    viewIndex: null | number;
    postIndex: number;
    item: any;
    forScroll: SharedValue<boolean | number>;
}

const PostCard = (props: PostCardProps) => {
    const { viewIndex, postIndex, forScroll, item } = props;
    const [carouselIndex, setCarouselIndex] = useState(0);
    const [activeDotIndex, setActiveDotIndex] = useState(0);
    const [activePoint, setActivePoint] = useState(-1);

    const [like, setLike] = useState(null);
    const [likePostFn, { isLoading, isSuccess, isError }] = useLikePostMutation();
    const [localCommentCount, setLocalCommentCount] = useState(0);

    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    const showLikeVariant = useDerivedValue(() => {
        return forScroll.value;
    });

    const showComment = () => {
        setActivePoint(0);
        bottomSheetModalRef?.current?.present();
    };

    const closeCommentBox = () => {
        Keyboard.dismiss();
        setTimeout(() => {
            bottomSheetModalRef?.current?.close();
        }, 500);
    };

    const renderLikeBased = likeType => {
        switch (likeType) {
            case "like":
                return <HighlightLike height={15} width={15} />;

            case "heart":
                return <HeartIcon height={15} width={15} />;

            case "amazed":
                return <AmazedIcon height={15} width={15} />;

            case "halo":
                return <HaloEmojiIcon height={15} width={15} />;

            case "lol":
                return <LolIcon height={15} width={15} />;

            case "crying":
                return <CryingIcon height={15} width={15} />;

            case "wink":
                return <WinkIcon height={15} width={15} />;

            default:
                return null;
        }
    };

    const carouselRef = useRef<ICarouselInstance | null>(null);

    const renderMedia = useCallback(
        ({ item, index }) => {
            if (item.mimetype.split("/")[0] === "image") {
                return (
                    <FastImage
                        source={{ uri: item.url }}
                        style={{ flex: 1, backgroundColor: colors.black }}
                        resizeMode={FastImage.resizeMode.contain}
                    />
                );
            }
            if (
                item.mimetype.split("/")[0] === "video" &&
                index === carouselIndex
            ) {
                return (
                    <Video
                        paused={viewIndex !== postIndex}
                        source={{ uri: item?.url }}
                        repeat
                        style={{
                            flex: 1,
                            backgroundColor: colors.black,
                        }}
                    />
                );
            }
            return null;
        },
        [carouselIndex, viewIndex],
    );

    return (
        <View style={styles.rootView}>
            <CommentBox
                ref={bottomSheetModalRef}
                id={item._id}
                setLocalCommentCount={setLocalCommentCount}
                closeCommentBox={closeCommentBox}
                activePoint={activePoint}
                setActivePoint={setActivePoint}
            />

            <LikeVariants
                postIndex={postIndex}
                id={item._id}
                like={like}
                setLike={setLike}
                showLikeVariant={showLikeVariant}
                forScroll={forScroll}
            />
            <PostHeader
                profileImg={item?.user?.ProfilePicture}
                userName={item?.user?.username ? item?.user?.username : item?.user?.name}
                location={item?.location}
                time={item?.createdAt}
                userId={item?.user?.userId}
            />
            <View style={[styles.postMain]}>
                <Carousel
                    ref={carouselRef}
                    style={{ flex: 1 }}
                    data={item?.Media}
                    renderItem={renderMedia}
                    width={WINDOW_WIDTH - 24}
                    pagingEnabled
                    panGestureHandlerProps={{
                        activeOffsetX: [-10, 10],
                    }}
                    loop={false}
                    onSnapToItem={index => {
                        setCarouselIndex(index);
                    }}
                    onProgressChange={(_, absoluteProgress) => {
                        setActiveDotIndex(Math.round(absoluteProgress));
                    }}
                />
                {item?.Media?.length > 1 && (
                    <Pagination
                        length={item?.Media?.length}
                        activeDotIndex={activeDotIndex}
                    />
                )}
            </View>
            <View style={styles.postCaption}>
                {!!item?.likesCount && (
                    <View style={[styles.likedBy]}>
                        <View
                            style={[
                                commonStyles.rowAlignJustifyBetween,
                                {
                                    gap: 2,
                                },
                            ]}>
                            {renderLikeBased(item.likes?.[0]?.type)}
                            {renderLikeBased(item.likes?.[1]?.type)}
                            {renderLikeBased(item.likes?.[2]?.type)}
                        </View>

                        <View>
                            <Text
                                style={{
                                    fontFamily: typography.sfRegular,
                                    fontSize: 13,
                                    color: colors["26Color"],
                                }}>
                                by{" "}
                                <Text
                                    style={{ fontFamily: typography.sfSemiBold }}>
                                    {item.likeAs
                                        ? "You"
                                        : item.likes?.[0]?.likedBy?.username}
                                </Text>{" "}
                                {item.likeAs && item.likesCount === 1 ? null : (
                                    <Text
                                        style={{
                                            fontFamily: typography.sfSemiBold,
                                        }}>
                                        {item.likesCount > 1
                                            ? `and ${item.likesCount - 1}`
                                            : null}
                                    </Text>
                                )}
                            </Text>
                        </View>
                    </View>
                )}

                {!!item?.caption && (
                    <View style={styles.captionWritten}>
                        <Text style={styles.captionWrittenBy}>
                            {item?.user?.username}{" "}
                            <Text style={styles.captionText}>
                                {item?.caption}
                            </Text>
                        </Text>
                    </View>
                )}
            </View>
            <View style={styles.line}></View>
            <PostFooter
                id={item._id}
                forScroll={forScroll}
                isPostSaved={item?.isPostSaved}
                postIndex={postIndex}
                likeCount={item?.likesCount ?? 0}
                commentsCount={item?.commentsCount ?? 0}
                showComment={showComment}
                localCommentCount={localCommentCount}
                likePostFn={likePostFn}
                like={like}
                setLike={setLike}
                likeAs={item.likeAs}
                setActivePoint={setActivePoint}
                showLikeVariant={showLikeVariant}
            />
        </View>
    );
};

export default PostCard;

const styles = StyleSheet.create({
    captionText: {
        fontSize: 13,
        fontFamily: typography.sfRegular,
        color: colors["26Color"],
    },

    captionWrittenBy: {
        fontSize: 13,
        fontFamily: typography.sfSemiBold,
        color: colors["26Color"],
    },

    captionWritten: {},
    likedBy: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginBottom: 3,
    },
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
    line: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: colors.F1Color,
    },
    userName: {
        fontFamily: typography.sfSemiBold,
        fontSize: 13,
        color: colors["26Color"],
    },
    userInfo: {
        fontFamily: typography.sfRegular,
        fontSize: 11,
        color: colors["24Color"],
    },
    rootView: {
        height: 500,
        marginHorizontal: 12,
        borderRadius: 14,
        backgroundColor: colors.white,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
    },
    postHeader: {
        paddingHorizontal: 12,
        paddingTop: 14,
        paddingBottom: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    postMain: {
        flex: 1,
    },
    postCaption: {
        paddingHorizontal: 12,
        paddingVertical: 9,
    },
    footer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 12,
        paddingVertical: 13,
    },
});
