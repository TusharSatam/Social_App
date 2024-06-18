import AmazedIcon from "@social/components/SvgIcons/AmazedIcon";
import HaloEmojiIcon from "@social/components/SvgIcons/HaloEmojiIcon";
import HeartIcon from "@social/components/SvgIcons/HeartIcon";
import {colors} from "@social/utils/colors";
import {commonStyles} from "@social/utils/common-styles";
import {typography} from "@social/utils/typography";
import {StyleSheet, Text, View} from "react-native";
import PostFooter from "./PostFooter";
import PostHeader from "./PostHeader";
import Carousel, {ICarouselInstance} from "react-native-reanimated-carousel";
import {BottomSheetModal, WINDOW_WIDTH} from "@gorhom/bottom-sheet";
import FastImage from "react-native-fast-image";
import Video from "react-native-video";
import {useCallback, useEffect, useRef, useState} from "react";
import Pagination from "./Pagination";
import {
    SharedValue,
    useDerivedValue,
    useSharedValue,
} from "react-native-reanimated";
import LikeVariants from "./LikeVariants";
import CommentBox from "./CommentBox";

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
    forScroll: SharedValue<boolean | number>;
}

const PostCard = (props: PostCardProps) => {
    const {viewIndex, postIndex, forScroll} = props;
    const [carouselIndex, setCarouselIndex] = useState(0);
    const [activeDotIndex, setActiveDotIndex] = useState(0);
    const [activePoint, setActivePoint] = useState(-1);

    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    const showLikeVariant = useDerivedValue(() => {
        return forScroll.value;
    });

    const showComment = () => {
        bottomSheetModalRef.current.present();
    };

    const carouselRef = useRef<ICarouselInstance | null>(null);

    const renderMedia = useCallback(
        ({item, index}) => {
            if (item.type === "image") {
                return (
                    <FastImage
                        source={{uri: item.media}}
                        style={{flex: 1}}
                        resizeMode={FastImage.resizeMode.contain}
                    />
                );
            }
            if (item.type === "video" && index === carouselIndex) {
                return (
                    <Video
                        paused={viewIndex !== postIndex}
                        source={{uri: item.media}}
                        repeat
                        style={{
                            flex: 1,
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
            {/* <CommentBox ref={bottomSheetModalRef} />

            <LikeVariants
                postIndex={postIndex}
                showLikeVariant={showLikeVariant}
                forScroll={forScroll}
            /> */}
            <PostHeader />
            <View style={[styles.postMain]}>
                <Carousel
                    ref={carouselRef}
                    style={{flex: 1}}
                    data={[
                        {type: "image", media: IMAGE1},
                        {type: "image", media: IMAGE2},
                        {type: "video", media: VIDEO2},
                    ]}
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
                <Pagination length={3} activeDotIndex={activeDotIndex} />
            </View>
            <View style={styles.postCaption}>
                <View style={[styles.likedBy]}>
                    <View
                        style={[
                            commonStyles.rowAlignJustifyBetween,
                            {
                                gap: 2,
                            },
                        ]}>
                        <HeartIcon width={13} height={13} />
                        <AmazedIcon width={13} height={13} />
                        <HaloEmojiIcon width={13} height={13} />
                    </View>
                    <View>
                        <Text
                            style={{
                                fontFamily: typography.sfRegular,
                                fontSize: 13,
                                color: colors["26Color"],
                            }}>
                            by{" "}
                            <Text style={{fontFamily: typography.sfSemiBold}}>
                                craig_love
                            </Text>{" "}
                            and{" "}
                            <Text style={{fontFamily: typography.sfSemiBold}}>
                                44,86 others
                            </Text>
                        </Text>
                    </View>
                </View>

                <View style={styles.captionWritten}>
                    <Text style={styles.captionWrittenBy}>
                        joshua_l{" "}
                        <Text style={styles.captionText}>
                            The game in Japan was amazing and I want to share
                            some photos
                        </Text>
                    </Text>
                </View>
            </View>
            <View style={styles.line}></View>
            <PostFooter
                forScroll={forScroll}
                postIndex={postIndex}
                showComment={showComment}
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
