import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';

interface ImageUploadModalProps {
    isVisible: boolean;
    onClose: () => void;
    onPickImage: () => void;
    onTakePhoto: () => void;
}

const ImageUploadModal: React.FC<ImageUploadModalProps> = ({ isVisible, onClose, onPickImage, onTakePhoto }) => {
    return (
        <Modal isVisible={isVisible} onBackdropPress={onClose} onSwipeComplete={onClose} swipeDirection="down">
            <View style={styles.modalContent}>
                <TouchableOpacity onPress={onPickImage} style={styles.option}>
                    <Text style={styles.optionText}>Upload from Gallery</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onTakePhoto} style={styles.option}>
                    <Text style={styles.optionText}>Take Photo</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onClose} style={styles.option}>
                    <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
    },
    option: {
        paddingVertical: 15,
        alignItems: 'center',
    },
    optionText: {
        fontSize: 16,
        color:"black",
    },
    cancelText:{
        fontSize: 16,
        color:"#FF4D67",
    }
});

export default ImageUploadModal;
