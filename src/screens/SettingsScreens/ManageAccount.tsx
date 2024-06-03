import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ManageAccountInput from '@social/components/Inputs/ManageAccountInput';
import ScreenHeader from '@social/components/ScreenHeader/ScreenHeader';
import PrimaryBtn from '@social/components/Buttons/PrimaryBtn';
import { useSelector } from 'react-redux';
import { Avatar } from 'react-native-paper';
import ImagePicker from 'react-native-image-crop-picker';
import CameraIcon from '../../../assets/icons/camera.svg';
import UserIcon from '../../../assets/icons/largeUserIcon.svg';
import ImageUploadModal from '@social/components/Modal/ImageUploadModal';

interface FormState {
    name: string;
    username: string;
    phoneNumber: string;
    email: string;
    dob: Date;
    gender: string;
}

interface ErrorsState {
    [key: string]: string | null;
}

const ManageAccount: React.FC = () => {
    const navigation = useNavigation();
    const userData = useSelector((state: any) => state.auth);

    useEffect(() => {
        console.log(userData);
        
        if (userData?.user?.ProfilePicture !== "" && userData?.user?.ProfilePicture) {
            setPhoto(userData?.user?.ProfilePicture);
        }
    }, [userData]);

    const [photo, setPhoto] = useState<string | null>(null);
    const [form, setForm] = useState<FormState>({
        name: '',
        username: '',
        phoneNumber: '',
        email: '',
        dob: new Date(),
        gender: '',
    });

    const [errors, setErrors] = useState<ErrorsState>({});
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleChange = (field: keyof FormState, value: string | Date) => {
        setForm({ ...form, [field]: value });
        if (errors[field]) {
            setErrors({ ...errors, [field]: null });
        }
    };

    const validateForm = (): boolean => {
        let valid = true;
        let errors: ErrorsState = {};

        if (!form.name) {
            errors.name = "Name is required";
            valid = false;
        } else if (/\d/.test(form.name)) {
            errors.name = "Name should not contain numbers";
            valid = false;
        }

        if (!form.username) {
            errors.username = "Username is required";
            valid = false;
        }

        if (!form.phoneNumber) {
            errors.phoneNumber = "Phone Number is required";
            valid = false;
        } else if (!/^\d{10}$/.test(form.phoneNumber)) {
            errors.phoneNumber = "Phone Number should be 10 digits";
            valid = false;
        }

        if (!form.email) {
            errors.email = "Email is required";
            valid = false;
        } else if (!/\S+@\S+\.\S+/.test(form.email)) {
            errors.email = "Email is invalid";
            valid = false;
        }

        if (!form.dob) {
            errors.dob = "Date of Birth is required";
            valid = false;
        }

        if (!form.gender) {
            errors.gender = "Gender is required";
            valid = false;
        }

        setErrors(errors);
        return valid;
    };

    const handlePickImage = async () => {
        try {
            const image = await ImagePicker.openPicker({
                width: 300,
                height: 400,
                cropping: true,
                mediaType: 'photo',
            });
            if (image && image.path) {
                setPhoto(image.path);
                setIsModalVisible(false);
            }
        } catch (error) {
            console.log('Error selecting image:', error);
        }
    };

    const handleTakePhoto = async () => {
        try {
            const image = await ImagePicker.openCamera({
                width: 300,
                height: 400,
                cropping: true,
                mediaType: 'photo',
            });
            if (image && image.path) {
                setPhoto(image.path);
                setIsModalVisible(false);
            }
        } catch (error) {
            console.log('Error taking photo:', error);
        }
    };

    const handleSubmit = () => {
        if (validateForm()) {
            console.log("Form data:", form);
            console.log("Photo data:", photo);
            Alert.alert("Form submitted successfully!");
        } else {
            Alert.alert("Please fill out all required fields correctly.");
        }
    };

    return (
        <View style={styles.mainContainer}>
            <ScreenHeader headerName='Manage Account' navigation={navigation} />
            <ScrollView style={styles.detailWrapper}>
                <View style={styles.scrollView}>
                    <View style={styles.avatarContainer}>
                        <TouchableOpacity
                            onPress={() => setIsModalVisible(true)}
                            style={styles.avatar}>
                            {photo ? (
                                <Avatar.Image source={{ uri: photo }} size={142} />
                            ) : (
                                <UserIcon height={60} width={54} />
                            )}
                            <View style={styles.cameraIcon}>
                                <CameraIcon height={32} width={32} />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <ManageAccountInput
                        label={"Name"}
                        placeholderText={"Enter your name"}
                        inputType="default"
                        value={form.name}
                        onChange={(value) => handleChange('name', value)}
                        error={errors.name}
                    />
                    <ManageAccountInput
                        label={"Username"}
                        placeholderText={"Enter your username"}
                        inputType="default"
                        value={form.username}
                        onChange={(value) => handleChange('username', value)}
                        error={errors.username}
                    />
                    <ManageAccountInput
                        label={"Phone Number"}
                        placeholderText={"Enter your phone number"}
                        inputType="phone-pad"
                        value={form.phoneNumber}
                        onChange={(value) => handleChange('phoneNumber', value)}
                        error={errors.phoneNumber}
                    />
                    <ManageAccountInput
                        label={"Email"}
                        placeholderText={"Enter your email"}
                        inputType="email-address"
                        value={form.email}
                        onChange={(value) => handleChange('email', value)}
                        error={errors.email}
                    />
                    <ManageAccountInput
                        label={"DOB"}
                        placeholderText={"Select your date of birth"}
                        inputType="date"
                        value={form.dob}
                        onChange={(value) => handleChange('dob', value)}
                        error={errors.dob}
                    />
                    <ManageAccountInput
                        label={"Gender"}
                        placeholderText={"Select your gender"}
                        inputType="select"
                        value={form.gender}
                        onChange={(value) => handleChange('gender', value)}
                        error={errors.gender}
                    />
                </View>
                <PrimaryBtn btnText='Update Profile' onPress={handleSubmit} btnClass={"mb-10"} />
            </ScrollView>
            <ImageUploadModal
                isVisible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
                onPickImage={handlePickImage}
                onTakePhoto={handleTakePhoto}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
    },
    detailWrapper: {
        flex: 1,
        paddingTop: 20,
        width: '100%',
    },
    scrollView: {
        flex: 1,
    },
    avatarContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    avatar: {
        backgroundColor: '#f0f0f0',
        width: 142,
        height: 142,
        borderRadius: 71,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    cameraIcon: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 4,
    },
});

export default ManageAccount;
