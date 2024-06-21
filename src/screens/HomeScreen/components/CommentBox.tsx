import {
    BottomSheetFlatList,
    BottomSheetModal,
    BottomSheetView,
} from "@gorhom/bottom-sheet";
import Spacing from "@social/components/Spacing";
import AmazedIcon from "@social/components/SvgIcons/AmazedIcon";
import ClappingIcon from "@social/components/SvgIcons/ClappingIcon";
import FaceWTongue from "@social/components/SvgIcons/FaceWTongue";
import FireIcon from "@social/components/SvgIcons/FireIcon";
import FrownIcon from "@social/components/SvgIcons/FrownIcon";
import HandUpIcon from "@social/components/SvgIcons/HandUpIcon";
import HeartIcon from "@social/components/SvgIcons/HeartIcon";
import LikeHeartIcon from "@social/components/SvgIcons/LikeHeartIcon";
import LolIcon from "@social/components/SvgIcons/LolIcon";
import SendIcon from "@social/components/SvgIcons/SendIcon";
import {colors} from "@social/utils/colors";
import {images} from "@social/utils/images";
import {typography} from "@social/utils/typography";
import React, {useMemo, useState} from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import FastImage from "react-native-fast-image";

const emojiData = [
    {
        element: HeartIcon,
        value: "❤️",
    },
    {
        element: HandUpIcon,
        value: "🙌",
    },
    {
        element: FireIcon,
        value: "🔥",
    },
    {
        element: ClappingIcon,
        value: "👏",
    },
    {
        element: AmazedIcon,
        value: "😍",
    },
    {
        element: FrownIcon,
        value: "🙁",
    },
    {
        element: LolIcon,
        value: "😂",
    },
    {
        element: FaceWTongue,
        value: "😝",
    },
];

const CommentBox = React.forwardRef<BottomSheetModal>(({}, ref) => {
    const snapPoints = useMemo(() => ["65%"], []);

    const [comment, setComment] = useState("");

    const renderComment = ({index}) => {
        return (
            <View
                style={{
                    marginHorizontal: 16,
                    flexDirection: "row",
                    gap: 10,
                }}>
                <View>
                    <FastImage
                        resizeMode={FastImage.resizeMode.contain}
                        source={images.user1}
                        style={styles.profileIcon}
                    />
                </View>
                <View style={{flex: 0.97}}>
                    <View style={styles.userName}>
                        <Text style={styles.userText}>mariosera</Text>
                        <Text style={styles.pinnedText}>1d. Pinned</Text>
                    </View>
                    <View style={{flex: 1}}>
                        <Text style={styles.comments}>
                            Ok who else was trying to figure out if it was liar
                            or ryuzin
                        </Text>
                        <View style={styles.likeNReply}>
                            <Text style={styles.likes}>491 likes</Text>
                            <Text style={styles.reply}>Reply</Text>
                        </View>
                        <View style={styles.viewMoreReplies}>
                            <Text style={styles.moreRepliesText}>
                                View 54 more replies
                            </Text>
                        </View>
                    </View>
                </View>
                <View>
                    <LikeHeartIcon width={13} height={13} />
                </View>
            </View>
        );
    };

    return (
        <BottomSheetModal
            keyboardBehavior="fillParent"
            android_keyboardInputMode="adjustResize"
            ref={ref}
            index={0}
            handleIndicatorStyle={{
                width: "30%",
                height: 3,
                backgroundColor: "#F1F1F1",
            }}
            enablePanDownToClose
            snapPoints={snapPoints}
            onChange={() => {}}>
            <BottomSheetView style={styles.contentContainer}>
                <Text
                    style={{
                        fontSize: 18,
                        fontFamily: typography.sfSemiBold,
                        color: colors["24Color"],
                    }}>
                    Comments
                </Text>
            </BottomSheetView>
            <BottomSheetFlatList
                style={{flex: 1}}
                ItemSeparatorComponent={() => <Spacing />}
                contentContainerStyle={{flexGrow: 1, marginTop: 20}}
                data={[1, 2, 3, 4, 5, 6, 7, 8]}
                ListFooterComponent={() => <Spacing size={50} />}
                renderItem={renderComment}
            />
            <View style={styles.textInputRoot}>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 22,
                        paddingHorizontal: 12,
                        paddingBottom: 16,
                    }}>
                    {emojiData.map((item, index) => {
                        return (
                            <TouchableOpacity
                                onPress={() =>
                                    setComment(prev => prev + item.value)
                                }
                                key={index}>
                                {React.createElement(item.element, {
                                    width: 20,
                                    height: 20,
                                })}
                            </TouchableOpacity>
                        );
                    })}
                </View>
                <View style={styles.textInputContainer}>
                    <TextInput
                        placeholder="Add a comment..."
                        value={comment}
                        onChangeText={e => setComment(e)}
                        placeholderTextColor={colors.lightText}
                        style={styles.textInputStyle}
                    />
                    <SendIcon height={16} width={16} />
                </View>
            </View>
        </BottomSheetModal>
    );
});

export default CommentBox;

const styles = StyleSheet.create({
    textInputRoot: {
        paddingTop: 18,
        borderColor: colors.lightText,
        paddingHorizontal: 23,
        justifyContent: "flex-end",
        backgroundColor: colors.white,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        paddingBottom: 22,
    },
    textInputContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 10,
        backgroundColor: colors.f6Color,
        height: 42,
        paddingHorizontal: 12,
    },
    textInputStyle: {
        padding: 0,
        margin: 0,
        flex: 1,
        paddingHorizontal: 10,
        fontFamily: typography.sfRegular,
        fontSize: 14,
        color: colors["24Color"],
    },
    container: {
        flex: 1,
        padding: 24,
        justifyContent: "center",
        backgroundColor: "grey",
    },
    contentContainer: {
        paddingTop: 20,
        paddingBottom: 12,
        alignItems: "center",
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: "#F1F1F1",
    },
    profileIcon: {
        width: 40,
        aspectRatio: 1,
        borderRadius: 40 / 2,
    },
    userName: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
    },
    userText: {
        fontFamily: typography.sfSemiBold,
        fontSize: 13,
        color: colors["24Color"],
    },
    pinnedText: {
        fontFamily: typography.sfSemiBold,
        fontSize: 11,
        color: colors.lightText,
    },
    comments: {
        flex: 1,
        fontFamily: typography.sfRegular,
        fontSize: 13,
        color: colors["24Color"],
    },
    likeNReply: {
        flexDirection: "row",
        alignItems: "center",
        gap: 15,
        marginTop: 6,
    },
    likes: {
        fontFamily: typography.sfRegular,
        fontSize: 11,
        color: colors.lightText,
    },
    reply: {
        fontFamily: typography.sfRegular,
        fontSize: 11,
        color: colors.lightText,
    },
    viewMoreReplies: {
        flexDirection: "row",
        alignItems: "center",
        gap: 15,
        marginTop: 6,
    },
    moreRepliesText: {
        fontFamily: typography.sfRegular,
        fontSize: 11,
        color: colors.lightText,
    },
});
