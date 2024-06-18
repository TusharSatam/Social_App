import {StyleSheet, Text, View} from "react-native";
import React from "react";
import FastImage from "react-native-fast-image";
import {images} from "@social/utils/images";
import ThreeDot from "@social/components/SvgIcons/ThreeDot";
import {typography} from "@social/utils/typography";
import {colors} from "@social/utils/colors";

const PostHeader = () => {
    return (
        <View style={styles.postHeader}>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                }}>
                <FastImage
                    source={images.user1}
                    resizeMode={FastImage.resizeMode.contain}
                    style={{aspectRatio: 1, height: 40}}
                />
                <View>
                    <Text style={styles.userName}>joshua_l</Text>
                    <Text style={styles.userInfo}>
                        Tokyo, Japan - 1 mins. ago
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
