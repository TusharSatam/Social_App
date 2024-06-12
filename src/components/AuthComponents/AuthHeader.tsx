import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import CustomText from '../Text/CustomText';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { typography } from '@social/utils/typography';
import BackIcon from '../SvgIcons/NavigationHeaderIcons/BackIcon';
import { useNavigation } from '@react-navigation/native';

interface AuthHeaderPropType {
  title: string;
  description: string;
  descriptionClass?: any;
  containerClass?: any;
  displayEmail?: boolean;
  backArrow?: boolean;
}

const AuthHeader: React.FC<AuthHeaderPropType> = ({ title, description, descriptionClass, displayEmail, containerClass, backArrow }) => {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const navigation = useNavigation()
  useEffect(() => {
    const fetchEmail = async () => {
      let storedEmail = await AsyncStorage.getItem('registerEmail');
      if (!storedEmail) {
        storedEmail = await AsyncStorage.getItem('forgotEmail');        
      }
      setUserEmail(storedEmail);
    };
    fetchEmail();

  }, [userEmail]);

  return (
    <View>
      {backArrow && <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backArrow}>
        <BackIcon />
      </TouchableOpacity>}
      <View style={[styles.container, containerClass && styles[containerClass]]}>
        <CustomText style={styles.title}>{title}</CustomText>
        <View style={descriptionClass} className='w-full'>
          <CustomText style={[styles.description]}>{description}</CustomText>
        </View>
        {displayEmail && <CustomText style={styles.email}>{userEmail ? userEmail : ""}</CustomText>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backArrow: {
    paddingTop: 28,
  },
  container: {
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 20,
    width: "100%",
  },
  title: {
    fontWeight: '500',
    fontSize: 30,
    textAlign: 'center',
    fontFamily: typography.sfMedium,
    marginBottom: 12,
  },
  description: {
    textAlign: 'center',
    fontWeight: '400',
    fontSize: 16,
    color: "#797979",
    fontFamily: typography.sfRegular,
    width: "100%",
  },
  email: {
    fontFamily: typography.sfMedium,
    fontWeight: '500',
    fontSize: 16,
    color: '#FF4D67', // Replace 'primaryColor' with the actual color value or variable
  },
});

export default AuthHeader;
