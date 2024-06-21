import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {typography} from "@social/utils/typography";
import {colors} from "@social/utils/colors";
import BellIcon from "@social/components/SvgIcons/BellIcon";
import ChatIcon from "@social/components/SvgIcons/ChatIcon";
import {commonStyles} from "@social/utils/common-styles";
import {useNavigation} from "@react-navigation/native";

const HomeHeader = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.headerView}>
            <View>
                <Text style={styles.headerText}>Voodle</Text>
            </View>
            <View style={styles.iconView}>
                <TouchableOpacity
                    onPress={
                        () => {}
                        // (navigation as any).navigate("Notification")
                    }>
                    <BellIcon width={25} height={25} />
                </TouchableOpacity>
                <View>
                    <ChatIcon width={25} height={25} />
                </View>
            </View>
        </View>
    );
};

export default HomeHeader;

const styles = StyleSheet.create({
    headerView: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 10,
        ...commonStyles.commonHrSpace,
    },

    headerText: {
        fontSize: 30,
        fontFamily: typography.risqueRegular,
        color: colors.black,
    },
    iconView: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
    },
});
