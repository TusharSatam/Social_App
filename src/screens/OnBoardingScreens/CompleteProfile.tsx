import React, { useState, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Modal, Text } from 'react-native';
import AuthHeader from '../../components/AuthComponents/AuthHeader';
import AuthInput from '../../components/Inputs/AuthInput';
import PhoneInput from 'react-native-phone-number-input';
import { useNavigation } from '@react-navigation/native';
import PrimaryBtn from '../../components/Buttons/PrimaryBtn';
import UserIcon from '../../../assets/icons/largeUserIcon.svg';
import CameraIcon from '../../../assets/icons/camera.svg';
import ImagePicker from 'react-native-image-crop-picker';
import { Avatar } from 'react-native-paper';
import { useGetLoggedInUserDataMutation, useUpdateUserDataMutation } from '../../redux/services/auth/authApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomText from '../../components/Text/CustomText';
import { ActivityIndicator } from 'react-native';
import { setAuthData } from '@social/redux/Slice/AuthSlice';
import { useDispatch } from 'react-redux';

interface UpdateData {
  Name: string;
  phone?: string;
  ProfilePicture?: {
    uri: string | null;
    type: string | null;
    name: string | null;
  } | null;
}

const CompleteProfile: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [formError, setFormError] = useState<string | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [photoData, setPhotoData] = useState<any>(null);
  const [isModalVisible, setIsModalVisible] = useState(false); // State for modal visibility
  const navigation = useNavigation();
  const [updateUserData, { isLoading }] = useUpdateUserDataMutation();
  const [getLoggedInUserData, { isLoading: isUserDataLoading }] = useGetLoggedInUserDataMutation();
  const dispatch = useDispatch()
  const handleNameChange = (text: string) => {
    const validatedText = text.replace(/[^a-zA-Z\s]/g, '');
    setName(validatedText);
  };

  const handlePhoneChange = (text: string) => {
    const formattedPhoneNumber = text.replace(/[^\d]/g, '');
    if (formattedPhoneNumber.length <= 10) {
      setPhoneNumber(formattedPhoneNumber);
    }
  };

  const handleNext = async () => {
    if (!photoData) {
      setFormError('Profile picture is required');
      return;
    }

    if (phoneNumber.length !== 10) {
      setFormError('Phone number must be exactly 10 digits.');
      return;
    }

    setFormError(null); // Clear any existing errors

    const formData: any = new FormData();
    formData.append('Name', name);
    formData.append('phone', phoneNumber);
    formData.append('ProfilePicture', {
      uri: photoData.path,
      type: photoData.mime,
      name: photoData.path.split('/').pop(),
    });

    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        const updateResponse = await updateUserData(formData).unwrap();
        const fetchToken = async () => {
          try {
            const storedToken = await AsyncStorage.getItem("token");
            if (storedToken) {
              const tokenObj = { token: storedToken };
              const getUserDataResponse = await getLoggedInUserData(
                tokenObj,
              ).unwrap();
              let userData = {
                token: storedToken,
                data: getUserDataResponse,
              };
              dispatch(setAuthData(userData));
            }
          } catch (error) {
            console.error(
              "Failed to fetch the token from AsyncStorage:",
              error,
            );
          }
        };

        await fetchToken();
        // Handle response if needed
        (navigation as any).navigate('SelectInterests');
      } else {
        console.error('Token not found');
      }
    } catch (error) {
      console.error('Failed to update user data:', error);
    }
  };

  const handleImageUpload = () => {
    setIsModalVisible(true); // Show modal for image upload options
  };

  const handlePickImage = () => {
    setIsModalVisible(false); // Close modal
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      cropperCircleOverlay: true,
      avoidEmptySpaceAroundImage: true,
      freeStyleCropEnabled: true,
    }).then((image: any) => {
      setPhoto(image.path);
      setPhotoData(image);
    }).catch(error => {
      console.error('Error picking image: ', error);
    });
  };

  const handleTakePhoto = () => {
    setIsModalVisible(false); // Close modal
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      cropperCircleOverlay: true,
      avoidEmptySpaceAroundImage: true,
      freeStyleCropEnabled: true,
    }).then((image: any) => {
      setPhoto(image.path);
      setPhotoData(image);
    }).catch(error => {
      console.error('Error taking photo: ', error);
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false); // Close modal
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#FF4D67" />
        </View>
      ) : (
        <ScrollView>
          <AuthHeader
            containerClass="my-8"
            descriptionClass="text-sm w-full"
            title="Complete Your Profile"
            description="Don’t worry, only you can see your personal data. No one else will be able to see it."
          />
          {formError && (
            <View style={styles.errorContainer}>
              <CustomText style={styles.errorText}>{formError}</CustomText>
            </View>
          )}
          <TouchableOpacity
            onPress={handleImageUpload}
            style={styles.avatarContainer}>
            <View style={styles.avatar}>
              {photo !== null ? (
                <Avatar.Image source={{ uri: photo }} size={142} />
              ) : (
                <UserIcon height={60} width={54} />
              )}
              <View style={styles.cameraIcon}>
                <CameraIcon height={32} width={32} />
              </View>
            </View>
          </TouchableOpacity>
          <View style={styles.inputContainer}>
            <AuthInput
              placeholder="John Doe"
              value={name}
              onChangeText={handleNameChange}
              keyboardType="default"
              label="Name"
            />
            <View>
              <CustomText className="mb-1 font-medium text-[16px]">Phone Number</CustomText>
              <PhoneInput
                value={phoneNumber}
                defaultCode="IN"
                layout="second"
                onChangeText={handlePhoneChange}
                onChangeFormattedText={handlePhoneChange}
                withDarkTheme
                containerStyle={styles.phoneInputContainer}
                textContainerStyle={styles.phoneInputTextContainer}
                textInputStyle={styles.phoneInputText}
                textInputProps={{ placeholderTextColor: '#797979' }}
              />
            </View>
            <PrimaryBtn onPress={handleNext} btnText="Next" btnClass="my-6" />
          </View>
        </ScrollView>
      )}
      {/* Modal for image upload options */}
      <Modal
        visible={isModalVisible}
        transparent
        animationType="slide"
        onRequestClose={handleCancel}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              onPress={handlePickImage}
              style={styles.modalOption}>
              <Text style={styles.modalOptionText}>Upload from Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleTakePhoto}
              style={styles.modalOption}>
              <Text style={styles.modalOptionText}>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleCancel}
              style={styles.modalOption}>
              <Text style={[styles.modalOptionText, { color: '#FF4D67' }]}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  errorText: {
    color: '#F04438',
    fontSize: 14,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    width: '80%',
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  modalOption: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalOptionText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#333',
  },
});

export default CompleteProfile;
