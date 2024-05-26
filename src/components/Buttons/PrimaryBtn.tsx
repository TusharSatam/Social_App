import React from 'react';
import { Text, TouchableOpacity, ViewStyle } from 'react-native';
import CustomText from '../Text/CustomText';

interface PrimaryBtnProps {
    btnText: string;
    onPress: () => void;
    btnClass?: String;
    textColor?: string;
    disabled?:boolean;
}

const PrimaryBtn: React.FC<PrimaryBtnProps> = ({ btnText, onPress, btnClass, textColor = 'text-white',disabled }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            className={`bg-primaryColor rounded-[100px] !p-[12px] w-full font-semibold text-lg ${btnClass}`}
            disabled={disabled}
        >
            <CustomText className={`text-center font-semibold ${textColor} text-lg`}>{btnText}</CustomText>
        </TouchableOpacity>
    );
};

export default PrimaryBtn;
