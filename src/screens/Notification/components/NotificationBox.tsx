import {StyleSheet, Text, View} from "react-native";
import React from "react";
import {typography} from "@social/utils/typography";
import {colors} from "@social/utils/colors";
import FastImage from "react-native-fast-image";
import {images} from "@social/utils/images";
import TaggedMedia from "./TaggedMedia";
import Pill from "@social/components/Pill/Pill";

interface NotificationBoxProps {
    whenTitle: string;
    author: string;
    authorDesc: string;
    type: "follow" | "tagged" | "message";
    atTo: string;
}

const NotificationBox = (props: NotificationBoxProps) => {
    const {author, authorDesc, whenTitle, type, atTo} = props;

    return (
        <View>
            <View style={{paddingVertical: 15}}>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        flex: 1,
                    }}>
                    <View
                        style={{
                            flexDirection: "row",
                            gap: 12,
                            alignItems: "flex-start",
                            flex: 1,
                        }}>
                        <FastImage
                            source={images.me}
                            resizeMode={FastImage.resizeMode.contain}
                            style={{
                                width: 40,
                                height: 40,
                                borderRadius: 40 / 2,
                            }}
                        />
                        <View
                            style={{
                                flex: 1,
                                marginRight: 10,
                            }}>
                            <Text
                                numberOfLines={2}
                                style={{
                                    fontFamily: typography.sfRegular,
                                    fontSize: 13,
                                    color: colors["26Color"],
                                }}>
                                <Text
                                    style={{fontFamily: typography.sfSemiBold}}>
                                    {`${author} `}
                                </Text>
                                {authorDesc}
                            </Text>
                        </View>
                    </View>
                    {{
                        follow: (
                            <Pill
                                rootView={{backgroundColor: colors.primary}}
                                textStyle={{color: colors.white}}
                                text="Follow"
                            />
                        ),
                        tagged: <TaggedMedia />,
                        message: (
                            <Pill
                                rootView={{
                                    backgroundColor: colors.white,
                                    borderColor: colors.lightText,
                                    borderWidth: 1,
                                }}
                                textStyle={{color: colors.lightText}}
                                text="Message"
                            />
                        ),
                    }[type] || null}
                </View>
            </View>
        </View>
    );
};

export default NotificationBox;

const styles = StyleSheet.create({});
