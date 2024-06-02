import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import CustomText from "@social/components/Text/CustomText";
import SettingIcon from 'react-native-vector-icons/Feather';
import { useNavigation } from "@react-navigation/native";

const Profile = () => {
    const navigation = useNavigation()
    const handleNavigation=(screenName)=>{
        (navigation as any).navigate(screenName)
    }
    return (
        <View className="screenClass flex justify-center items-center min-h-screen relative">
            <TouchableOpacity className="absolute top-3 right-3" onPress={() =>handleNavigation('Settings') }>
                <SettingIcon name="settings" size={24} color="black" />
            </TouchableOpacity>
            <CustomText>Profile</CustomText>
        </View>
    );
};

export default Profile;
