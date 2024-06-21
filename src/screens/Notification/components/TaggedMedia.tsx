import {StyleSheet, Text, View} from "react-native";
import React from "react";
import FastImage from "react-native-fast-image";
import {images} from "@social/utils/images";

const TaggedMedia = () => {
    return (
        <View>
            <FastImage
                source={images.dummyImage}
                style={{width: 50, height: 50}}
            />
        </View>
    );
};

export default TaggedMedia;

const styles = StyleSheet.create({});
