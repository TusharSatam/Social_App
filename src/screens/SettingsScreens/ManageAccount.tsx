import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ManageAccountInput from '@social/components/Inputs/ManageAccountInput';
import ScreenHeader from '@social/components/ScreenHeader/ScreenHeader';
import PrimaryBtn from '@social/components/Buttons/PrimaryBtn';

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

    const [form, setForm] = useState<FormState>({
        name: '',
        username: '',
        phoneNumber: '',
        email: '',
        dob: new Date(),
        gender: '',
    });

    const [errors, setErrors] = useState<ErrorsState>({});

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

    const handleSubmit = () => {
        if (validateForm()) {
            Alert.alert("Form submitted successfully!");
        } else {
        }
    };

    return (
        <View style={styles.mainContainer}>
            <ScreenHeader headerName='Manage Account' navigation={navigation} />
            <ScrollView style={styles.detailWrapper}>
                <View style={styles.scrollView}>
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
                <PrimaryBtn btnText='Update Profile' onPress={handleSubmit} btnClass={"mb-10"}/>
            </ScrollView>
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
});

export default ManageAccount;
