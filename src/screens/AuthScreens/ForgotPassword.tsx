import React, { useState } from 'react';
import { ScrollView, View, Alert, StyleSheet } from 'react-native';
import CustomText from '../../components/Text/CustomText';
import AuthHeader from '../../components/AuthComponents/AuthHeader';
import AuthInput from '../../components/Inputs/AuthInput';
import { useNavigation } from '@react-navigation/native';
import PrimaryBtn from '../../components/Buttons/PrimaryBtn';
import { useSendForgotPassOTPMutation } from '../../redux/services/auth/authApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native';

const ForgotPassword = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState<string>('');
    const [formError, setFormError] = useState<string>('');
    const [sendForgotPassOTP, { isLoading }] = useSendForgotPassOTPMutation(); // Replace with your actual mutation

    const handleSendOTP = async () => {
        setFormError('');

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setFormError('Please enter a valid email address');
            return;
        }

        try {
            const response = await sendForgotPassOTP({ email }).unwrap(); // Adjust the API call as per your actual implementation
            await AsyncStorage.setItem('forgotEmail', email);
            (navigation as any).navigate('VerifyForgotPassCode');
        } catch (error) {
            console.error('Failed to send OTP:', error);
            setFormError('Failed to send OTP. Please try again later.');
        }
    };

    return (
        <View className="flex-1 flex justify-start items-center bg-white w-full relative">
            {isLoading ?
                <View className="absolute h-full w-full inset-0 flex justify-center items-center bg-white bg-opacity-50">
                    <ActivityIndicator size="large" color="#FF4D67" />
                </View>
                : <ScrollView className="w-full">
                    <AuthHeader title="Forgot Password" description="Can’t Remember Password. Enter your email below for OTP confiramtion"  descriptionClass={styles.descriptionClass} backArrow/>
                    <View className="flex w-full">
                        {formError ? (
                            <View className="flex justify-center items-center mb-4">
                                <CustomText className="text-[#F04438]">{formError}</CustomText>
                            </View>
                        ) : null}
                        <AuthInput
                            placeholder="example@gmail.com"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            label="Email"
                        />
                        <PrimaryBtn onPress={handleSendOTP} btnText="Send OTP" btnClass="my-6" disabled={isLoading as boolean} />
                    </View>
                </ScrollView>}
        </View>
    );
};
const styles = StyleSheet.create({
    descriptionClass: {
        maxWidth: 320,
    },
})

export default ForgotPassword;
