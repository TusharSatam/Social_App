import React, { useState } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import AuthHeader from '../../components/AuthComponents/AuthHeader'
import SocialMediaSignin from '../../components/AuthComponents/SocialMediaSignin'
import CustomText from '../../components/Text/CustomText'
import { useNavigation } from '@react-navigation/native'
import AuthInput from '../../components/Inputs/AuthInput'
import PrimaryBtn from '../../components/Buttons/PrimaryBtn'
const Signin = () => {
  const navigation = useNavigation()
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const handleNavigationToSignup = () => {
    (navigation as any).navigate("Signup");
  };
  const handleNavigationToForgotPassword = () => {
    (navigation as any).navigate("ForgotPassword");
  };

  const handleSignin = () => {
    (navigation as any).navigate("HomeScreen");
  };
  return (
    <View className="flex-1 flex justify-start items-center bg-white !p-4 ">
     <ScrollView className='w-full'>
        <AuthHeader title='Sign In' description='Hi! Welcome back, you’ve been missed' descriptionClass="!w-[300px]" />
        <View className='w-full'>
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
          <TouchableOpacity onPress={handleNavigationToForgotPassword}><CustomText className='text-primaryColor text-right font-semibold underline'>Forgot Password?</CustomText></TouchableOpacity>
          <PrimaryBtn onPress={handleSignin} btnText="Sign In" btnClass={"my-6"} />
        </View>
        <SocialMediaSignin />
        <View className=' text-base gap-1 flex flex-row justify-center items-center'><CustomText className='text-Gray font-medium text-[16px]'>Don't have an account?</CustomText>
          <TouchableOpacity onPress={handleNavigationToSignup} ><CustomText className='text-primaryColor underline font-semibold text-[16px]'>Sign up</CustomText></TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

export default Signin