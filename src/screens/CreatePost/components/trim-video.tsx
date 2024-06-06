import BottomSheet, {
    BottomSheetScrollView,
    BottomSheetView,
} from "@gorhom/bottom-sheet";
import {Slider} from "@miblanchard/react-native-slider";
import {colors} from "@social/utils/colors";
import {typography} from "@social/utils/typography";
import {
    FFmpegKit,
    FFmpegKitConfig,
    FFprobeKit,
    ReturnCode,
} from "ffmpeg-kit-react-native";
import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {
    BackHandler,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import {ImageOrVideo, Video as IPVideo} from "react-native-image-crop-picker";
import Toast from "react-native-toast-message";
import Video, {ResizeMode, VideoRef} from "react-native-video";
import RNFS from "react-native-fs";

interface TrimVideoProps {
    trimVideoIndex: -1 | 0;
    setTrimVideoIndexCB: (value) => void;
    mediaToTrim: IPVideo | null;
    setMediaPostsCB: (value: any) => void;
}

const TrimVideo = (props: TrimVideoProps) => {
    const {trimVideoIndex, setTrimVideoIndexCB, mediaToTrim, setMediaPostsCB} =
        props;
    const duration = mediaToTrim.duration / 1000;
    const snapPoints = useMemo(() => ["90%"], []);
    const bottomSheetRef = useRef<BottomSheet>(null);
    const videoPlayerRef = useRef<VideoRef>(null);
    const [value, setValue] = useState([0, duration > 60 ? 60 : duration]);

    const handleSheetChanges = useCallback((index: number) => {
        setTrimVideoIndexCB(index);
    }, []);

    const renderBackdrop = () => {
        return (
            <View
                style={{
                    backgroundColor: "rgba(0,0,0,0.7)",
                    position: "absolute",
                    flex: 1,
                    height: "100%",
                    width: "100%",
                }}></View>
        );
    };

    const onBackPress = () => {
        if (bottomSheetRef !== null) {
            bottomSheetRef.current?.close();
            return true;
        }
    };

    const trimVideo = () => {
        const time = new Date().getTime().toString();
        const outputPath = `${RNFS.CachesDirectoryPath}/${time}_trim.mp4`;
        const startTime = new Date(value[0] * 1000)
            .toISOString()
            .substring(11, 19);
        const endTime = new Date(value[1] * 1000)
            .toISOString()
            .substring(11, 19);
        if (value[1] - value[0] < 5 || value[1] - value[0] > 60) {
            Toast.show({
                type: "info",
                text2: "Between 5 seconds to 1 minute video is accepted",
                text2Style: {
                    fontSize: 12,
                    fontFamily: typography.sfRegular,
                    color: colors.black,
                    flexWrap: "wrap",
                },
                visibilityTime: 1400,
            });
        } else {
            FFmpegKit.executeAsync(
                `-ss ${startTime} -to ${endTime} -i ${mediaToTrim.path} -c copy ${outputPath}`,
                async session => {
                    const state = FFmpegKitConfig.sessionStateToString(
                        await session.getState(),
                    );
                    const returnCode = await session.getReturnCode();
                    const duration = await session.getDuration();
                    if (ReturnCode.isSuccess(returnCode)) {
                        setMediaPostsCB({
                            mime: "video/mp4",
                            duration: value[1],
                            path: `file://${outputPath}`,
                        });
                    } else {
                        console.log("else part");
                    }
                },
                log => {
                    console.log(log.getMessage());
                },
                statistics => {
                    console.log(statistics);
                },
            )
                .then(session =>
                    console.log(
                        `Async FFmpeg process started with sessionId ${session.getSessionId()}.`,
                    ),
                )
                .finally(() => {
                    bottomSheetRef.current.close();
                });
        }
    };

    useEffect(() => {
        if (trimVideoIndex !== -1) {
            BackHandler.addEventListener("hardwareBackPress", onBackPress);

            return () =>
                BackHandler.removeEventListener(
                    "hardwareBackPress",
                    onBackPress,
                );
        }
    }, [trimVideoIndex]);

    return (
        <BottomSheet
            style={{flex: 1}}
            backdropComponent={renderBackdrop}
            snapPoints={snapPoints}
            ref={bottomSheetRef}
            onChange={handleSheetChanges}
            index={trimVideoIndex}
            enablePanDownToClose={true}>
            <BottomSheetScrollView
                contentContainerStyle={{
                    flexGrow: 1,
                }}
                style={styles.contentContainer}>
                <Text
                    style={{
                        color: colors.black,
                        fontSize: 14,
                        fontFamily: typography.sfRegular,
                        alignSelf: "center",
                    }}>
                    Duration: {Math.floor(value[1] - value[0]).toFixed(0)}{" "}
                    second(s)
                </Text>
                <View
                    style={{
                        paddingHorizontal: 10,
                        marginTop: 20,
                    }}>
                    <Slider
                        renderAboveThumbComponent={(index, value) => {
                            return (
                                <Text style={{color: "black"}}>{value}</Text>
                            );
                        }}
                        minimumValue={0}
                        thumbTintColor={colors.primary}
                        animationType="timing"
                        minimumTrackTintColor={colors.primary}
                        value={value}
                        step={1}
                        maximumValue={Math.floor(duration)}
                        onSlidingComplete={e => {
                            videoPlayerRef.current.seek(e[0]);
                            setValue(e);
                        }}
                    />
                </View>
                <Video
                    ref={videoPlayerRef}
                    style={{flex: 1, marginHorizontal: 10}}
                    resizeMode={ResizeMode.CONTAIN}
                    source={{uri: mediaToTrim.path}}
                />
                <TouchableOpacity
                    onPress={trimVideo}
                    style={{
                        backgroundColor: colors.primary,
                        justifyContent: "center",
                        alignItems: "center",
                        // width: "100%",
                        alignSelf: "center",
                        marginTop: 20,
                        width: "100%",
                    }}>
                    <Text
                        style={{
                            fontSize: 15,
                            fontFamily: typography.sfRegular,
                            color: colors.white,
                            paddingVertical: 13,
                        }}>
                        Trim Video
                    </Text>
                </TouchableOpacity>
            </BottomSheetScrollView>
        </BottomSheet>
    );
};

export default TrimVideo;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: "grey",
    },
    contentContainer: {
        flex: 1,
    },
});
