import {
    BottomSheetFlatList,
    BottomSheetModal,
    BottomSheetView,
} from "@gorhom/bottom-sheet";
import Spacing from "@social/components/Spacing";
import AmazedIcon from "@social/components/SvgIcons/AmazedIcon";
import ClappingIcon from "@social/components/SvgIcons/ClappingIcon";
import FaceWTongue from "@social/components/SvgIcons/FaceWTongue";
import FireIcon from "@social/components/SvgIcons/FireIcon";
import FrownIcon from "@social/components/SvgIcons/FrownIcon";
import HandUpIcon from "@social/components/SvgIcons/HandUpIcon";
import HeartIcon from "@social/components/SvgIcons/HeartIcon";
import LikeHeartIcon from "@social/components/SvgIcons/LikeHeartIcon";
import LolIcon from "@social/components/SvgIcons/LolIcon";
import SendIcon from "@social/components/SvgIcons/SendIcon";
import {
    authApi,
    useAddCommentMutation,
    useGetAllCommentByPostIdQuery,
    useLazyGetAllCommentByPostIdQuery,
    useReplyToCommentMutation,
} from "@social/redux/services/auth/authApi";
import {colors} from "@social/utils/colors";
import {images} from "@social/utils/images";
import {typography} from "@social/utils/typography";
import React, {useEffect, useMemo, useRef, useState} from "react";
import {
    ActivityIndicator,
    Keyboard,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import FastImage from "react-native-fast-image";
import NoComment from "./NoComment";
import {helpers} from "@social/utils/helpers";
import dayjs from "dayjs";
import {ScrollView, FlatList} from "react-native-gesture-handler";
import {useDispatch, useSelector} from "react-redux";
import {toggle} from "@social/redux/Slice/FeedSlice";
import Comment from "./Comment";

const emojiData = [
    {
        element: HeartIcon,
        value: "❤️",
    },
    {
        element: HandUpIcon,
        value: "🙌",
    },
    {
        element: FireIcon,
        value: "🔥",
    },
    {
        element: ClappingIcon,
        value: "👏",
    },
    {
        element: AmazedIcon,
        value: "😍",
    },
    {
        element: FrownIcon,
        value: "🙁",
    },
    {
        element: LolIcon,
        value: "😂",
    },
    {
        element: FaceWTongue,
        value: "😝",
    },
];

interface CommentBoxProps {
    id: string;
    setActivePoint: any;
    activePoint: number;
    closeCommentBox: () => void;
    setLocalCommentCount: React.Dispatch<React.SetStateAction<number>>;
}

const CommentBox = React.forwardRef<BottomSheetModal, CommentBoxProps>(
    (props, ref) => {
        const {
            id,
            setActivePoint,
            activePoint,
            closeCommentBox,
            setLocalCommentCount,
        } = props;
        const loggedInProfileData = useSelector((state: any) => state.auth);

        // const [commentData, setCommentData] = useState([]);
        const snapPoints = useMemo(() => ["65%"], []);
        const [pageNo, setPageNo] = useState(1);
        const [comment, setComment] = useState("");
        const [loading, setLoading] = useState(true);
        const [onMountLoad, setOnMountLoad] = useState(true);
        const [commentIdToReply, setCommentIdToReply] = useState(null);
        const [footerLoading, setFooterLoading] = useState(false);
        const textInputRef = useRef<TextInput>(null);

        const [trigger, result] = useLazyGetAllCommentByPostIdQuery();
        const [addCommentFn, {isLoading: isAddCommentLoading}] =
            useAddCommentMutation();

        const [replyToCommentFn, {isLoading: isReplyToCommentLoading}] =
            useReplyToCommentMutation();

        const renderComment = ({item, index}) => {
            return (
                <Comment
                    setCommentIdToReply={setCommentIdToReply}
                    item={item}
                />
            );
        };

        const {
            isLoading,
            isError,
            data: commentData,
            isUninitialized,
            isFetching,
            refetch,
        } = useGetAllCommentByPostIdQuery(
            {
                postId: id,
                pageNo: pageNo,
                userId: loggedInProfileData?.user?._id,
            },
            {skip: activePoint === -1},
        );

        const handlePagination = () => {
            setOnMountLoad(false);
            if (
                (commentData as {[key: string]: any})?.pagination
                    ?.totalPages === pageNo ||
                (commentData as {[key: string]: any})?.pagination
                    ?.totalPages === 0
            ) {
                setFooterLoading(false);
                return;
            }
            setFooterLoading(true);
            setPageNo(prev => (prev as number) + 1);
        };

        const sendComment = async () => {
            try {
                if (commentIdToReply === null) {
                    const resp = await addCommentFn({
                        postId: id,
                        userId: loggedInProfileData?.user?._id,
                        text: comment,
                    });

                    setLocalCommentCount(prev => prev + 1);
                } else {
                    const resp = await replyToCommentFn({
                        CommentId: commentIdToReply?.id,
                        userId: loggedInProfileData?.user?._id,
                        text: comment,
                    });
                }
            } catch (error) {
                console.log(error);
            } finally {
                setComment("");
                commentIdToReply !== null && setCommentIdToReply(null);
                closeCommentBox();
            }
        };

        // useEffect(() => {
        //     if (activePoint === 0) {
        //         trigger({postId: id, pageNo: pageNo})
        //             .then(data => {
        //                 setCommentData(data.data);
        //             })
        //             .finally(() => {
        //                 setLoading(false);
        //             });
        //     }
        // }, [activePoint, pageNo]);

        useEffect(() => {
            const KeyboardCapture = Keyboard.addListener(
                "keyboardDidHide",
                e => {
                    textInputRef.current?.blur();
                    setCommentIdToReply(null);
                },
            );

            return () => {
                KeyboardCapture.remove();
            };
        }, []);

        useEffect(() => {
            if (commentIdToReply) {
                textInputRef.current?.focus();
            }
        }, [commentIdToReply]);

        return (
            <BottomSheetModal
                enableContentPanningGesture={false}
                keyboardBehavior="fillParent"
                android_keyboardInputMode="adjustResize"
                ref={ref}
                style={{flex: 1}}
                index={0}
                handleIndicatorStyle={{
                    width: "30%",
                    height: 3,
                    backgroundColor: "#F1F1F1",
                }}
                enablePanDownToClose
                snapPoints={snapPoints}
                onChange={e => {
                    pageNo !== 1 && setPageNo(1);
                    onMountLoad === false && setOnMountLoad(false);
                    setActivePoint(e);
                }}>
                <BottomSheetView style={styles.contentContainer}>
                    <Text
                        style={{
                            fontSize: 18,
                            fontFamily: typography.sfSemiBold,
                            color: colors["24Color"],
                        }}>
                        Comments
                    </Text>
                </BottomSheetView>
                {(isLoading || isFetching) && onMountLoad ? (
                    <View style={{flex: 1, justifyContent: "center"}}>
                        <ActivityIndicator
                            size={"large"}
                            color={colors.primary}
                        />
                    </View>
                ) : (
                    <>
                        <FlatList
                            style={{flex: 1}}
                            ItemSeparatorComponent={() => <Spacing />}
                            contentContainerStyle={{flexGrow: 1, marginTop: 20}}
                            data={commentData?.data}
                            onEndReachedThreshold={0.8}
                            onEndReached={handlePagination}
                            ListEmptyComponent={() => <NoComment />}
                            ListFooterComponent={() => (
                                <View style={{marginBottom: 40}}>
                                    {footerLoading && (
                                        <ActivityIndicator
                                            size={"small"}
                                            color={colors.primary}
                                        />
                                    )}
                                </View>
                            )}
                            renderItem={renderComment}
                        />

                        <View
                            pointerEvents={
                                isAddCommentLoading || isReplyToCommentLoading
                                    ? "none"
                                    : "auto"
                            }
                            style={[
                                styles.textInputRoot,
                                {
                                    opacity:
                                        isAddCommentLoading ||
                                        isReplyToCommentLoading
                                            ? 0.2
                                            : 1,
                                },
                            ]}>
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: 22,
                                    paddingHorizontal: 12,
                                    paddingBottom: 16,
                                }}>
                                {emojiData.map((item, index) => {
                                    return (
                                        <TouchableOpacity
                                            onPress={() =>
                                                setComment(
                                                    prev => prev + item.value,
                                                )
                                            }
                                            key={index}>
                                            {React.createElement(item.element, {
                                                width: 20,
                                                height: 20,
                                            })}
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>
                            {commentIdToReply !== null && (
                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                    }}>
                                    <Text
                                        style={{
                                            fontFamily: typography.sfRegular,
                                            fontSize: 14,
                                            color: colors["24Color"],
                                            marginBottom: 6,
                                            paddingHorizontal: 5,
                                        }}>
                                        Replying to : {commentIdToReply.name}
                                    </Text>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setCommentIdToReply(null);
                                            setComment("");
                                        }}>
                                        <Text
                                            style={{
                                                fontFamily: typography.sfBold,
                                                fontSize: 14,
                                                color: colors["24Color"],
                                                marginBottom: 6,
                                                paddingHorizontal: 5,
                                            }}>
                                            X
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                            <View style={styles.textInputContainer}>
                                <TextInput
                                    ref={textInputRef}
                                    placeholder="Add a comment..."
                                    value={comment}
                                    onChangeText={e => setComment(e)}
                                    placeholderTextColor={colors.lightText}
                                    style={styles.textInputStyle}
                                />
                                <TouchableOpacity onPress={() => sendComment()}>
                                    <SendIcon height={16} width={16} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </>
                )}
            </BottomSheetModal>
        );
    },
);

export default CommentBox;

const styles = StyleSheet.create({
    textInputRoot: {
        paddingTop: 18,
        borderColor: colors.lightText,
        paddingHorizontal: 23,
        justifyContent: "flex-end",
        backgroundColor: colors.white,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        paddingBottom: 22,
    },
    textInputContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 10,
        backgroundColor: colors.f6Color,
        height: 42,
        paddingHorizontal: 12,
    },
    textInputStyle: {
        padding: 0,
        margin: 0,
        flex: 1,
        paddingHorizontal: 10,
        fontFamily: typography.sfRegular,
        fontSize: 14,
        color: colors["24Color"],
    },
    container: {
        flex: 1,
        padding: 24,
        justifyContent: "center",
        backgroundColor: "grey",
    },
    contentContainer: {
        paddingTop: 20,
        paddingBottom: 12,
        alignItems: "center",
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: "#F1F1F1",
    },
    profileIcon: {
        width: 40,
        aspectRatio: 1,
        borderRadius: 40 / 2,
    },
    userName: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
    },
    userText: {
        fontFamily: typography.sfSemiBold,
        fontSize: 13,
        color: colors["24Color"],
    },
    pinnedText: {
        fontFamily: typography.sfSemiBold,
        fontSize: 11,
        color: colors.lightText,
    },
    comments: {
        flex: 1,
        fontFamily: typography.sfRegular,
        fontSize: 13,
        color: colors["24Color"],
    },
    likeNReply: {
        flexDirection: "row",
        alignItems: "center",
        gap: 15,
        marginTop: 6,
    },
    likes: {
        fontFamily: typography.sfRegular,
        fontSize: 11,
        color: colors.lightText,
    },
    reply: {
        fontFamily: typography.sfRegular,
        fontSize: 11,
        color: colors.lightText,
    },
    viewMoreReplies: {
        flexDirection: "row",
        alignItems: "center",
        gap: 15,
        marginTop: 6,
    },
    moreRepliesText: {
        fontFamily: typography.sfRegular,
        fontSize: 11,
        color: colors.lightText,
    },
});
