import {StyleSheet, Text, View} from "react-native";
import React, {useEffect} from "react";
import FastImage from "react-native-fast-image";
import {images} from "@social/utils/images";
import ThreeDot from "@social/components/SvgIcons/ThreeDot";
import {typography} from "@social/utils/typography";
import {colors} from "@social/utils/colors";
import dayjs from "dayjs";

const PostHeader = props => {
    const {profileImg, userName, location, time} = props;

    const timeDifference = (current, previous) => {
        const msPerSecond = 1000;
        const msPerMinute = msPerSecond * 60;
        const msPerHour = msPerMinute * 60;
        const msPerDay = msPerHour * 24;

        const elapsed = current - previous;

        if (elapsed === 0) {
            return null;
        } else if (elapsed < msPerMinute) {
            return Math.round(elapsed / msPerSecond) + " seconds ago";
        } else if (elapsed < msPerHour) {
            return Math.round(elapsed / msPerMinute) + " minutes ago";
        } else if (elapsed < msPerDay) {
            return Math.round(elapsed / msPerHour) + " hours ago";
        } else {
            return Math.round(elapsed / msPerDay) + " days ago";
        }
    };

    return (
        <View style={styles.postHeader}>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                }}>
                <FastImage
                    source={{uri: profileImg}}
                    resizeMode={FastImage.resizeMode.cover}
                    style={{aspectRatio: 1, height: 40, borderRadius: 40 / 2}}
                />
                <View>
                    <Text style={styles.userName}>{userName}</Text>
                    <Text style={styles.userInfo}>
                        {location} {!!location && " - "}
                        {timeDifference(dayjs(), dayjs(time))}
                    </Text>
                </View>
            </View>
            <View>
                <ThreeDot />
            </View>
        </View>
    );
};

export default PostHeader;

const styles = StyleSheet.create({
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
    postHeader: {
        paddingHorizontal: 14,
        paddingTop: 14,
        paddingBottom: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
});
