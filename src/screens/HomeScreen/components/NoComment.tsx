import {StyleSheet, Text, View} from "react-native";
import React from "react";
import {typography} from "@social/utils/typography";
import {colors} from "@social/utils/colors";

const NoComment = () => {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}>
            <Text style={styles.comments}>No Comments</Text>
        </View>
    );
};

export default NoComment;

const styles = StyleSheet.create({
    comments: {
        fontFamily: typography.sfSemiBold,
        fontSize: 13,
        color: colors["24Color"],
    },
});
