import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    FlatList,
} from "react-native";
import React, {useEffect, useState} from "react";
import GenericHeader from "@social/components/GenericHeader/GenericHeader";
import HeaderCross from "@social/components/SvgIcons/HeaderCross";
import HeaderRightArrow from "@social/components/SvgIcons/HeaderRightArrow";
import {typography} from "@social/utils/typography";
import {colors} from "@social/utils/colors";
import {useNavigation} from "@react-navigation/native";
import ImageCropPicker from "react-native-image-crop-picker";
import type {
    ImageOrVideo,
    Video as VideoType,
} from "react-native-image-crop-picker";

import FastImage from "react-native-fast-image";
import DownArrow from "@social/components/SvgIcons/DownArrow";
import CameraIcon from "@social/components/SvgIcons/CameraIcon";
import {WINDOW_WIDTH} from "@social/constants/screenSize";
import CameraOptions from "./components/camera-options";
import {FFmpegKit, ReturnCode} from "ffmpeg-kit-react-native";
import Video from "react-native-video";
import Toast from "react-native-toast-message";
import TrimVideo from "./components/trim-video";

const SPACING_HORIZONTAL = 15;

const Header = props => {
    const {onHeaderLeftAction} = props;
    return (
        <View style={styles.root}>
            <TouchableOpacity onPress={onHeaderLeftAction}>
                <HeaderCross height={19} />
            </TouchableOpacity>
            <View>
                <Text style={styles.headerText}>Create Post</Text>
            </View>
            <HeaderRightArrow height={20} />
        </View>
    );
};

const CreatePost = () => {
    const [mediaPosts, setMediaPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState<any>(null);
    const navigation = useNavigation();
    const [cameraOptionIndex, setCameraOptionIndex] = useState<-1 | 0>(-1);
    const [trimVideoIndex, setTrimVideoIndex] = useState<-1 | 0>(-1);
    const [mediaToTrim, setMediaToTrim] = useState<VideoType | null>(null);

    const onHeaderLeftAction = () => {
        navigation.goBack();
    };

    const setCameraOptionIndexCB = value => {
        setCameraOptionIndex(value);
    };

    const setTrimVideoIndexCB = value => {
        setTrimVideoIndex(value);
    };

    const removeAndUpdateMediaPost = path => {
        const newMediaPosts = mediaPosts.filter(item => {
            return item.path !== path;
        });

        if (newMediaPosts.length === 0) {
            clearData();
            navigation.goBack();
        } else {
            setSelectedPost(newMediaPosts[0]);
            setMediaPosts(() => {
                return newMediaPosts;
            });
        }
    };

    const clearData = () => {
        setMediaPosts([]);
        setSelectedPost(null);
    };

    const setMediaPostsCB = value => {
        setMediaPosts(prev => {
            return [...prev, value];
        });
    };

    const renderEmpty = () => {
        return <View style={{flex: 1}}></View>;
    };

    const renderMedia = ({item, index}) => {
        return (
            <TouchableOpacity
                style={{position: "relative"}}
                onPress={() => setSelectedPost(item)}>
                <FastImage
                    style={{
                        width: (WINDOW_WIDTH - (SPACING_HORIZONTAL + 25)) / 3,
                        borderRadius: 10,
                        aspectRatio: 1,
                    }}
                    source={{
                        uri: `${item.path}`,
                        priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                />
                <TouchableOpacity
                    onPress={() => removeAndUpdateMediaPost(item.path)}
                    style={styles.removeContainer}>
                    <View style={styles.removePosition}>
                        <HeaderCross height={16} fill={colors.white} />
                    </View>
                </TouchableOpacity>
            </TouchableOpacity>
        );
    };

    const ffmpeg = file => {
        FFmpegKit.execute(`-i ${file} -c:v mpeg4 file2.mp4`).then(
            async session => {
                const returnCode = await session.getReturnCode();
                console.log(returnCode);
                if (ReturnCode.isSuccess(returnCode)) {
                    console.log("SUCCESS");
                    // SUCCESS
                } else if (ReturnCode.isCancel(returnCode)) {
                    console.log("OK");

                    // CANCEL
                } else {
                    console.log("CANCEL");

                    // ERROR
                }
            },
        );
    };

    const openCamera = async (type: "photo" | "video") => {
        try {
            const media = await ImageCropPicker.openCamera({
                mediaType: type,
            });

            if (type === "video") {
                const vidDuration = (media as VideoType).duration / 1000;
                if (vidDuration < 5) {
                    return Toast.show({
                        type: "info",
                        text1: "Minimum video duration is 5 sec",
                        visibilityTime: 1000,
                    });
                } else {
                    console.log(media);
                    setMediaToTrim(media as VideoType);
                    return setTrimVideoIndex(0);
                }
            }

            setMediaPosts(prev => {
                return [...prev, media];
            });
        } catch (error) {
            console.log(error, " ON open camera");
        }
    };

    const openGallery = async () => {
        try {
            const fetchMedia = await ImageCropPicker.openPicker({
                multiple: true,
                compressImageQuality: 0.8,
            });

            fetchMedia.forEach(media => {
                if (media.mime.split("/")[0] === "video") {
                    const vidDuration = (media as VideoType).duration / 1000;
                    if (vidDuration < 5) {
                        return Toast.show({
                            type: "info",
                            text1: "Minimum video duration is 5 sec",
                            visibilityTime: 500,
                        });
                    } else {
                        console.log(media);
                        setMediaToTrim(media as VideoType);
                        setTrimVideoIndex(0);
                    }
                }
            });

            // if (mediaPosts.length > 0) {
            //     setMediaPosts(prev => {
            //         return [...prev, ...fetchMedia];
            //     });
            // } else {
            //     setSelectedPost(fetchMedia[0]);
            //     setMediaPosts(fetchMedia);
            // }
        } catch (error) {
            if (mediaPosts.length === 0) {
                navigation.goBack();
            }
        }
    };

    useEffect(() => {
        navigation.addListener("focus", () => {
            if (mediaPosts.length === 0) {
                openGallery();
            }
        });
    }, []);

    return (
        <View style={{flex: 1}}>
            <View style={styles.container}>
                <GenericHeader>
                    <Header onHeaderLeftAction={onHeaderLeftAction} />
                </GenericHeader>
                <FlatList
                    ListEmptyComponent={renderEmpty}
                    style={{marginTop: 15}}
                    ListHeaderComponent={() => {
                        if (mediaPosts.length === 0) {
                            return null;
                        }
                        return (
                            <>
                                <View
                                    style={{
                                        aspectRatio: 1,
                                    }}>
                                    {selectedPost.mime.split("/")[0] ===
                                    "video" ? (
                                        <Video
                                            onTimedMetadata={e =>
                                                console.log(e, " EVNE")
                                            }
                                            style={styles.selectedImage}
                                            controls={true}
                                            source={{uri: selectedPost.path}}
                                        />
                                    ) : (
                                        <FastImage
                                            style={styles.selectedImage}
                                            source={{
                                                uri: `${selectedPost?.path}`,
                                                priority:
                                                    FastImage.priority.normal,
                                            }}
                                            resizeMode={
                                                FastImage.resizeMode.cover
                                            }
                                        />
                                    )}
                                </View>
                                <View style={styles.selectionType}>
                                    <TouchableOpacity
                                        onPress={openGallery}
                                        style={styles.gallery}>
                                        <Text style={styles.galleryText}>
                                            Gallery
                                        </Text>
                                        <DownArrow height={14} width={14} />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => setCameraOptionIndex(0)}
                                        hitSlop={30}>
                                        <CameraIcon height={20} width={20} />
                                    </TouchableOpacity>
                                </View>
                            </>
                        );
                    }}
                    numColumns={3}
                    ItemSeparatorComponent={() => <View style={{height: 5}} />}
                    columnWrapperStyle={{gap: 5}}
                    data={mediaPosts}
                    renderItem={renderMedia}
                    contentContainerStyle={{flexGrow: 1}}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                />
            </View>
            <CameraOptions
                cameraOptionIndex={cameraOptionIndex}
                setCameraOptionIndexCB={setCameraOptionIndexCB}
                getCameraType={openCamera}
            />
            {trimVideoIndex !== -1 ? (
                <TrimVideo
                    setMediaPostsCB={setMediaPostsCB}
                    mediaToTrim={mediaToTrim}
                    setTrimVideoIndexCB={setTrimVideoIndexCB}
                    trimVideoIndex={trimVideoIndex}
                />
            ) : null}
            <Toast position="bottom" bottomOffset={20} />
        </View>
    );
};

export default CreatePost;

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
    selectionType: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 15,
    },
    galleryText: {
        fontSize: 16,
        fontFamily: typography.sfSemiBold,
        fontWeight: "600",
        color: colors.black,
    },
    selectedImage: {
        width: "100%",
        height: "100%",
        borderRadius: 10,
    },
    gallery: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 5,
    },
    removeContainer: {
        borderRadius: 25 / 2,
        height: 25,
        width: 25,
        position: "absolute",
        borderWidth: 2,
        borderColor: colors.primary,
        right: 4,
        top: 4,
        backgroundColor: colors.primary,
    },
    removePosition: {
        overflow: "hidden",
        position: "relative",
        top: 2,
        right: 1,
    },
});
