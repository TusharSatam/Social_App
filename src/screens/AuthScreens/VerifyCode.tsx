import React, { useRef, useState } from 'react'
import { TextInput, TouchableOpacity, View, NativeSyntheticEvent, TextInputKeyPressEventData, Alert } from 'react-native'
import AuthHeader from '../../components/AuthComponents/AuthHeader'
import PrimaryBtn from '../../components/Buttons/PrimaryBtn'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import CustomText from '../../components/Text/CustomText'
import { ALERT_TYPE, AlertNotificationRoot, Dialog } from 'react-native-alert-notification'

type CodeArray = [string, string, string, string]

const VerifyCode: React.FC = () => {
    const navigation = useNavigation<NavigationProp<any>>()

    const [code, setCode] = useState<CodeArray>(['', '', '', ''])
    const inputRefs = useRef<Array<TextInput | null>>([])

    const handleVerifyCodeSignIn = () => {
        if (code.join('').length === 4) {
            navigation.navigate('CompleteProfile')
        } else if (code.join('').length < 4) {
            Dialog.show({
                type: ALERT_TYPE.INFO,
                title: 'Info',
                textBody: 'Please enter 4 digit Code.',
                button: 'close',
            })
        } else {
            // Handle the error (e.g., show a message to the user)
            console.log('')
            Dialog.show({
                type: ALERT_TYPE.DANGER,
                title: '',
                textBody: 'Invalid code.',
                button: 'close',
            })
        }
    }

    const handleResendOTP = () => {
        // Implement OTP resend functionality here
        console.log('Resend OTP')
    }

    const handleChangeText = (text: string, index: number) => {
        const newCode = [...code] as CodeArray
        newCode[index] = text
        setCode(newCode)

        if (text && index < 3) {
            // Focus the next input if there is a next input and the current input is not the last one
            inputRefs.current[index + 1]?.focus()
        }
    }

    const handleKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>, index: number) => {
        console.log(e.nativeEvent.key);

        if (e.nativeEvent.key === 'Backspace' && index > 0 && !code[index]) {
            // Focus the previous input if the current input is empty and it's not the first input
            inputRefs.current[index - 1]?.focus()
        }
    }

    return (
        <AlertNotificationRoot>
            <View className="flex-1 flex justify-start items-center bg-white !p-4">
                <AuthHeader title="Verify Code" description="Please enter the code we just sent to email" displayEmail descriptionClass="!w-full" />
                <View className="flex-row space-x-2 mt-4">
                    {code.map((digit, index) => (
                        <TextInput
                            key={index}
                            ref={el => (inputRefs.current[index] = el)}
                            value={digit}
                            onChangeText={text => handleChangeText(text, index)}
                            onKeyPress={e => handleKeyPress(e, index)}
                            keyboardType="numeric"
                            maxLength={1}
                            placeholder='-'
                            placeholderTextColor="black"
                            style={{
                                borderWidth: 1,
                                borderColor: '#f6f6f6',
                                textAlign: 'center',
                                fontSize: 14,
                            }}
                            className='placeholder:text-black text-[14px] !font-medium rounded-lg w-[65px] h-[48px] bg-lightGray'
                        />
                    ))}
                </View>
                <View className="w-full items-center justify-center flex my-6">
                    <CustomText className="text-Gray text-[14px] !font-medium">Didn't receive OTP?</CustomText>
                    <TouchableOpacity onPress={handleResendOTP}>
                        <CustomText className="!font-semibold text-[15px] !underline text-primaryColor">Resend code</CustomText>
                    </TouchableOpacity>
                </View>
                <PrimaryBtn btnText="Sign In" onPress={handleVerifyCodeSignIn} />
            </View>
        </AlertNotificationRoot>
    )
}

export default VerifyCode
