import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';
import CustomText from '../Text/CustomText';
import { typography } from '@social/utils/typography';

interface PrimaryBtnProps {
    btnText: string;
    onPress: () => void;
    btnClass?: String;
    textColor?: string;
    disabled?: boolean;
    style?: any;
    btnstyle?: any;
}

const PrimaryBtn: React.FC<PrimaryBtnProps> = ({ btnText, onPress, style, btnClass, btnstyle, textColor = 'white', disabled }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            className={`bg-primaryColor flex justify-center items-center rounded-[100px] !p-[12px] w-full font-semibold text-lg ${btnClass}`}
            disabled={disabled}
            style={style}
        >
            <CustomText style={[styles.text, btnstyle, { color: textColor }]}>{btnText}</CustomText>
        </TouchableOpacity>
    );
};
const styles = StyleSheet.create({
    text: {
        fontWeight: '600',
        fontSize: 18,
        textAlign: 'center',
        color: "white",
        fontFamily: typography.sfSemiBold,
    },
});
export default PrimaryBtn;
