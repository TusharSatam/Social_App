import React from 'react';
import { View, Text } from 'react-native';
import CustomText from '../Text/CustomText';

interface AuthHeaderPropType {
  title: string;
  description: string;
  descriptionClass?: string;
  containerClass?:string;
  displayEmail?: boolean;
}

const AuthHeader: React.FC<AuthHeaderPropType> = ({ title, description, descriptionClass, displayEmail,containerClass }) => {
  return (
    <View className={`flex justify-center items-center my-6 ${containerClass}`}>
      <CustomText className='!font-medium text-[30px] text-center'>{title}</CustomText>
      <CustomText className={`text-center font-regular text-[16px] text-Gray w-[280px] ${descriptionClass}`}>{description}</CustomText>
      {displayEmail && <CustomText className='font-regular text-[16px] text-primaryColor'>example@gmail.com</CustomText>}
    </View>
  );
}

export default AuthHeader;
