import React, { useState } from 'react'
import { View } from 'react-native'
import CustomText from '../../components/Text/CustomText'
import AuthHeader from '../../components/AuthComponents/AuthHeader'
import AuthInput from '../../components/Inputs/AuthInput'
import { useNavigation } from '@react-navigation/native'
import PrimaryBtn from '../../components/Buttons/PrimaryBtn'

const ForgotPassword = () => {
    const navigation = useNavigation()
    const [email, setEmail] = useState<string>('');
    const handleSendOTP = () => {
        (navigation as any).navigate("ConfirmPassword");
    };
    return (
        <View className=" flex-1 flex justify-start items-center bg-white !p-4 w-full">
            <AuthHeader title='Forgot Password' description='Can’t Remember Password. Enter your email below for OTP confiramtion' descriptionClass="!w-[300px]" />
            <View className='flex w-full'>
                <AuthInput
                    placeholder="example@gmail.com"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    label="Email"
                />
                <PrimaryBtn onPress={handleSendOTP} btnText="Send OTP" btnClass={"my-6"} />
            </View>
        </View>
    )
}

export default ForgotPassword