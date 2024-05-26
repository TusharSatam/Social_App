import * as React from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import Signup from './src/screens/AuthScreens/Signup';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Signin from './src/screens/AuthScreens/Signin';
import ForgotPassword from './src/screens/AuthScreens/ForgotPassword';
import ConfirmPassword from './src/screens/AuthScreens/ConfirmPassword';
import SelectInterests from './src/screens/OnBoardingScreens/SelectInterests';
import CompleteProfile from './src/screens/OnBoardingScreens/CompleteProfile';
import VerifyCode from './src/screens/AuthScreens/VerifyCode';
import HomeScreen from './src/screens/HomeScreen/HomeScreen';
import ProtectedRoute from './src/components/ProtectedRoute';

// Define a type for the navigation stack parameters
type RootStackParamList = {
  Signup: undefined;
  Signin: undefined;
  ForgotPassword: undefined;
  ConfirmPassword: undefined;
  SelectInterests: undefined;
  CompleteProfile: undefined;
  VerifyCode: undefined;
  HomeScreen: undefined
};




const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <ProtectedRoute />
    </SafeAreaView>
  );
}

export default App;
