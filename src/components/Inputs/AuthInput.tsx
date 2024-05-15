// components/AuthInput.tsx
import React, { useState } from 'react';
import { TextInput, View, StyleSheet, TextInputProps, TouchableOpacity, Image } from 'react-native';
import { styled } from 'nativewind';
import Icon from 'react-native-vector-icons/Feather';
import CustomText from '../Text/CustomText';
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
        <View className='w-full'>
            {label && <CustomText className="mb-1 font-medium text-[16px]">{label}</CustomText>}
            <View className='relative'>
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#797979"
                    secureTextEntry={secureTextEntry && !isPasswordVisible}
                    className={`!px-4 py-3 text-[16px] mb-3 bg-lightGray shadow-sm w-full rounded-xl ${className} text-Gray`}
                    {...props}
                />
                {secureTextEntry && (
                    <TouchableOpacity
                        onPress={togglePasswordVisibility}
                        style={styles.icon}
                    >
                        <Icon name={isPasswordVisible ? "eye-off" : "eye"} size={24} color="#797979" />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        fontFamily: 'SFProDisplay-Regular',
        color: '#242424',
        fontSize: 16,
    },
    icon: {
        position: 'absolute',
        right: 15,
        top: 15,
    },
    label: {
        marginBottom: 8,
        fontSize: 16,
        color: '#242424',
    },
});

export default styled(AuthInput);
