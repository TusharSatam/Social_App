import { Link, useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import AuthHeader from '../../components/AuthComponents/AuthHeader'
import AuthInput from '../../components/Inputs/AuthInput'
import PrimaryBtn from '../../components/Buttons/PrimaryBtn'
import CheckBox from 'react-native-check-box'
import CustomText from '../../components/Text/CustomText'
import SocialMediaSignin from '../../components/AuthComponents/SocialMediaSignin'
import { AlertNotificationRoot } from 'react-native-alert-notification'

const Signup = () => {
  const navigation = useNavigation()
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isAgreed, setIsAgreed] = useState<boolean>(false);

  const handleSignup = () => {
    if (isAgreed) {
      // Add signup logic here
      (navigation as any).navigate('VerifyCode');
    } else {
      // Alert("You need to agree with the terms and conditions.");
    }
  };

  const handleNavigationToSignin = () => {
    (navigation as any).navigate('Signin');
  };
  return (
    <AlertNotificationRoot>
      <View className=" flex-1 flex justify-start items-center bg-white !p-4 ">
        <AuthHeader title='Create Account' description='Fill your information below or register with your social account.' />
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
          <AuthInput
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            label="Confirm Password"
          />
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
        </View>
        <PrimaryBtn onPress={handleSignup} btnText="Sign Up" btnClass={"my-6"} />
        <SocialMediaSignin />
        <View className=' gap-1 flex flex-row justify-center items-center'><CustomText className='text-Gray font-medium text-[16px]'>Already have an account?</CustomText>
          <TouchableOpacity onPress={handleNavigationToSignin} ><CustomText className='text-primaryColor underline font-semibold text-[16px]'>Sign in</CustomText></TouchableOpacity>
        </View>
      </View>
    </AlertNotificationRoot>
  )
}

export default Signup