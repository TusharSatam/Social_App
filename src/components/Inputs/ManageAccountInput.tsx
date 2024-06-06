import React, { useState } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, Modal, Text, Platform } from 'react-native';
import CustomText from '../Text/CustomText';
import DatePicker from 'react-native-date-picker';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/Feather';

interface ManageAccountInputProps {
    placeholderText: string;
    label: string;
    inputType?: 'default' | 'email-address' | 'phone-pad' | 'date' | 'select';
    value: string | Date;
    onChange: (value: string | Date) => void;
    error?: string | null;
    secureTextEntry?: boolean;
}

const ManageAccountInput: React.FC<ManageAccountInputProps> = ({
    placeholderText,
    label,
    inputType = 'default',
    value,
    onChange,
    error,
    secureTextEntry,
    ...props
}) => {
    const [date, setDate] = useState<Date>(new Date(value));
    const [open, setOpen] = useState<boolean>(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const isDateInput = inputType === 'date';
    const isSelectInput = inputType === 'select';

    const handleDateChange = (newDate: Date) => {
        setDate(newDate);
        onChange(newDate);
    };

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };
    const formatDate = (date: Date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };
    return (
        <View style={styles.container}>
            {label && <CustomText style={styles.inputLabel}>{label}</CustomText>}
            {isDateInput ? (
                <>
                    <TouchableOpacity
                        style={styles.input}
                        onPress={() => setOpen(true)}
                    >
                        <CustomText style={{ color: value ? '#242424' : '#797979' }}>
                            {value ? formatDate(new Date(value)) : placeholderText}

                        </CustomText>
                    </TouchableOpacity>
                    <Modal
                        transparent={true}
                        animationType="slide"
                        visible={open}
                        onRequestClose={() => setOpen(false)}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <DatePicker
                                    date={date}
                                    onDateChange={handleDateChange}
                                    mode="date"
                                    maximumDate={new Date()} // Ensures date picker only allows past dates
                                />
                                <TouchableOpacity
                                    onPress={() => setOpen(false)}
                                    style={styles.closeButton}
                                >
                                    <CustomText style={styles.closeButtonText}>Done</CustomText>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </>
            ) : isSelectInput ? (
                <RNPickerSelect
                    style={{
                        inputIOS: styles.input,
                        inputAndroid: styles.input,
                    }}
                    placeholder={{
                        label: placeholderText,
                        value: null,
                    }}
                    value={value as string}
                    onValueChange={onChange}
                    items={[
                        { label: 'Male', value: 'male' },
                        { label: 'Female', value: 'female' },
                    ]}
                    useNativeAndroidPickerStyle={false} // only for Android
                    Icon={() => {
                        return Platform.OS === 'ios' ? (
                            <View style={styles.pickerIcon} />
                        ) : (
                            <View style={styles.pickerIconAndroid} />
                        );
                    }}
                />
            ) : secureTextEntry ? (
                <View className='relative'>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor="#797979"
                        placeholder={placeholderText}
                        secureTextEntry={secureTextEntry && !isPasswordVisible}
                        onChangeText={onChange}
                        className={`!px-4 py-3 text-[14px]  bg-lightGray shadow-sm w-full rounded-xl  text-Gray`}
                        {...props}
                    />
                    {secureTextEntry && (
                        <TouchableOpacity
                            onPress={togglePasswordVisibility}
                            style={styles.icon}
                        >
                            <Icon name={isPasswordVisible ? "eye-off" : "eye"} size={24} color="#797979" />
                        </TouchableOpacity>
                    )}
                </View>

            ) : (
                <TextInput
                    style={styles.input}
                    placeholderTextColor="lightgray"
                    placeholder={placeholderText ? placeholderText : ""}
                    keyboardType={inputType === 'email-address' ? 'email-address' : inputType === "phone-pad" ? "phone-pad" : 'default'}
                    value={value as string}
                    onChangeText={onChange}
                />
            )}
            {error && <CustomText style={styles.errorText}>{error}</CustomText>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        marginBottom: 16,
        display: 'flex',
        gap: 10,
    },
    inputLabel: {
        fontSize: 13,
        fontWeight: '500',
    },
    input: {
        width: '100%',
        backgroundColor: '#f6f6f6',
        paddingVertical: 10,
        paddingHorizontal: 16,
        fontSize: 14,
        fontWeight: '400',
        borderRadius: 10,
        color: '#242424',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'black',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        width: "80%"
    },
    closeButton: {
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#FF4D67',
        borderRadius: 10,
    },
    closeButtonText: {
        color: 'white',
        fontWeight: '500',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
    },
    pickerIcon: {
        borderTopWidth: 10,
        borderTopColor: '#00000020',
        borderBottomWidth: 10,
        borderBottomColor: '#00000020',
        borderLeftWidth: 10,
        borderLeftColor: 'transparent',
        borderRightWidth: 10,
        borderRightColor: 'transparent',
        width: 0,
        height: 0,
        marginTop: 8,
        marginRight: 10,
    },
    pickerIconAndroid: {
        backgroundColor: '#f6f6f6',
        width: 12,
        height: 12,
        top: 20,
        right: 15,
    },
    icon: {
        position: 'absolute',
        right: 15,
        top: 15,
    },
});

export default ManageAccountInput;
