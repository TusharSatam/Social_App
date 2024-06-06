// ConfirmModal.tsx
import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import CustomText from '../Text/CustomText';

interface ConfirmModalProps {
    visible: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ visible, onConfirm, onCancel }) => {
    return (
        <Modal
            transparent={true}
            visible={visible}
            animationType="slide"
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <CustomText style={styles.modalTitle}>Confirm</CustomText>
                    <CustomText style={styles.modalText}>Are you sure you forgot your password?</CustomText>
                    <View style={styles.modalButtons}>
                        <TouchableOpacity onPress={onCancel} style={styles.modalCancelButton}>
                            <CustomText style={styles.cancelButtonText}>Cancel</CustomText>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onConfirm} style={styles.modalButton}>
                            <CustomText style={styles.buttonText}>Yes</CustomText>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 10,
    },
    modalText: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
        color: "#797979"
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    modalCancelButton: {
        marginHorizontal: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        backgroundColor: '#F6F6F6',
    },
    modalButton: {
        marginHorizontal: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        backgroundColor: '#FF4D67', // Your primary color
    },
    cancelButtonText: {
        color: "#FF4D67",
        fontWeight: '600',
    },
    buttonText: {
        color: 'white',
        fontWeight: '600',
    },
});

export default ConfirmModal;
