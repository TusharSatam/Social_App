import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import AuthHeader from '../../components/AuthComponents/AuthHeader';
import AuthInput from '../../components/Inputs/AuthInput';
import PhoneInput from 'react-native-phone-number-input';

const CompleteProfile: React.FC = () => {
    const [name, setName] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const phoneInput = React.useRef<PhoneInput>(null);

    const handleNameChange = (text: string) => {
        const validatedText = text.replace(/[^a-zA-Z\s]/g, '');
        setName(validatedText);
    };

    const handlePhoneChange = (text: string) => {
        // Restrict phone number to 10 digits
        const formattedPhoneNumber = text.replace(/[^\d]/g, '');
        if (formattedPhoneNumber.length <= 10) {
            setPhoneNumber(formattedPhoneNumber);
        }
    };

    return (
        <View style={styles.container}>
            <AuthHeader
                containerClass='!w-full mt-0'
                descriptionClass='!text-[16px] !w-full'
                title='Complete Your Profile'
                description='Don’t worry, only you can see your personal data. No one else will be able to see it.'
            />
            <View style={styles.inputContainer}>
                <AuthInput
                    placeholder="John Doe"
                    value={name}
                    onChangeText={handleNameChange}
                    keyboardType="default"
                    label="Name"
                />
                <PhoneInput
                    ref={phoneInput}
                    defaultValue={phoneNumber}
                    defaultCode="IN"
                    layout="second"
                    onChangeText={handlePhoneChange}
                    onChangeFormattedText={handlePhoneChange}
                    withDarkTheme
                    // withShadow
                    autoFocus
                    containerStyle={styles.phoneInputContainer}
                    textContainerStyle={styles.phoneInputTextContainer}
                    textInputStyle={styles.phoneInputText}
                    textInputProps={{ placeholderTextColor: '#797979' }}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 16,
    },
    inputContainer: {
        width: '100%',
    },
    phoneInputContainer: {
        height: 50,
        width: '100%',
        backgroundColor: '#f6f6f6',
        borderRadius: 10,
    },
    phoneInputTextContainer: {
        paddingVertical: 0,
        height: 50,
        backgroundColor: '#f6f6f6',
        borderRadius: 10,
    },
    phoneInputText: {
        fontSize: 16,
        color: '#797979',
    },
});

export default CompleteProfile;
