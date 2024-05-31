import React from "react";
import {Image, Text, View} from "react-native";
import CustomText from "../../components/Text/CustomText";
import {useDispatch, useSelector} from "react-redux";
import PrimaryBtn from "../../components/Buttons/PrimaryBtn";
import {logout} from "../../redux/Slice/AuthSlice";
import {CommonActions, useNavigation} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CircularPlusIcon from "@social/components/SvgIcons/CircularPlusIcon";

const HomeScreen = () => {
    const userData = useSelector((state: any) => state.auth);
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const handleLogout = async () => {
        await dispatch(logout());
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{name: "AuthStack"}],
            }),
        );
        await AsyncStorage.clear();
    };
    return (
        <View className="flex items-center justify-center flex-1 min-h-screen">
            <CustomText className="text-[24px]">Welcome,</CustomText>
            <CustomText className="text-[24px] text-primaryColor">
                {" "}
                {userData?.user?.Name
                    ? userData?.user?.Name
                    : userData?.user?.email}
            </CustomText>
            <PrimaryBtn
                btnText="Log out"
                onPress={handleLogout}
                btnClass={"!w-[140px] p-2 my-4"}
            />
        </View>
    );
};

export default HomeScreen;
