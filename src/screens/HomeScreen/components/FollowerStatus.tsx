import {StyleSheet, Text, View} from "react-native";
import React from "react";
import {commonStyles} from "@social/utils/common-styles";
import {FlashList} from "@shopify/flash-list";
import {images} from "@social/utils/images";
import FastImage from "react-native-fast-image";
import {typography} from "@social/utils/typography";
import {colors} from "@social/utils/colors";
import Spacing from "@social/components/Spacing";

const data = [
    {
        label: "Your Story",
        img: images.me,
    },
    {
        label: "karennne",
        img: images.user1,
    },
    {
        label: "zackjohn",
        img: images.user2,
    },
    {
        label: "karennne",
        img: images.user1,
    },
    {
        label: "zackjohn",
        img: images.user2,
    },
];

const FollowerStatus = () => {
    const renderFollower = ({item}) => {
        return (
            <View
                style={{
                    alignItems: "center",
                    gap: 5,
                }}>
                <View
                    style={{
                        borderWidth: 2,
                        padding: 2,
                        borderRadius: 60,
                        borderColor: "#FF4D67",
                    }}>
                    <FastImage style={styles.userImg} source={item.img} />
                </View>
                <Text style={styles.labelTxt}>{item.label}</Text>
            </View>
        );
    };

    return (
        <View style={styles.rootView}>
            <FlashList
                data={data}
                contentContainerStyle={{paddingHorizontal: 12}}
                horizontal
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => (
                    <View style={{paddingHorizontal: 10}} />
                )}
                // ItemSeparatorComponent={() => <Spacing size={6} />}
                estimatedItemSize={70}
                renderItem={renderFollower}
            />
        </View>
    );
};

export default FollowerStatus;

const styles = StyleSheet.create({
    rootView: {},
    userImg: {
        aspectRatio: 1,
        height: 66,
    },
    labelTxt: {
        fontSize: 12,
        fontFamily: typography.sfRegular,
        color: colors.black,
    },
});
