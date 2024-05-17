import React from 'react'
import { Text, View } from 'react-native'
import CustomText from '../../components/Text/CustomText'

const HomeScreen = () => {
  return (
    <View className='flex flex-1 justify-center items-center'>
      <CustomText className='text-[24px]'>HomeSreen</CustomText>
    </View>
  )
}

export default HomeScreen