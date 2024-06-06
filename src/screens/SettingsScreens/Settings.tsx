import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, ScrollView, Modal, Text } from 'react-native';
import CustomText from '@social/components/Text/CustomText';
import PasswordManager from '@social/components/SvgIcons/SettingScreenIcons/PasswordManager';
import BookMarkIcon from '@social/components/SvgIcons/SettingScreenIcons/BookMarkIcon';
import UserIcon from '@social/components/SvgIcons/SettingScreenIcons/UserIcon';
import HelpIcon from '@social/components/SvgIcons/SettingScreenIcons/HelpIcon';
import PrivacyPolicy from '@social/components/SvgIcons/SettingScreenIcons/PrivacyPolicy';
import LogoutIcon from '@social/components/SvgIcons/SettingScreenIcons/LogoutIcon';
import ForwardIcon from '@social/components/SvgIcons/SettingScreenIcons/ForwardIcon';
import ScreenHeader from '@social/components/ScreenHeader/ScreenHeader';
import { logout } from '@social/redux/Slice/AuthSlice';
import { CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';

const Settings = ({ navigation }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const dispatch = useDispatch()
    const settingsOptions = [
        { title: 'Manage Account', icon: UserIcon, path: 'ManageAccount' },
        { title: 'Saved', icon: BookMarkIcon, path: "Saved" },
        { title: 'Password Manager', icon: PasswordManager, path: "PasswordManager" },
        { title: 'Help Center', icon: HelpIcon, path: "HelpCenter" },
        { title: 'Privacy Policy', icon: PrivacyPolicy, path: "PrivacyPolicy" },
        { title: 'Logout', icon: LogoutIcon, path: "Logout" },
    ];


    const handleLogout = async () => {
        await dispatch(logout());
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: "AuthStack" }],
            }),
        );
        await AsyncStorage.clear();
        setIsModalVisible(false);
    };
    return (
        <View style={styles.container}>
            <ScreenHeader headerName={"Settings"} navigation={navigation} />
            <ScrollView>
                {settingsOptions.map((Option, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.optionContainer}
                        onPress={() => {
                            if (Option.title === 'Logout') {
                                setIsModalVisible(true);
                            } else {
                                navigation.navigate(Option.path);
                            }
                        }}
                    >
                        {Option.icon && <Option.icon />}
                        <View style={styles.textContainer}>
                            <CustomText style={styles.optionText}>{Option.title}</CustomText>
                        </View>
                        <ForwardIcon />
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => setIsModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <CustomText style={styles.modalTitle}>Logout</CustomText>


                            <CustomText style={styles.modalText}>Are you sure you want to log out?</CustomText>
                        </View>
                        <View style={styles.modalButtons}>
                            <TouchableOpacity style={styles.cancelButton} onPress={() => setIsModalVisible(false)}>
                                <CustomText style={styles.cancelButtonText}>Cancel</CustomText>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                                <CustomText style={styles.buttonText}>Yes, Logout</CustomText>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
    },
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F1F1',
    },
    textContainer: {
        flex: 1,
        marginLeft: 16,
        fontSize: 16,
        fontWeight: '500',
        color: '#242424'
    },
    optionText: {
        fontSize: 16,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        alignItems: 'center',
    },
    modalHeader: {
        marginVertical: 20,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
    },
    modalTitle: {
        fontWeight: "600",
        fontSize: 16,
        paddingBottom: 16,
    },
    modalText: {
        fontSize: 14,
        fontWeight: '500',
        color: "#797979",
        borderTopWidth: 1.5,
        borderTopColor: "#f6f6f6",
        paddingTop: 16,
        width: "100%",
        textAlign: "center"
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginVertical: 14,
    },
    cancelButton: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        padding: 16,
        borderRadius: 100,
        marginRight: 10,
        alignItems: 'center',
    },
    logoutButton: {
        flex: 1,
        backgroundColor: '#FF4D67',
        padding: 16,
        borderRadius: 100,
        marginLeft: 10,
        alignItems: 'center',
    },
    cancelButtonText: {
        color: '#FF4D67',
        fontWeight: '600',
        fontSize: 15,
    },
    buttonText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 15,

    },
});

export default Settings;
