import React, { useState } from 'react';
import { ScrollView, View, Text } from 'react-native';
import AuthInput from '../../components/Inputs/AuthInput';
import PrimaryBtn from '../../components/Buttons/PrimaryBtn';
import { useNavigation } from '@react-navigation/native';
import AuthHeader from '../../components/AuthComponents/AuthHeader';
import CustomText from '../../components/Text/CustomText';
import { useChangePasswordMutation } from '../../redux/services/auth/authApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
interface ChangePassword {
    email: string;
    newPassword: string;
}
const ChangePassword = () => {
    const navigation = useNavigation();
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [changePassword, { isLoading }] = useChangePasswordMutation();

    const validatePassword = (password: string) => {
        const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        return regex.test(password);
    };

    const handleCreateNewPassword = async () => {
        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match.');
            return;
        }
        if (!validatePassword(password)) {
            setErrorMessage('Password must be at least 8 characters long, contain one special character, and be alphanumeric.');
            return;
        }
        setErrorMessage('');
        const userEmail = await AsyncStorage.getItem("forgotEmail");
        console.log("success newpass", password);

        if (userEmail) {
            const credentials: ChangePassword = { email: userEmail, newPassword: password }
            const updatePasswordResponse = await changePassword(credentials)
            console.log("updatePasswordResponse", updatePasswordResponse);

            if (updatePasswordResponse?.data?.message === "Password updated successfully") {
                await AsyncStorage.removeItem("forgotEmail");
                (navigation as any).navigate('Signin');
            }
        }

    };

    return (
        <View className='flex-1 flex justify-start items-center bg-white p-4'>
            <ScrollView className='w-full'>
                <AuthHeader title='New Password' description='Your new Password must be different from previously used passwords.' />
                {errorMessage ? <CustomText className='text-red-500 text-center'>{errorMessage}</CustomText> : null}
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
    );
};

export default ChangePassword;
