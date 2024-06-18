import {ViewStyle} from "react-native";

type Key = "rowAlignJustifyCenter" | "rowAlignJustifyBetween" | "commonHrSpace";

const commonStyles: Record<Key, ViewStyle> = {
    rowAlignJustifyCenter: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    rowAlignJustifyBetween: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    commonHrSpace: {
        marginHorizontal: 13,
    },
};

export {commonStyles};
