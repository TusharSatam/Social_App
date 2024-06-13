import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import CustomText from '../Text/CustomText';
import { typography } from '@social/utils/typography';

interface SecondaryBtnProps {
    btnText: string;
    onPress: () => void;
    btnClass?: any;
    textColor?: string;
    disabled?: boolean;
}

const SecondaryBtn: React.FC<SecondaryBtnProps> = ({ btnText, onPress, btnClass, textColor = '#797979', disabled }) => {


    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.button, btnClass]}
            disabled={disabled}
        >
            <CustomText style={[styles.text, { color: textColor }]}>{btnText}</CustomText>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'transparent', // Replace with actual primary color code
        borderRadius: 100,
        borderColor: "#797979",
        borderWidth: 1,
        height: 32,
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        textAlign: 'center',
        paddingHorizontal: 17,
    },
    text: {
        fontWeight: '600',
        fontSize: 14,
        textAlign: 'center',
        color: "#797979",
        fontFamily: typography.sfSemiBold,
    },
});

export default SecondaryBtn;
