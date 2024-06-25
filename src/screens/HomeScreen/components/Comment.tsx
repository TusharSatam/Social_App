import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {useCallback, useState} from "react";
import FastImage from "react-native-fast-image";
import {helpers} from "@social/utils/helpers";
import LikeHeartIcon from "@social/components/SvgIcons/LikeHeartIcon";
import {typography} from "@social/utils/typography";
import {colors} from "@social/utils/colors";
import dayjs from "dayjs";
import {useSelector} from "react-redux";
import {useLikeCommentMutation} from "@social/redux/services/auth/authApi";
import RedLike from "@social/components/SvgIcons/RedLike";
import Replies from "./Replies";

const Comment = props => {
    const {item, setCommentIdToReply} = props;
    const loggedInProfileData = useSelector((state: any) => state.auth);

    const [likeCommentFn] = useLikeCommentMutation();

    const [isLike, setIsLike] = useState(item?.isCommentLiked ?? false);
    const [toogleReplies, setToggleReplies] = useState(false);

    const onLikeComment = async () => {
        try {
            setIsLike(true);
            const resp = await likeCommentFn({
                userId: loggedInProfileData?.user?._id,
                commentId: item?._id,
            });

            console.log(resp);
        } catch (error) {
            item?.isCommentLiked ? false : setIsLike(false);
        }
    };

    return (
        <View
            style={{
                marginHorizontal: 16,
                flexDirection: "row",
                gap: 10,
            }}>
            <View>
                <FastImage
                    resizeMode={FastImage.resizeMode.cover}
                    source={{uri: item?.author?.ProfilePicture}}
                    style={styles.profileIcon}
                />
            </View>
            <View style={{flex: 0.97}}>
                <View style={styles.userName}>
                    <Text style={styles.userText}>{item?.author?.Name}</Text>
                    <Text style={styles.pinnedText}>
                        {helpers.timeDifference(
                            dayjs(),
                            dayjs(item?.createdAt),
                        )}
                    </Text>
                </View>
                <View style={{flex: 1}}>
                    <Text style={styles.comments}>{item?.text}</Text>
                    <View style={styles.likeNReply}>
                        {!!item?.likes?.length && (
                            <Text style={styles.likes}>
                                {helpers.formatNumber(item?.likes?.length)}{" "}
                                likes
                            </Text>
                        )}
                        <TouchableOpacity
                            onPress={() =>
                                setCommentIdToReply({
                                    id: item?._id,
                                    name: item?.author?.Name,
                                })
                            }>
                            <Text style={styles.reply}>Reply</Text>
                        </TouchableOpacity>
                    </View>
                    {!!item?.replies?.length && (
                        <TouchableOpacity
                            onPress={() => setToggleReplies(!toogleReplies)}
                            style={[
                                styles.viewMoreReplies,
                                {
                                    alignContent: "flex-start",
                                    alignSelf: "flex-start",
                                },
                            ]}>
                            <Text style={styles.moreRepliesText}>
                                {toogleReplies ? "Hide" : "View"}{" "}
                                {helpers.formatNumber(item?.replies?.length)}{" "}
                                more replies
                            </Text>
                        </TouchableOpacity>
                    )}
                    {toogleReplies && (
                        <View style={{marginVertical: 5}}>
                            {item?.replies.map((reply, index) => {
                                return (
                                    <Replies
                                        key={`${item?._id} + ${index}}`}
                                        item={reply}
                                    />
                                );
                            })}
                        </View>
                    )}
                </View>
            </View>
            <TouchableOpacity disabled={isLike} onPress={onLikeComment}>
                {isLike ? (
                    <RedLike width={13} height={13} />
                ) : (
                    <LikeHeartIcon width={13} height={13} />
                )}
            </TouchableOpacity>
        </View>
    );
};

export default Comment;

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
