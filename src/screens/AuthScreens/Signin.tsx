import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, View, Alert } from 'react-native';
import AuthHeader from '../../components/AuthComponents/AuthHeader';
import SocialMediaSignin from '../../components/AuthComponents/SocialMediaSignin';
import CustomText from '../../components/Text/CustomText';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import AuthInput from '../../components/Inputs/AuthInput';
import PrimaryBtn from '../../components/Buttons/PrimaryBtn';
import { useLoginMutation } from '../../redux/services/auth/authApi';
import { setAuthData } from '../../redux/Slice/AuthSlice';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';
const Signin: React.FC = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const dispatch = useDispatch();
  const [loginMutation, { isLoading }] = useLoginMutation();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [fomrError, setFormError] = useState<string>('');

  const handleNavigationToSignup = () => {
    navigation.navigate('Signup');
  };

  const handleNavigationToForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  const handleSignin = async () => {
    setFormError('')
    try {
      const loginResponse = await loginMutation({ email, password }).unwrap();
      console.log('Login successful:', loginResponse);
      await AsyncStorage.setItem('token', loginResponse.token);
      dispatch(setAuthData(loginResponse));
      // (navigation as any).navigate('HomeScreen');
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'MainStack' }],
        })
      );
    } catch (error) {
      console.error('Login failed:', error);
      setFormError('Invalid email or password')
    }
  };

  return (
    <View className="flex-1 flex justify-start items-center bg-white p-4">
      <ScrollView className="w-full">
        <AuthHeader title="Sign In" description="Hi! Welcome back, you’ve been missed" descriptionClass="w-[300px]" />
        <View className='flex justify-center items-center'>
          <CustomText className='text-[#F04438] text-[sm]'>{fomrError}</CustomText>
        </View>
        <View className="w-full">
          <AuthInput
            placeholder="example@gmail.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            label="Email"
          />
          <AuthInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            label="Password"
          />
          <TouchableOpacity onPress={handleNavigationToForgotPassword}>
            <CustomText className="text-primaryColor text-right font-semibold underline">
              Forgot Password?
            </CustomText>
          </TouchableOpacity>
          <PrimaryBtn onPress={handleSignin} btnText="Sign In" btnClass="my-6" />
        </View>
        <SocialMediaSignin />
        <View className="text-base gap-1 flex flex-row justify-center items-center">
          <CustomText className="text-Gray font-medium text-[16px]">Don't have an account?</CustomText>
          <TouchableOpacity onPress={handleNavigationToSignup}>
            <CustomText className="text-primaryColor underline font-semibold text-[16px]">Sign up</CustomText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Signin;
