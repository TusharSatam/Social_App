import React from 'react'
import { Text, View } from 'react-native'
import CustomText from '../../components/Text/CustomText'
import { useDispatch, useSelector } from 'react-redux'
import PrimaryBtn from '../../components/Buttons/PrimaryBtn'
import { logout } from '../../redux/Slice/AuthSlice'
import { CommonActions, useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const HomeScreen = () => {
  const userData = useSelector((state: any) => state.auth)
  const dispatch = useDispatch()
  const navigation = useNavigation();

  const handleLogout = async () => {
    await dispatch(logout())
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'AuthStack' }],
      })
    );
    await AsyncStorage.clear();

  }
  return (
    <View className='flex min-h-screen flex-1 justify-center items-center'>
      <CustomText className='text-[24px]'>Welcome,</CustomText>
      <CustomText className='text-[24px] text-primaryColor'> {userData?.user?.Name?userData?.user?.Name:userData?.user?.email}</CustomText>
      <PrimaryBtn btnText='Log out' onPress={handleLogout} btnClass={"!w-[140px] p-2 my-4"} />
    </View>
  )
}

export default HomeScreen