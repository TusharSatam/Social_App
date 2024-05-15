import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { ALERT_TYPE, AlertNotificationRoot, Dialog } from 'react-native-alert-notification'
import { Text } from 'react-native-svg'
import GoogleIcon from '../../../assets/icons/googleIcon.svg'
import FacebookIcon from '../../../assets/icons/facebookIcon.svg'
import CustomText from '../Text/CustomText'
const SocialMediaSignin = () => {
    const handleGoogleSignup = () => {
        // Add signup logic here
        //Todo:remove toast during api intgration 
        Dialog.show({
            type: ALERT_TYPE.WARNING,
            title: 'Info',
            textBody: 'Google authentication is still under development.',
            button: 'close',
        })
    };
    const handleFacebookSignup = () => {
        // Add signup logic here
        //Todo:remove toast during api intgration 
        Dialog.show({
            type: ALERT_TYPE.WARNING,
            title: 'Info',
            textBody: 'Facebook authentication is still under development.',
            button: 'close',
        })
    };
    return (
        <View className='flex w-full'>
            <View className='flex justify-center items-center w-[304px] flex-row gap-2 mx-auto'>
                <View className='h-[1px] bg-Gray  w-[90px]'></View>
                <CustomText className='text-Gray font-medium text-[16px] whitespace-nowrap'>Or sign in with</CustomText>
                <View className='h-[1px] bg-Gray  w-[90px]'></View>
            </View>
            <View className='socialMedia flex flex-row  justify-center items-center gap-4 h-[72px] my-6 '>
                <TouchableOpacity onPress={handleGoogleSignup}>
                    <View className='rounded-full  h-[72px] w-[72px] flex justify-center items-center shadow-2xl border-2 border-lightGray'>
                        <GoogleIcon width={24} height={24} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleFacebookSignup}>
                    <View className='rounded-full shadow-2xl h-[72px] w-[72px] flex justify-center items-center  border-2 border-lightGray '>
                        <FacebookIcon width={24} height={24} />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default SocialMediaSignin