import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {useCallback, useMemo, useRef} from "react";
import BottomSheet, {
    BottomSheetProps,
    BottomSheetView,
} from "@gorhom/bottom-sheet";
import {typography} from "@social/utils/typography";
import {colors} from "@social/utils/colors";

interface CameraOptionsProps {
    cameraOptionIndex: -1 | 0;
    setCameraOptionIndexCB: (value) => void;
    getCameraType: (type: "photo" | "video") => void;
}

const CameraOptions = (props: CameraOptionsProps) => {
    const {cameraOptionIndex, setCameraOptionIndexCB, getCameraType} = props;
    const bottomSheetRef = useRef<BottomSheet>(null);

    const snapPoints = useMemo(() => ["10%"], []);

    const handleSheetChanges = useCallback((index: number) => {
        setCameraOptionIndexCB(index);
    }, []);

    return (
        <BottomSheet
            snapPoints={snapPoints}
            ref={bottomSheetRef}
            onChange={handleSheetChanges}
            index={cameraOptionIndex}
            enablePanDownToClose={true}>
            <BottomSheetView style={styles.contentContainer}>
                <TouchableOpacity
                    onPress={() => {
                        bottomSheetRef.current.close();
                        getCameraType("photo");
                    }}
                    style={styles.textContainer}>
                    <Text style={styles.textStyle}>Camera</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        bottomSheetRef.current.close();
                        getCameraType("video");
                    }}
                    style={styles.textContainer}>
                    <Text style={styles.textStyle}>Video</Text>
                </TouchableOpacity>
            </BottomSheetView>
        </BottomSheet>
    );
};

export default CameraOptions;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: "grey",
    },
    contentContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        gap: 10,
        marginHorizontal: 30,
    },
    textStyle: {
        fontSize: 16,
        fontFamily: typography.sfSemiBold,
        color: colors.white,
        alignSelf: "center",
    },
    textContainer: {
        flex: 1,
        padding: 8,
        borderRadius: 20,
        backgroundColor: colors.primary,
    },
});
