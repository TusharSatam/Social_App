import {StyleSheet, Text, View} from "react-native";
import React from "react";

const GenericHeader = props => {
    const {children} = props;

    return children;
};

export default GenericHeader;

const styles = StyleSheet.create({
    root: {
        height: 40,
        borderWidth: 1,
        flexDirection: "row",
        justifyContent: "space-between",
    },
});
