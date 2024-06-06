import {
    ActivityIndicator,
    BackHandler,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import React, {useCallback, useEffect, useMemo, useRef} from "react";
import BottomSheet, {
    BottomSheetFlatList,
    BottomSheetScrollView,
    BottomSheetView,
} from "@gorhom/bottom-sheet";
import {useGetAllUsersQuery} from "@social/redux/services/auth/authApi";
import {typography} from "@social/utils/typography";
import {colors} from "@social/utils/colors";
import FastImage from "react-native-fast-image";
import Spacing from "@social/components/Spacing";

const TagPeopleList = props => {
    const {tagPeopleIndex, setTagPeopleIndexCB, setUserPromptCB, tags} = props;
    const snapPoints = useMemo(() => ["90%"], []);
    const bottomSheetRef = useRef<BottomSheet>(null);

    const {data: peopleList, isLoading, isError} = useGetAllUsersQuery();

    const handleSheetChanges = useCallback((index: number) => {
        setTagPeopleIndexCB(index);
    }, []);

    const onBackPress = () => {
        if (bottomSheetRef !== null) {
            bottomSheetRef.current?.close();
            return true;
        }
    };

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

    const renderPeople = ({item}) => {
        const isSelected = tags.includes(item?._id);
        return (
            <TouchableOpacity
                onPress={() => setUserPromptCB(item?._id)}
                style={{
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderWidth: 1,
                    borderRadius: 10,
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                    borderColor: isSelected ? colors.primary : colors.black,
                    borderBottomWidth: isSelected ? 2.3 : undefined,
                }}>
                <FastImage
                    source={{uri: item?.ProfilePicture}}
                    style={{aspectRatio: 1, height: 50, borderRadius: 50 / 2}}
                    resizeMode={FastImage.resizeMode.cover}
                />
                <View>
                    <Text
                        style={{
                            fontSize: 15,
                            fontFamily: typography.sfRegular,
                            color: colors.black,
                        }}>
                        {item?.Name}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    useEffect(() => {
        if (tagPeopleIndex !== -1) {
            BackHandler.addEventListener("hardwareBackPress", onBackPress);

            return () =>
                BackHandler.removeEventListener(
                    "hardwareBackPress",
                    onBackPress,
                );
        }
    }, [tagPeopleIndex]);

    return (
        <BottomSheet
            style={{flex: 1}}
            backdropComponent={renderBackdrop}
            snapPoints={snapPoints}
            ref={bottomSheetRef}
            onChange={handleSheetChanges}
            index={tagPeopleIndex}
            enablePanDownToClose={true}>
            {isLoading ? (
                <View style={{flex: 1, justifyContent: "center"}}>
                    <ActivityIndicator size={"large"} color={colors.primary} />
                </View>
            ) : (
                <>
                    <BottomSheetFlatList
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        style={{flex: 1}}
                        contentContainerStyle={{
                            flexGrow: 1,
                            // marginTop: 40,
                            paddingVertical: 10,
                            marginHorizontal: 10,
                        }}
                        data={peopleList?.data}
                        ItemSeparatorComponent={() => <Spacing size={3} />}
                        ListEmptyComponent={() => (
                            <View
                                style={{
                                    flex: 1,
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}>
                                <Text
                                    style={{
                                        fontFamily: typography.sfRegular,
                                        fontSize: 15,
                                        color: colors.black,
                                    }}>
                                    No People Found
                                </Text>
                            </View>
                        )}
                        renderItem={renderPeople}
                    />
                    <View style={{width: "90%", alignSelf: "center"}}>
                        <TouchableOpacity
                            onPress={() => bottomSheetRef.current?.close()}
                            style={{
                                backgroundColor: colors.primary,
                                padding: 12,
                                marginVertical: 10,
                                borderRadius: 100,
                            }}>
                            <Text style={styles.btnText}>Confirm</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}
        </BottomSheet>
    );
};

export default TagPeopleList;

const styles = StyleSheet.create({
    btnText: {
        fontSize: 15,
        color: colors.white,
        fontFamily: typography.sfMedium,
        textAlign: "center",
    },
});
