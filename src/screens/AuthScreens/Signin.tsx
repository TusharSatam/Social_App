import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, View, Alert, StyleSheet } from 'react-native';
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
import { ActivityIndicator } from 'react-native';
import { typography } from '@social/utils/typography';
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
      await AsyncStorage.setItem('token', loginResponse.token);
      dispatch(setAuthData(loginResponse));
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
    <View className="flex-1 flex justify-start items-center bg-white">
      {isLoading ?
        <View className="absolute h-full w-full inset-0 flex justify-center items-center bg-white bg-opacity-50">
          <ActivityIndicator size="large" color="#FF4D67" />
        </View>
        : <ScrollView className="w-full">
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
              placeholder="••••••••"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              label="Password"
            />
            <TouchableOpacity onPress={handleNavigationToForgotPassword}>
              <CustomText className="text-primaryColor text-right font-semibold underline" style={styles.textSemibold}>
                Forgot Password?
              </CustomText>
            </TouchableOpacity>
            <PrimaryBtn onPress={handleSignin} btnText="Sign In" btnClass="mt-[36px] mb-[42px]" />
          </View>
          <SocialMediaSignin />
          <View  style={styles.dontHaveAnAccountContainer}>
            <CustomText style={styles.dontHaveAnAccount}>Don't have an account?</CustomText>
            <TouchableOpacity onPress={handleNavigationToSignup}>
              <CustomText style={styles.textSemibold} className="text-primaryColor underline font-semibold text-[16px]">Sign up</CustomText>
            </TouchableOpacity>
          </View>
        </ScrollView>}
    </View>
  );
};
const styles = StyleSheet.create({

  textSemibold: {
    fontFamily: typography.sfSemiBold,
  },
  dontHaveAnAccount:{
    color:"#797979",
    fontFamily:typography.sfMedium,
    fontSize:16,
  },
  dontHaveAnAccountContainer:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: typography.sfMedium,
    marginBottom:72,
    gap:4,
  }
});
export default Signin;
