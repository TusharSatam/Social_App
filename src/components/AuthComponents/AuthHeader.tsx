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
  descriptionClass?: string;
  containerClass?: string;
  displayEmail?: boolean;
  backArrow?: boolean;
}

const AuthHeader: React.FC<AuthHeaderPropType> = ({ title, description, descriptionClass, displayEmail, containerClass, backArrow }) => {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const navigation = useNavigation()
  useEffect(() => {
    const fetchEmail = async () => {
      const storedEmail = await AsyncStorage.getItem('registerEmail');
      setUserEmail(storedEmail);
      console.log(storedEmail);
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
        <CustomText style={[styles.description, descriptionClass && styles[descriptionClass]]} >{description}</CustomText>
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
    marginVertical: 32,
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
  },
  email: {
    fontFamily: typography.sfMedium,
    fontWeight: '500',
    fontSize: 16,
    color: '#FF4D67', // Replace 'primaryColor' with the actual color value or variable
  },
});

export default AuthHeader;
