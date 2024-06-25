import {StyleSheet, Text, View} from "react-native";
import React from "react";
import {helpers} from "@social/utils/helpers";
import dayjs from "dayjs";
import FastImage from "react-native-fast-image";
import {typography} from "@social/utils/typography";
import {colors} from "@social/utils/colors";

const Replies = props => {
    const {item} = props;

    return (
        <View
            style={{
                marginHorizontal: 0,
                flexDirection: "row",
                gap: 5,
                marginVertical: 3,
            }}>
            <View>
                <FastImage
                    resizeMode={FastImage.resizeMode.cover}
                    source={{uri: item?.commentedBy?.ProfilePicture}}
                    style={styles.profileIcon}
                />
            </View>
            <View style={{flex: 0.97}}>
                <View style={styles.userName}>
                    <Text style={styles.userText}>
                        {item?.commentedBy?.Name}
                    </Text>
                    <Text style={styles.pinnedText}>
                        {helpers.timeDifference(
                            dayjs(),
                            dayjs(item?.createdAt),
                        )}
                    </Text>
                </View>
                <View style={{flex: 1}}>
                    <Text style={styles.comments}>{item?.text}</Text>
                </View>
            </View>
        </View>
    );
};

export default Replies;

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
        width: 20,
        aspectRatio: 1,
        borderRadius: 20 / 2,
    },
    userName: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
    },
    userText: {
        fontFamily: typography.sfSemiBold,
        fontSize: 12,
        color: colors["24Color"],
    },
    pinnedText: {
        fontFamily: typography.sfSemiBold,
        fontSize: 10,
        color: colors.lightText,
    },
    comments: {
        flex: 1,
        fontFamily: typography.sfRegular,
        fontSize: 12,
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
