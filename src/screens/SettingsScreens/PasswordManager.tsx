import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { useNavigation, NavigationProp, CommonActions } from '@react-navigation/native';
import ManageAccountInput from '@social/components/Inputs/ManageAccountInput';
import ScreenHeader from '@social/components/ScreenHeader/ScreenHeader';
import CustomText from '@social/components/Text/CustomText';
import PrimaryBtn from '@social/components/Buttons/PrimaryBtn';
import { useUpdateProfilePasswordMutation } from '@social/redux/services/auth/authApi';
import { useDispatch, useSelector } from 'react-redux';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logout } from '@social/redux/Slice/AuthSlice';
import ConfirmModal from '@social/components/Modal/ConfirmModal';

type Errors = {
    newPassword?: string;
    confirmPassword?: string;
};

const PasswordManager: React.FC = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation<NavigationProp<any>>();
    const [currentPassword, setCurrentPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false); // State for modal visibility
    const userData = useSelector((state: any) => state.auth);
    const [updateProfilePassword, { isLoading: updatePasswordLoading }] = useUpdateProfilePasswordMutation();

    const handleNavigationToForgotPassword = async () => {
        await dispatch(logout());
        await AsyncStorage.clear();
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: "AuthStack" }],
            }),
        );
        navigation.navigate('ForgotPassword');
    };

    const validatePassword = (password: string) => {
        const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        return regex.test(password);
    };

    const handleSubmit = async () => {
        console.log("credential", newPassword, confirmPassword);

        if (newPassword !== confirmPassword) {
            setErrorMessage('Passwords do not match.');
            return;
        }
        if (!validatePassword(newPassword)) {
            setErrorMessage('Password must be at least 8 characters long, contain one special character, and be alphanumeric.');
            return;
        }
        setErrorMessage('');

        setIsLoading(true);
        try {
            let Credential = {
                email: userData?.user?.email,
                currentPassword: currentPassword,
                newPassword: newPassword,
            };
            console.log(Credential);
            const updatePasswordResponse = await updateProfilePassword(Credential);
            console.log("updatePasswordResponse", updatePasswordResponse);

            if (updatePasswordResponse.data?.message === "Password changed successfully") {
                Dialog.show({
                    type: ALERT_TYPE.SUCCESS,
                    title: 'Success',
                    textBody: 'Password changed successfully.',
                    button: 'close',
                });
            } else if (updatePasswordResponse?.error?.data?.message === "Current password is incorrect") {
                Dialog.show({
                    type: ALERT_TYPE.DANGER,
                    title: 'Error',
                    textBody: 'Current password is incorrect.',
                    button: 'close',
                });
            } else {
                Dialog.show({
                    type: ALERT_TYPE.DANGER,
                    title: 'Error',
                    textBody: 'Failed to update your password.',
                    button: 'close',
                });
            }
        } catch (error) {
            Alert.alert('Error', 'An error occurred while updating the password');
        } finally {
            setIsLoading(false);
        }
    };

    const handleForgotPasswordPress = () => {
        setIsModalVisible(true); // Show the modal
    };

    const handleModalConfirm = () => {
        setIsModalVisible(false); // Hide the modal
        handleNavigationToForgotPassword(); // Navigate to ForgotPassword
    };

    const handleModalCancel = () => {
        setIsModalVisible(false); // Hide the modal
    };

    return (
        <View style={styles.mainContainer}>
            {isLoading && (
                <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color="#FF4D67" />
                </View>
            )}
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <ScreenHeader headerName='Password Manager' navigation={navigation} />
                <View style={styles.currentPassword}>
                    <ManageAccountInput
                        placeholderText="Current Password"
                        value={currentPassword}
                        onChange={(value: string) => setCurrentPassword(value)}
                        secureTextEntry
                        label="Current Password"
                    />
                    <TouchableOpacity onPress={handleForgotPasswordPress}>
                        <CustomText style={styles.forgotPasswordText}>
                            Forgot Password?
                        </CustomText>
                    </TouchableOpacity>
                </View>
                <View>
                    <ManageAccountInput
                        placeholderText="New Password"
                        value={newPassword}
                        onChange={(value: string) => setNewPassword(value)}
                        secureTextEntry
                        label="New Password"
                    />
                    <ManageAccountInput
                        placeholderText="Confirm New Password"
                        value={confirmPassword}
                        onChange={(value: string) => setConfirmPassword(value)}
                        secureTextEntry
                        label="Confirm New Password"
                    />
                </View>
                {errorMessage ? <CustomText style={styles.errorText}>{errorMessage}</CustomText> : null}
                <View style={styles.submitButton}>
                    <PrimaryBtn btnText="Submit" onPress={handleSubmit} />
                </View>
            </ScrollView>
            <ConfirmModal
                visible={isModalVisible}
                onConfirm={handleModalConfirm}
                onCancel={handleModalCancel}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    contentContainer: {
        paddingHorizontal: 16,
        paddingBottom: 24,
    },
    currentPassword: {
        marginTop: 16,
    },
    submitButton: {
        marginTop: 24,
    },
    loadingOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    forgotPasswordText: {
        color: '#FF4D67', // Your primary color
        textAlign: 'right',
        fontWeight: '600',
        textDecorationLine: 'underline',
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginTop: 10,
    },
});

export default PasswordManager;
