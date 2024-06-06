import React, { useEffect, useRef, useState } from 'react';
import { TextInput, TouchableOpacity, View, NativeSyntheticEvent, TextInputKeyPressEventData, ScrollView } from 'react-native';
import AuthHeader from '../../components/AuthComponents/AuthHeader';
import PrimaryBtn from '../../components/Buttons/PrimaryBtn';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import CustomText from '../../components/Text/CustomText';
import { ALERT_TYPE, AlertNotificationRoot, Dialog } from 'react-native-alert-notification';
import { useResendVerifyOTPMutation, useVerifyRegisterOTPMutation } from '../../redux/services/auth/authApi';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setAuthData } from '../../redux/Slice/AuthSlice';
import { CommonActions } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';

type CodeArray = [string, string, string, string];

interface RegisterCredentials {
    otp: string;
    email: string;
    password: string;
}

const VerifyCode: React.FC = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation<NavigationProp<any>>();
    const [verifyRegisterOTP, { isLoading }] = useVerifyRegisterOTPMutation();
    const [resendVerifyOTP, { isLoading: isResendLoading }] = useResendVerifyOTPMutation(); // Replace with your actual mutation

    const [code, setCode] = useState<CodeArray>(['', '', '', '']);
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [userPassword, setUserPassword] = useState<string | null>(null);
    const [formError, setFormError] = useState<string>('');

    const inputRefs = useRef<Array<TextInput | null>>([]);

    const handleVerifyCodeSignIn = async () => {
        if (code.join('').length === 4) {
            const registerCredentials: RegisterCredentials = { otp: code.join(''), email: userEmail ?? '', password: userPassword ?? '' };
            try {
                const verifyOTPResponse = await verifyRegisterOTP(registerCredentials).unwrap();

                if (verifyOTPResponse?.message === "OTP verified successfully") {
                    // TODO: Verify OTP API integration pending because of invalid OTP length from API response
                    await AsyncStorage.setItem('token', verifyOTPResponse.token);
                    await AsyncStorage.removeItem("registerEmail");
                    await AsyncStorage.removeItem("registerPasword");
                    await dispatch(setAuthData(verifyOTPResponse));
                    navigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [{ name: 'OnBoardingStack' }],
                        })
                    );

                    navigation.navigate('CompleteProfile');

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

    const handleResendOTP = async () => {
        setFormError('');

        try {
            const storedEmail = await AsyncStorage.getItem('registerEmail');
            if (!storedEmail) {
                setFormError('No email found to resend OTP');
                return;
            }

            const response = await resendVerifyOTP({ email: storedEmail }).unwrap();
            Dialog.show({
                type: ALERT_TYPE.SUCCESS,
                title: 'Success',
                textBody: 'OTP has been resent to your email.',
                button: 'close',
            });
        } catch (error) {
            console.error('Failed to resend OTP:', error);
            setFormError('Failed to resend OTP. Please try again later.');
        }
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
            const storedEmail = await AsyncStorage.getItem('registerEmail');
            const storedPassword = await AsyncStorage.getItem('registerPassword');
            setUserEmail(storedEmail);
            setUserPassword(storedPassword);
        };
        fetchCredentials();
    }, []);

    return (
        <AlertNotificationRoot>
            <View className="flex-1 flex justify-start items-center bg-white !p-4">
                {isResendLoading || isLoading ? <View className="absolute h-full w-full inset-0 flex justify-center items-center bg-white bg-opacity-50">
                    <ActivityIndicator size="large" color="#FF4D67" />
                </View> : <ScrollView className='w-full'>
                    <AuthHeader title="Verify Code" description="Please enter the code we just sent to your email" displayEmail descriptionClass="!w-full" />
                    {formError ? (
                        <View className="flex justify-center items-center mb-4">
                            <CustomText className="text-[#F04438]">{formError}</CustomText>
                        </View>
                    ) : null}
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
                </ScrollView>}
            </View>
        </AlertNotificationRoot>
    );
};

export default VerifyCode;
