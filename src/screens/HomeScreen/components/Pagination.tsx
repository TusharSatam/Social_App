import {StyleSheet, Text, View} from "react-native";
import React, {useState} from "react";
import AnimatedDotsCarousel from "react-native-animated-dots-carousel";
import {colors} from "@social/utils/colors";

const Pagination = props => {
    const {length, activeDotIndex} = props;

    return (
        <View style={styles.rootView}>
            <AnimatedDotsCarousel
                length={length}
                currentIndex={activeDotIndex}
                maxIndicators={4}
                interpolateOpacityAndColor={true}
                activeIndicatorConfig={{
                    color: colors.primary,
                    margin: 3,
                    opacity: 1,
                    size: 6,
                }}
                inactiveIndicatorConfig={{
                    color: colors.white,
                    margin: 3,
                    opacity: 1,
                    size: 6,
                }}
                decreasingDots={[
                    {
                        config: {
                            color: colors.white,
                            margin: 3,
                            opacity: 1,
                            size: 6,
                        },
                        quantity: 1,
                    },
                    {
                        config: {
                            color: colors.white,
                            margin: 3,
                            opacity: 1,
                            size: 4,
                        },
                        quantity: 1,
                    },
                ]}
            />
        </View>
    );
};

export default Pagination;

const styles = StyleSheet.create({
    rootView: {
        position: "absolute",
        bottom: 10,
        justifyContent: "flex-end",
        alignSelf: "center",
        alignItems: "center",
    },
});
