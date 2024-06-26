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
import { typography } from '@social/utils/typography';
import { colors } from '@social/utils/colors';
import { TextInput } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import DownIcon from "react-native-vector-icons/Entypo"
import DatePicker from 'react-native-date-picker';
import { formatDate } from '@social/components/Inputs/ManageAccountInput';
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
  const [bio, setBio] = useState<string>('');
  const [dob, setDob] = useState<string | Date>(new Date());
  const [username, setUsername] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [formError, setFormError] = useState<string | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [photoData, setPhotoData] = useState<any>(null);
  const [isModalVisible, setIsModalVisible] = useState(false); // State for modal visibility
  const [date, setDate] = useState<Date>(new Date());
  const [open, setOpen] = useState<boolean>(false)
  const navigation = useNavigation();
  const [updateUserData, { isLoading }] = useUpdateUserDataMutation();
  const [getLoggedInUserData, { isLoading: isUserDataLoading }] = useGetLoggedInUserDataMutation();
  const dispatch = useDispatch()
  const handleNameChange = (text: string) => {
    const validatedText = text.replace(/[^a-zA-Z\s]/g, '');
    setName(validatedText);
  };
  //changing
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
    if (!name.trim()) {
      setFormError('Name is required');
      return;
    }
    if (username === "") {
      setFormError('Username is required');
      return;
    }
    if (username?.length <= 4) {
      setFormError('Username is too short');
      return;
    }

    if (phoneNumber.length !== 10) {
      setFormError('Phone number must be exactly 10 digits.');
      return;
    }
    if (!country) {
      setFormError('Country is required');
      return;
    }
    setFormError(null); // Clear any existing errors

    const formData: any = new FormData();
    formData.append('ProfilePicture', {
      uri: photoData.path,
      type: photoData.mime,
      name: photoData.path.split('/').pop(),
    });
    formData.append('Name', name);
    formData.append('username', username);
    formData.append('phone', phoneNumber);
    formData.append('country', country);
    formData.append('DOB', formatDate(dob));
    formData.append('bio', bio);
    console.log("formData:", formData);

    try {
      const token = await AsyncStorage.getItem('token');
      console.log("token", token);

      if (token) {
        const updateResponse = await updateUserData(formData).unwrap();
        console.log("updateResponse--->", updateResponse);

        const fetchToken = async () => {
          try {
            const storedToken = await AsyncStorage.getItem("token");
            if (storedToken) {
              const tokenObj = { token: storedToken };
              const getUserDataResponse = await getLoggedInUserData(
                tokenObj,
              ).unwrap();
              console.log("getUserDataResponse--->", updateResponse);
              let userData = {
                token: storedToken,
                data: getUserDataResponse.data,
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
        (navigation as any).navigate('FollowSomeone');
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
  const handleDateChange = (newDate: Date) => {
    setDate(newDate);
    setDob(newDate);
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
  // Example list of countries
  const countryList = [
    { label: 'United States', value: 'United States' },
    { label: 'Canada', value: 'Canada' },
    { label: 'India', value: 'India' },
  ];
  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#FF4D67" />
        </View>
      ) : (
        <ScrollView>
          <AuthHeader
            title="Complete Your Profile"
            // description="Don’t worry, only you can see your personal data. No one else will be able to see it."
            descriptionClass={styles.descriptionClass}
          />

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
          {formError && (
            <View style={styles.errorContainer}>
              <CustomText style={styles.errorText}>{formError}</CustomText>
            </View>
          )}
          <View style={styles.inputContainer}>
            <AuthInput
              placeholder="eg. rohit"
              value={name}
              onChangeText={handleNameChange}
              keyboardType="default"
              label="Name"
              isRequired
            />
            <AuthInput
              placeholder="eg. rohit_123"
              value={username}
              onChangeText={e => setUsername(e)}
              keyboardType="default"
              label="Username"
              isRequired
            />
            {/* -------------Phone number------------------- */}
            <View>
              <CustomText style={styles.LabelStyle}>Phone Number <Text style={{ color: 'red' }}>*</Text></CustomText>
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
                textInputProps={{ placeholderTextColor: '#797979', placeholder: "XXXXX XXXXX" }}
              />
            </View>

            {/* ---------Country------------ */}
            <View>
              <CustomText style={styles.LabelStyle}>Country <Text style={{ color: 'red' }}>*</Text></CustomText>
              <RNPickerSelect
                placeholder={{ label: 'Select your country', value: null }}
                value={country}
                onValueChange={(value) => setCountry(value)}
                items={countryList}
                style={{
                  inputIOS: styles.pickerSelectStyles,
                  inputAndroid: styles.pickerSelectStyles,
                }}
                useNativeAndroidPickerStyle={false}
                Icon={() => {
                  return <DownIcon name='chevron-small-down' size={24} color="black" style={{ right: 10, top: 10 }} />;
                }}
              />
            </View>

            {/* //----------DOB--------- */}
            <View>
              <CustomText style={styles.LabelStyle}>Date of Birth <Text style={{ color: 'red' }}>*</Text></CustomText>

              <TouchableOpacity
                style={styles.DOBinput}
                onPress={() => setOpen(true)}
              >
                <CustomText style={{ color: dob ? '#242424' : '#797979' }}>
                  {dob ? formatDate(new Date(dob)) : "dd//mm/yy"}
                </CustomText>
              </TouchableOpacity>
              <Modal
                transparent={true}
                animationType="slide"
                visible={open}
                onRequestClose={() => setOpen(false)}
              >
                <View style={styles.modalContainerdob}>
                  <View style={styles.modalContentdob}>
                    <DatePicker
                      date={date}
                      onDateChange={handleDateChange}
                      mode="date"
                      maximumDate={new Date()}
                      theme='light'
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
            </View>

            {/* --------------BIO------------ */}
            <View>
              <CustomText style={styles.LabelStyle}>Bio</CustomText>
              <TextInput
                placeholder="Write something that you want to show"
                value={bio}
                onChangeText={setBio}
                multiline
                numberOfLines={6}
                style={styles.bioInput}
                placeholderTextColor={colors.lightText}
              />
            </View>

            <PrimaryBtn onPress={handleNext} btnText="Next" btnClass="mt-[36px]" />
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
    paddingHorizontal: 16,
    width: "100%"
  },
  textMedium: {
    fontFamily: typography.sfMedium
  },
  LabelStyle: {
    fontFamily: typography.sfMedium,
    fontSize: 13,
    marginBottom: 6,
  },
  bioInput: {
    backgroundColor: colors.f6Color,
    borderRadius: 10,
    display: "flex",
    color: colors['24Color'],
    paddingHorizontal: 12,
    textAlignVertical: 'top',
    paddingVertical: 10,
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
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    // marginBottom: 12,
  },
  errorText: {
    color: '#F04438',
    fontSize: 14,
  },
  avatarContainer: {
    alignItems: 'center',
    marginVertical: 30,

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
    right: 4,
    backgroundColor: '#fff',
    borderRadius: 16,
  },
  inputContainer: {
    width: '100%',
    paddingBottom: 50,

  },
  phoneInputContainer: {
    height: 40,
    width: '100%',
    backgroundColor: '#f6f6f6',
    borderRadius: 10,
    marginBottom: 14,
  },
  phoneInputTextContainer: {
    paddingVertical: 0,
    height: 40,
    backgroundColor: '#f6f6f6',
    borderRadius: 10,
  },
  phoneInputText: {
    fontSize: 14,
    fontFamily: typography.sfRegular,
    color: colors['24Color'],
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
  descriptionClass: {
    width: 300,
  },
  sidePadding: {
    paddingHorizontal: 26,
    width: "100%"
  },
  pickerSelectStyles: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    // borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    backgroundColor: colors.f6Color,
    marginBottom: 14,
    height: 40,
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
  DOBinput: {
    width: '100%',
    backgroundColor: '#f6f6f6',
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 14,
    fontWeight: '400',
    borderRadius: 10,
    color: '#242424',
    fontFamily: typography.sfRegular,
    marginBottom: 14,
    height: 40,
  },

  modalContainerdob: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContentdob: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: 'center',
    width: "80%"
  },
});

export default CompleteProfile;
