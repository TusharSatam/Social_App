import { useNavigation } from '@react-navigation/native'
import AuthInput from '@social/components/Inputs/AuthInput'
import ManageAccountInput from '@social/components/Inputs/ManageAccountInput'
import ScreenHeader from '@social/components/ScreenHeader/ScreenHeader'
import CustomText from '@social/components/Text/CustomText'
import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

const PasswordManager = () => {
    const navigation = useNavigation()
    const [currentPassword, setcurrentPassword] = useState<string>("")
    const [newPassword, setNewPassword] = useState<string>("")
    const [confirmPassword, setConfirmPassword] = useState<string>("")
    const handleNavigationToForgotPassword = () => {
        (navigation as any).navigate('ForgotPassword');
    };
    return (
        <View style={styles.mainContainer}><ScreenHeader headerName='Password Manager' navigation={navigation} />
            <View style={styles.currentPassword}>
                <ManageAccountInput
                    placeholderText="Current Password"
                    value={currentPassword}
                    onChange={(value: string) => setcurrentPassword(value)}
                    secureTextEntry
                    label="Current Password"
                />
                <TouchableOpacity onPress={handleNavigationToForgotPassword}>
                    <CustomText className="text-primaryColor text-right font-semibold underline">
                        Forgot Password?
                    </CustomText>
                </TouchableOpacity>
            </View>
            <View>
                <ManageAccountInput
                    placeholderText="New Password"
                    value={currentPassword}
                    onChange={(value: string) => setcurrentPassword(value)}
                    secureTextEntry
                    label="New Password"
                />
                <ManageAccountInput
                    placeholderText="Confirm New Password"
                    value={currentPassword}
                    onChange={(value: string) => setcurrentPassword(value)}
                    secureTextEntry
                    label="Confirm New Password"
                />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
    },
    currentPassword:{
        marginTop:16
    }
})
export default PasswordManager