import {useNavigation} from "@react-navigation/native";
import GenericHeader from "@social/components/GenericHeader/GenericHeader";
import Spacing from "@social/components/Spacing";
import ChevronRightIcon from "@social/components/SvgIcons/ChevronRightIcon";
import HeaderLeftArrow from "@social/components/SvgIcons/HeaderLeftArrow";
import LocationIcon from "@social/components/SvgIcons/LocationIcon";
import PersonIcon from "@social/components/SvgIcons/PersonIcon";
import {
    useSharePostMutation,
    useUploadShortMutation,
} from "@social/redux/services/auth/authApi";
import {colors} from "@social/utils/colors";
import {typography} from "@social/utils/typography";
import {useMemo, useRef, useState} from "react";
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import FastImage from "react-native-fast-image";
import Toast from "react-native-toast-message";
import Video from "react-native-video";
import {useDispatch, useSelector} from "react-redux";
import TagPeopleList from "./components/TagPeopleList";
import PlayIcon from "@social/components/SvgIcons/PlayIcon";
import PlayButtonIcon from "@social/components/SvgIcons/PlayButtonIcon";

const SPACING_HORIZONTAL = 15;

const Header = props => {
    const {onHeaderLeftAction, onHeaderRightAction, title} = props;
    return (
        <View style={styles.root}>
            <TouchableOpacity onPress={onHeaderLeftAction}>
                <HeaderLeftArrow height={19} />
            </TouchableOpacity>
            <View>
                <Text style={styles.headerText}>{title}</Text>
            </View>
            <TouchableOpacity style={{opacity: 0}}>
                <HeaderLeftArrow height={19} />
            </TouchableOpacity>
        </View>
    );
};

const SharePost = () => {
    const mediaPosts = useSelector<any, any[]>(state => state.post.mediaPosts);
    const dispatch = useDispatch();
    const userId = useSelector((state: any) => state.auth.user?._id);
    const [isPause, setIsPause] = useState(true);

    const navigation = useNavigation();

    const [sharePostFn, {isLoading, isError, isSuccess}] =
        useSharePostMutation();

    const [uploadShortFn, {isLoading: isUploadShortLoading}] =
        useUploadShortMutation();

    const locationInputRef = useRef<TextInput>();
    const [userPrompt, setUserPrompt] = useState({
        caption: null,
        location: null,
        tag: [],
    });

    const isForShort = useMemo(() => {
        return (
            mediaPosts.length === 1 &&
            mediaPosts?.[0]?.mime?.split("/")[0] === "video"
        );
    }, [mediaPosts?.length]);

    const setUserPromptCB = value => {
        if (userPrompt.tag.includes(value)) {
            const newValue = userPrompt.tag.filter(itemId => itemId !== value);
            setUserPrompt(prev => {
                return {
                    ...prev,
                    tag: newValue,
                };
            });
        } else {
            setUserPrompt(prev => {
                return {
                    ...prev,
                    tag: [...prev.tag, value],
                };
            });
        }
    };

    const [tagPeopleIndex, setTagPeopleIndex] = useState<-1 | 0>(-1);

    const setTagPeopleIndexCB = value => {
        setTagPeopleIndex(value);
    };

    const onSharePost = async () => {
        try {
            const formData: any = new FormData();
            formData.append("id", userId);
            for (const media of mediaPosts) {
                formData.append("mediaFiles", {
                    uri: media.path,
                    type: media.mime,
                    name: media.path.split("/").slice(-1)[0],
                });
            }
            userPrompt.caption &&
                formData.append("caption", userPrompt.caption);
            userPrompt.location &&
                formData.append("location", userPrompt.location);
            userPrompt.tag.length > 0 &&
                formData.append("tagPeople", userPrompt.tag);

            await sharePostFn(formData).unwrap();
            Toast.show({
                type: "success",
                text1: "Post Shared!",
                visibilityTime: 1400,
                onShow() {
                    setTimeout(() => {
                        navigation.reset({
                            index: 0,
                            routes: [{name: "HomeStack"}],
                        });
                    }, 1400);
                },
            });
        } catch (error) {
            Toast.show({
                type: "error",
                text1: error?.data?.error,
                visibilityTime: 1400,
            });
        }
    };

    const forShort = async () => {
        try {
            const formData: any = new FormData();
            formData.append("id", userId);
            for (const media of mediaPosts) {
                formData.append("mediaFile", {
                    uri: media.path,
                    type: media.mime,
                    name: media.path.split("/").slice(-1)[0],
                });
            }
            userPrompt.caption &&
                formData.append("caption", userPrompt.caption);
            userPrompt.location &&
                formData.append("location", userPrompt.location);

            await uploadShortFn(formData).unwrap();
            Toast.show({
                type: "success",
                text1: "Short Shared!",
                visibilityTime: 1400,
                onShow() {
                    setTimeout(() => {
                        navigation.reset({
                            index: 0,
                            routes: [{name: "HomeStack"}],
                        });
                    }, 1400);
                },
            });
        } catch (error) {
            Toast.show({
                type: "error",
                text1: error?.data?.error,
                visibilityTime: 1400,
            });
        }
    };

    return (
        <View style={{flex: 1, backgroundColor: colors.white}}>
            {(isLoading || isUploadShortLoading) && (
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        position: "absolute",
                        ...StyleSheet.absoluteFillObject,
                        zIndex: 999,
                        backgroundColor: "rgba(0,0,0,0.6)",
                    }}>
                    <ActivityIndicator size={"large"} color={colors.primary} />
                </View>
            )}
            <View style={styles.container}>
                <GenericHeader>
                    <Header
                        title={"Create Post"}
                        onHeaderLeftAction={() => navigation.goBack()}
                    />
                </GenericHeader>
                <Spacing size={5} />
                <ScrollView
                    keyboardShouldPersistTaps="always"
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    style={{flex: 1}}
                    contentContainerStyle={{flexGrow: 1}}>
                    <View
                        style={{
                            aspectRatio: 1,
                            backgroundColor: colors.black,
                        }}>
                        {mediaPosts?.[0]?.mime?.split("/")?.[0] === "video" ? (
                            <TouchableOpacity
                                activeOpacity={isPause ? 1 : undefined}
                                disabled={isPause}
                                onPress={() => setIsPause(true)}
                                style={{flex: 1}}>
                                <Video
                                    style={[styles.selectedImage]}
                                    paused={isPause}
                                    repeat
                                    controls={false}
                                    source={{uri: mediaPosts?.[0]?.path}}
                                />
                                {isPause && (
                                    <TouchableOpacity
                                        onPress={() => setIsPause(false)}
                                        style={{
                                            flex: 1,
                                            position: "absolute",
                                            ...StyleSheet.absoluteFillObject,
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}>
                                        <View
                                            style={{
                                                backgroundColor:
                                                    colors.lightText,
                                                height: 45,
                                                width: 45,
                                                borderRadius: 45 / 2,
                                                flexDirection: "column",
                                                alignItems: "center",
                                                justifyContent: "center",
                                            }}>
                                            <PlayButtonIcon
                                                style={{
                                                    position: "relative",
                                                    left: 2.5,
                                                }}
                                                width={27}
                                                height={27}
                                            />
                                        </View>
                                    </TouchableOpacity>
                                )}
                            </TouchableOpacity>
                        ) : (
                            <FastImage
                                style={styles.selectedImage}
                                source={{
                                    uri: `${mediaPosts?.[0]?.path}`,
                                    priority: FastImage.priority.normal,
                                }}
                                resizeMode={FastImage.resizeMode.contain}
                            />
                        )}
                    </View>
                    {mediaPosts.length > 1 && (
                        <View
                            style={{
                                justifyContent: "center",
                                alignItems: "center",
                            }}>
                            <Text
                                style={{
                                    fontSize: 14,
                                    color: colors.black,
                                    fontFamily: typography.sfRegular,
                                }}>
                                + {mediaPosts.length - 1} More Media(s)
                            </Text>
                        </View>
                    )}
                    <View style={{marginTop: 10}}>
                        <TextInput
                            placeholder="Write a caption..."
                            placeholderTextColor={colors.lightGrey}
                            multiline={true}
                            value={userPrompt.caption}
                            onChangeText={e =>
                                setUserPrompt(prev => {
                                    return {
                                        ...prev,
                                        ["caption"]: e,
                                    };
                                })
                            }
                            textAlignVertical="top"
                            style={styles.caption}
                        />
                        {
                            <TouchableWithoutFeedback
                                style={{flex: 1}}
                                onPress={() =>
                                    locationInputRef?.current?.focus()
                                }>
                                <View style={styles.locationWrapper}>
                                    <View>
                                        <LocationIcon />
                                    </View>
                                    <TextInput
                                        ref={locationInputRef}
                                        value={userPrompt.location}
                                        onChangeText={e =>
                                            setUserPrompt(prev => {
                                                return {
                                                    ...prev,
                                                    ["location"]: e,
                                                };
                                            })
                                        }
                                        style={{
                                            fontSize: 16,
                                            fontFamily: typography.sfRegular,
                                            color: colors.lightGrey,
                                            padding: 0,
                                            paddingRight: 5,
                                            flex: 1,
                                        }}
                                        placeholder="Type your location"
                                        placeholderTextColor={colors.lightGrey}
                                    />
                                </View>
                            </TouchableWithoutFeedback>
                        }

                        {isForShort || (
                            <TouchableOpacity
                                onPress={() => setTagPeopleIndex(0)}>
                                <View style={styles.tagView}>
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                            gap: 10,
                                        }}>
                                        <View>
                                            <PersonIcon />
                                        </View>
                                        <Text
                                            style={{
                                                fontSize: 16,
                                                fontFamily:
                                                    typography.sfRegular,
                                                color: colors.lightGrey,
                                            }}>
                                            {userPrompt.tag.length
                                                ? `${userPrompt.tag.length} people tagged`
                                                : "Tag People"}
                                        </Text>
                                    </View>
                                    <ChevronRightIcon />
                                </View>
                            </TouchableOpacity>
                        )}
                    </View>
                    <Spacing size={isForShort ? 10 : 15} />
                    <TouchableOpacity
                        onPress={isForShort ? forShort : onSharePost}
                        style={{
                            backgroundColor: colors.primary,
                            padding: 16,
                            marginBottom: 10,
                            borderRadius: 100,
                        }}>
                        <Text style={styles.shareTxt}>Share</Text>
                    </TouchableOpacity>
                </ScrollView>

                <Toast position="bottom" bottomOffset={20} />
            </View>
            {tagPeopleIndex !== -1 ? (
                <TagPeopleList
                    tags={userPrompt.tag}
                    setUserPromptCB={setUserPromptCB}
                    setTagPeopleIndexCB={setTagPeopleIndexCB}
                    tagPeopleIndex={tagPeopleIndex}
                />
            ) : null}
        </View>
    );
};

export default SharePost;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: SPACING_HORIZONTAL,
        flex: 1,
        paddingVertical: 10,
    },
    root: {
        height: 50,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    headerText: {
        fontSize: 18,
        fontFamily: typography.sfSemiBold,
        fontWeight: "600",
        color: colors.black,
    },
    selectedImage: {
        width: "100%",
        height: "100%",
        borderRadius: 10,
    },
    shareTxt: {
        fontSize: 15,
        color: colors.white,
        fontFamily: typography.sfMedium,
        textAlign: "center",
    },
    tagView: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 10,
        paddingHorizontal: 13,
        paddingVertical: 13,
        borderRadius: 10,
        borderColor: "#f6f6f6",
        borderWidth: 1,
    },
    caption: {
        height: 200,
        fontSize: 14,
        backgroundColor: "#f6f6f6",
        fontFamily: typography.sfRegular,
        color: colors.lightText,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    locationWrapper: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        marginVertical: 10,
        paddingHorizontal: 13,
        paddingVertical: 13,
        borderRadius: 10,
        borderColor: "#f6f6f6",
        borderWidth: 1,
        flex: 1,
    },
});
