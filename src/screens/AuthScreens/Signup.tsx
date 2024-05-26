import { Link, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View, Alert, ActivityIndicator } from 'react-native';
import AuthHeader from '../../components/AuthComponents/AuthHeader';
import AuthInput from '../../components/Inputs/AuthInput';
import PrimaryBtn from '../../components/Buttons/PrimaryBtn';
import CheckBox from 'react-native-check-box';
import CustomText from '../../components/Text/CustomText';
import SocialMediaSignin from '../../components/AuthComponents/SocialMediaSignin';
import { ALERT_TYPE, AlertNotificationRoot, Dialog } from 'react-native-alert-notification';
import { useRegisterMutation } from '../../redux/services/auth/authApi';
import { setAuthData } from '../../redux/Slice/AuthSlice';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface RegisterError {
  data: {
    message: string;
  };
}
const Signup = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isAgreed, setIsAgreed] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string>('');
  const [fomrError, setFormError] = useState<string>('');

  const [passwordError, setPasswordError] = useState<string>('');
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>('');
  const [termsError, setTermsError] = useState<string>('');
  const [registerMutation, { isLoading }] = useRegisterMutation();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSignup = async () => {
    let valid = true;
    setFormError('')
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      valid = false;
    } else {
      setEmailError('');
    }

    if (!validatePassword(password)) {
      setPasswordError("Password must be at least 8 characters long and include at least one special character and one numeric character.");
      valid = false;
    } else {
      setPasswordError('');
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Password and Confirm Password do not match.");
      valid = false;
    } else {
      setConfirmPasswordError('');
    }

    if (!isAgreed) {
      setTermsError("You need to agree with the terms and conditions.");
      valid = false;
    } else {
      setTermsError('');
    }

    if (valid) {
      try {
        const registerResponse = await registerMutation({ email, password }).unwrap();
        console.log("data", registerResponse);
        //TODO: uncomment after signup api updated
        
        if (registerResponse?.message === "User successfully signed up") {
          await AsyncStorage.setItem('registerEmail', email);
          await AsyncStorage.setItem('registerPassword', password);
          (navigation as any).navigate('VerifyCode');
        }
      } catch (error: any) {
        if (error.data && error.data.message) {
          setFormError(error.data.message);
          console.log("error", error.data.message);
        } else {
          console.error("Unexpected error:", error);
        }
      }
    }
  };

  const handleNavigationToSignin = () => {
    (navigation as any).navigate('Signin');
  };

  return (
    <AlertNotificationRoot>
      <View className=" flex-1 flex justify-start items-center bg-white !p-4">
        {!isLoading && <ScrollView className='w-full'>
          <AuthHeader title='Create Account' description='Fill your information below or register with your social account.' />
          <View className='flex justify-center items-center'>
            <CustomText className='text-[#F04438] text-[sm]'>{fomrError}</CustomText>
          </View>
          <View className='w-full'>
            <AuthInput
              placeholder="example@gmail.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              label="Email"
            />
            {emailError ? <CustomText className=' text-[#F04438] text-[14px] mb-3 !font-normal'>{emailError}</CustomText> : null}

            <AuthInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              label="Password"
            />
            {passwordError ? <CustomText className=' text-[#F04438] text-[14px] mb-3 !font-normal'>{passwordError}</CustomText> : null}

            <AuthInput
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              label="Confirm Password"
            />
            {confirmPasswordError ? <CustomText className=' text-[#F04438] text-[14px] mb-3 !font-normal'>{confirmPasswordError}</CustomText> : null}

            <View className='flex flex-row items-center'>
              <CheckBox
                isChecked={isAgreed}
                onClick={() => setIsAgreed(!isAgreed)}
                checkBoxColor="#FF4D67"
                checkedCheckBoxColor="FF4D67"
              />
              <CustomText className="ml-2 text-black">
                Agree with <Link to="/terms"><CustomText className="text-primaryColor">Terms & Conditions</CustomText></Link>
              </CustomText>
            </View>
            {termsError ? <CustomText className=' text-[#F04438] text-[14px] mb-3 !font-normal'>{termsError}</CustomText> : null}
          </View>
          <PrimaryBtn onPress={handleSignup} btnText="Sign Up" btnClass={"my-6"} />
          <SocialMediaSignin />
          <View className=' gap-1 flex flex-row justify-center items-center'><CustomText className='text-Gray font-medium text-[16px]'>Already have an account?</CustomText>
            <TouchableOpacity onPress={handleNavigationToSignin} ><CustomText className='text-primaryColor underline font-semibold text-[16px]'>Sign in</CustomText></TouchableOpacity>
          </View>
        </ScrollView>}
        {isLoading && (
          <View className="absolute h-full w-full inset-0 flex justify-center items-center bg-white bg-opacity-50">
            <ActivityIndicator size="large" color="#FF4D67" />
          </View>
        )}
      </View>
    </AlertNotificationRoot>
  )
}

export default Signup;
