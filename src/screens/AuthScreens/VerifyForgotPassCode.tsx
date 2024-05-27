import React, { useEffect, useRef, useState } from 'react';
import { TextInput, TouchableOpacity, View, NativeSyntheticEvent, TextInputKeyPressEventData, ScrollView } from 'react-native';
import AuthHeader from '../../components/AuthComponents/AuthHeader';
import PrimaryBtn from '../../components/Buttons/PrimaryBtn';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import CustomText from '../../components/Text/CustomText';
import { ALERT_TYPE, AlertNotificationRoot, Dialog } from 'react-native-alert-notification';
import { useVerifyForgotPassOTPMutation } from '../../redux/services/auth/authApi';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

type CodeArray = [string, string, string, string];

interface ForgotCredentials {
    otp: string;
    email: string;
}

const VerifyForgotPassCode: React.FC = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation<NavigationProp<any>>();
    const [verifyForgotPassOTP, { isLoading }] = useVerifyForgotPassOTPMutation();
    const [code, setCode] = useState<CodeArray>(['', '', '', '']);
    const [userEmail, setUserEmail] = useState<string | null>(null);

    const inputRefs = useRef<Array<TextInput | null>>([]);

    const handleVerifyCodeSignIn = async () => {
        if (code.join('').length === 4) {
            const forgotCredentials: ForgotCredentials = { otp: code.join(''), email: userEmail ?? ''};
            try {
                const verifyForgotOTPResponse = await verifyForgotPassOTP(forgotCredentials).unwrap();
                console.log("verifyForgotOTPResponse",verifyForgotOTPResponse);
                
                if (verifyForgotOTPResponse?.message === "OTP verified successfully") {
                    // TODO: Verify OTP API integration pending because of invalid OTP length from API response
                    // await AsyncStorage.setItem('token', verifyOTPResponse.token);
                    // dispatch(setAuthData(verifyOTPResponse));
                    await AsyncStorage.removeItem("forgotEmail");
                    navigation.navigate('ChangePassword');
                }
            } catch (error) {
                Dialog.show({
                    type: ALERT_TYPE.DANGER,
                    title: 'Error',
                    textBody: 'Invalid code or verification failed.',
                    button: 'close',
                });
            }
        } else {
            Dialog.show({
                type: ALERT_TYPE.INFO,
                title: 'Info',
                textBody: 'Please enter a 4-digit code.',
                button: 'close',
            });
        }
    };

    const handleResendOTP = () => {
        // Implement OTP resend functionality here
        console.log('Resend OTP');
    };

    const handleChangeText = (text: string, index: number) => {
        const newCode = [...code] as CodeArray;
        newCode[index] = text;
        setCode(newCode);

        if (text && index < 3) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>, index: number) => {
        if (e.nativeEvent.key === 'Backspace' && index > 0 && !code[index]) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    useEffect(() => {
        const fetchCredentials = async () => {
            const storedEmail = await AsyncStorage.getItem('forgotEmail');
            setUserEmail(storedEmail);
        };
        fetchCredentials();
    }, []);

    return (
        <AlertNotificationRoot>
            <View className="flex-1 flex justify-start items-center bg-white !p-4">
                <ScrollView className='w-full'>
                    <AuthHeader title="Verify Code" description="Please enter the code we just sent to your email" displayEmail descriptionClass="!w-full" />
                    <View className="flex-row space-x-2 mt-4 mx-auto">
                        {code.map((digit, index) => (
                            <TextInput
                                key={index}
                                ref={el => (inputRefs.current[index] = el)}
                                value={digit}
                                onChangeText={text => handleChangeText(text, index)}
                                onKeyPress={e => handleKeyPress(e, index)}
                                keyboardType="numeric"
                                maxLength={1}
                                placeholder='-'
                                placeholderTextColor="black"
                                style={{
                                    borderWidth: 1,
                                    borderColor: '#f6f6f6',
                                    textAlign: 'center',
                                    fontSize: 14,
                                }}
                                className='placeholder:text-black text-[14px] !font-medium rounded-lg w-[65px] h-[48px] bg-lightGray'
                            />
                        ))}
                    </View>
                    <View className="w-full items-center justify-center flex my-6">
                        <CustomText className="text-Gray text-[14px] !font-medium">Didn't receive OTP?</CustomText>
                        <TouchableOpacity onPress={handleResendOTP}>
                            <CustomText className="!font-semibold text-[15px] !underline text-primaryColor">Resend code</CustomText>
                        </TouchableOpacity>
                    </View>
                    <PrimaryBtn btnText="Sign In" onPress={handleVerifyCodeSignIn} />
                </ScrollView>
            </View>
        </AlertNotificationRoot>
    );
};

export default VerifyForgotPassCode;
