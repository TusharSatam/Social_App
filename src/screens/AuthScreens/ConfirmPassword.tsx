import React, { useState } from 'react'
import { ScrollView, View } from 'react-native'
import AuthInput from '../../components/Inputs/AuthInput'
import PrimaryBtn from '../../components/Buttons/PrimaryBtn';
import { useNavigation } from '@react-navigation/native';
import AuthHeader from '../../components/AuthComponents/AuthHeader';

const ConfirmPassword = () => {
    const navigation = useNavigation()
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const handleCreateNewPassword = () => {
        (navigation as any).navigate('Signin');
    };
    return (
        <View className=' flex-1 flex justify-start items-center bg-white !p-4'>
            <ScrollView className='w-full'>
                <AuthHeader title='New Password' description='Your new Password must be different from previously used passwords.' />
                <View className='w-full'>
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
                    <PrimaryBtn onPress={handleCreateNewPassword} btnText="Create New Password" btnClass={"my-6"} />

                </View>

            </ScrollView>
        </View>
    )
}

export default ConfirmPassword