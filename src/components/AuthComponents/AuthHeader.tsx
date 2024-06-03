import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import CustomText from '../Text/CustomText';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthHeaderPropType {
  title: string;
  description: string;
  descriptionClass?: string;
  containerClass?: string;
  displayEmail?: boolean;
}

const AuthHeader: React.FC<AuthHeaderPropType> = ({ title, description, descriptionClass, displayEmail, containerClass }) => {
  const [userEmail, setUserEmail] = useState<string | null>(null)
  useEffect(() => {
    const fetchEmail = async () => {
      const storedEmail = await AsyncStorage.getItem('email');
      setUserEmail(storedEmail)
    }
    fetchEmail()
  }, [])
  return (
    <View className={`flex justify-center items-center my-6 ${containerClass}`}>
      <CustomText className='!font-medium text-[30px] text-center'>{title}</CustomText>
      <CustomText className={`text-center font-regular text-[16px] text-Gray w-[280px] ${descriptionClass}`}>{description}</CustomText>
      {displayEmail && <CustomText className='font-regular text-[16px] text-primaryColor'>{userEmail ? userEmail : ""}</CustomText>}
    </View>
  );
}

export default AuthHeader;
