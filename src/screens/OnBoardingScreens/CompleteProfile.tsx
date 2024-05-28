import React, { useState, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import AuthHeader from '../../components/AuthComponents/AuthHeader';
import AuthInput from '../../components/Inputs/AuthInput';
import PhoneInput from 'react-native-phone-number-input';
import { useNavigation } from '@react-navigation/native';
import PrimaryBtn from '../../components/Buttons/PrimaryBtn';
import UserIcon from '../../../assets/icons/largeUserIcon.svg';
import CameraIcon from '../../../assets/icons/camera.svg';
import ImagePicker from 'react-native-image-crop-picker';
import { Avatar } from 'react-native-paper';
import { useUpdateUserDataMutation } from '../../redux/services/auth/authApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomText from '../../components/Text/CustomText';
import { ActivityIndicator } from 'react-native';

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
  const phoneInput = useRef<PhoneInput>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [photoData, setPhotoData] = useState<any>(null);
  const navigation = useNavigation();
  const [updateUserData, { isLoading }] = useUpdateUserDataMutation();

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
        console.log("formData", formData);

        const updateResponse = await updateUserData(formData).unwrap();
        console.log(updateResponse);
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
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      cropperCircleOverlay: true,
      avoidEmptySpaceAroundImage: true,
      freeStyleCropEnabled: true,
    }).then((image: any) => {
      console.log('image=====>', image.path);
      setPhoto(image.path);
      setPhotoData(image);
    }).catch(error => {
      console.error('Error picking image: ', error);
    });
  };

  return (
    <View style={styles.container} className="w-screen">
      {isLoading ? <View className="absolute h-full w-full inset-0 flex justify-center items-center bg-white bg-opacity-50">
        <ActivityIndicator size="large" color="#FF4D67" />
      </View> : <ScrollView className="w-full">
        <AuthHeader
          containerClass="!my-[40px]"
          descriptionClass="!text-[16px] w-full"
          title="Complete Your Profile"
          description="Don’t worry, only you can see your personal data. No one else will be able to see it."
        />
        {formError && (
          <View className='flex justify-center items-center mb-4'>
            <CustomText className='text-[#F04438] text-[sm]'>{formError}</CustomText>
          </View>
        )}
        <View className="w-full flex justify-center items-center my-6">
          <TouchableOpacity
            onPress={handleImageUpload}
            className="flex bg-lightGray rounded-full h-[142px] w-[142px] relative items-center justify-center">
            {photo !== null ? (
              <Avatar.Image source={{ uri: photo }} size={142} />
            ) : (
              <UserIcon height={60} width={54} />
            )}

            <View className="absolute right-1 bottom-1">
              <CameraIcon height={32} width={32} />
            </View>
          </TouchableOpacity>
        </View>
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

          <PrimaryBtn onPress={handleNext} btnText="Next" btnClass="my-6" />
        </View>
      </ScrollView>}
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
