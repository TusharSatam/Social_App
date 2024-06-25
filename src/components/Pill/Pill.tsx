import {
    StyleSheet,
    Text,
    TextStyle,
    TouchableOpacity,
    View,
    ViewStyle,
} from "react-native";
import React from "react";
import {typography} from "@social/utils/typography";

interface PillProps {
    rootView?: ViewStyle;
    textStyle?: TextStyle;
    text: string;
}

const Pill = (props: PillProps) => {
    const {rootView, textStyle, text} = props;

    return (
        <TouchableOpacity style={[styles.rootView, rootView]}>
            <Text style={[styles.textStyle, textStyle]}>{text}</Text>
        </TouchableOpacity>
    );
};

export default Pill;

const styles = StyleSheet.create({
    rootView: {
        width: 90,
        paddingVertical: 6,
        borderRadius: 100,
        alignSelf: "center",
        alignItems: "center",
    },
    textStyle: {
        fontFamily: typography.sfSemiBold,
        fontSize: 14,
    },
});
