// components/AuthInput.tsx
import React, { useState } from 'react';
import { TextInput, View, StyleSheet, TextInputProps, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import Icon from 'react-native-vector-icons/Feather';
import EYEIcon from 'react-native-vector-icons/Octicons';


import CustomText from '../Text/CustomText';
import { typography } from '@social/utils/typography';
interface AuthInputProps extends TextInputProps {
    className?: string;
    label?: string;
}

const AuthInput: React.FC<AuthInputProps> = ({ className, label, secureTextEntry, ...props }) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return (
        <View className='w-full' style={styles.Field}>
            {label && <CustomText style={styles.label}>{label}</CustomText>}
            <View className='relative'>
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#797979"
                    secureTextEntry={secureTextEntry && !isPasswordVisible}
                    className={`!px-4 py-3 text-[16px] mb-0 bg-lightGray shadow-sm w-full rounded-xl ${className} text-[#242424]`}
                    {...props}
                />
                {secureTextEntry && (
                    <TouchableOpacity
                        onPress={togglePasswordVisibility}
                        style={styles.icon}
                    >
                        {isPasswordVisible ?
                            <Icon name={"eye-off"} size={24} color="#797979" />
                            :
                            <EYEIcon name={"eye"} size={24} color="#797979" />
                        }
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        fontFamily: 'SFProDisplay-Regular',
        fontWeight: "400",
        color: '#242424',
        fontSize: 16,
    },
    Field: {
        marginVertical: 14,
    },
    icon: {
        position: 'absolute',
        right: 15,
        top: 15,
    },
    label: {
        marginBottom: 6,
        fontSize: 16,
        fontFamily: typography.sfMedium,
        // fontWeight:"500",
        color: '#242424',
    },
});

export default styled(AuthInput);
