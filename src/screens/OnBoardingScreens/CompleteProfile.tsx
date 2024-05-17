import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AuthHeader from '../../components/AuthComponents/AuthHeader';
import AuthInput from '../../components/Inputs/AuthInput';
import PhoneInput from 'react-native-phone-number-input';
import { useNavigation } from '@react-navigation/native';
import PrimaryBtn from '../../components/Buttons/PrimaryBtn';
import UserIcon from '../../../assets/icons/largeUserIcon.svg';
import CameraIcon from '../../../assets/icons/camera.svg';
import ImagePicker from 'react-native-image-crop-picker';
import { Avatar } from 'react-native-paper';
import { ScrollView } from 'react-native';
const CompleteProfile = () => {
  interface ImageObject {
    path: string;
    mime: string;
    data: string;
    width: number;
    height: number;
    size: number;
    exif: any; // Assuming exif data is of any type
    cropRect: {
      x: number;
      y: number;
      width: number;
      height: number;
    };
    creationDate: string;
  }
  const [name, setName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const phoneInput = React.useRef<PhoneInput>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const navigation = useNavigation();
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
  const handleNext = () => {
    (navigation as any).navigate('SelectInterests');
  };
  const handleImageUpload = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      cropperCircleOverlay: true,
      avoidEmptySpaceAroundImage: true,
      freeStyleCropEnabled: true,
      includeBase64: true,
    }).then((image: any) => {
      console.log(image?.mime);
      const data = `data:${image?.mime};base64,${image?.data}`;
      setPhoto(data);
    });
  };


  return (
    <View style={styles.container} className='w-screen' >
      <ScrollView className='w-full'>
        <AuthHeader
          containerClass=" mt-0"
          descriptionClass="!text-[16px] w-full"
          title="Complete Your Profile"
          description="Don’t worry, only you can see your personal data. No one else will be able to see it."
        />

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
            // withShadow
            // autoFocus
            containerStyle={styles.phoneInputContainer}
            textContainerStyle={styles.phoneInputTextContainer}
            textInputStyle={styles.phoneInputText}
            textInputProps={{ placeholderTextColor: '#797979' }}
          />
          <PrimaryBtn onPress={handleNext} btnText="Next" btnClass={'my-6'} />
        </View>
      </ScrollView>
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
