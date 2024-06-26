// components/AuthInput.tsx
import React, { useState } from 'react';
import { TextInput, View, StyleSheet, TextInputProps, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import CustomText from '../Text/CustomText';
import { typography } from '@social/utils/typography';
import EyeHidden from '../SvgIcons/InputIcons/EyeHidden';
import EyeVisible from '../SvgIcons/InputIcons/EyeVisible';
import { Text } from 'react-native';
interface AuthInputProps extends TextInputProps {
    className?: string;
    label?: string;
    isRequired?: boolean;
}

const AuthInput: React.FC<AuthInputProps> = ({ className, label, isRequired, secureTextEntry, ...props }) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return (
        <View className='w-full' style={styles.Field}>
            {label && <CustomText style={styles.label}>{label}{isRequired && <Text style={{ color: 'red' }}>*</Text>}</CustomText>}
            <View className='relative'>
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#797979"
                    secureTextEntry={secureTextEntry && !isPasswordVisible}
                    className={`!px-[12px] py-[10px] h-[40px] text-[16px] mb-0 bg-lightGray shadow-sm w-full rounded-[10px] ${className} text-[#242424]`}
                    {...props}
                />
                {secureTextEntry && (
                    <TouchableOpacity
                        onPress={togglePasswordVisibility}
                        style={styles.icon}
                    >
                        {isPasswordVisible ?
                            <EyeHidden />
                            :
                            <EyeVisible />
                        }
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        fontFamily: typography.sfRegular,
        fontWeight: "400",
        color: '#242424',
        fontSize: 14,
        backgroundColor:"black",
        paddingVertical:10,
        paddingHorizontal:12,
    },
    Field: {
        marginBottom: 14,
    },
    icon: {
        position: 'absolute',
        right: 15,
        top: 15,
    },
    label: {
        marginBottom: 6,
        fontSize: 13,
        fontFamily: typography.sfMedium,
        fontWeight: "500",
        color: '#242424',
    },
});

export default styled(AuthInput);
