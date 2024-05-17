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
      <NavigationContainer>

          <Stack.Navigator initialRouteName="Signup" screenOptions={{ presentation: "card", animation: "flip" }}>
            <Stack.Screen
              name="Signup"
              component={Signup}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Signin"
              component={Signin}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPassword}
              options={{
                title: '', // Set a title for the screen
                headerBackTitle: 'Back', // Set a custom back button label
                headerShown: true, // Show the header
                headerShadowVisible: false,
              }}
            />
            <Stack.Screen
              name="ConfirmPassword"
              component={ConfirmPassword}
              options={{
                title: '', // Set a title for the screen
                headerBackTitle: 'Back', // Set a custom back button label
                headerShown: true, // Show the header
                headerShadowVisible: false,
              }}
            />
            <Stack.Screen
              name="SelectInterests"
              component={SelectInterests}
              options={{
                title: '', // Set a title for the screen
                headerBackTitle: 'Back', // Set a custom back button label
                headerShown: true, // Show the header
                headerShadowVisible: false,
              }}
            />
            <Stack.Screen
              name="CompleteProfile"
              component={CompleteProfile}
              options={{
                title: '', // Set a title for the screen
                headerBackTitle: 'Back', // Set a custom back button label
                headerShown: true, // Show the header
                headerShadowVisible: false,
              }}
            />
            <Stack.Screen
              name="VerifyCode"
              component={VerifyCode}
              options={{
                title: '', // Set a title for the screen
                headerBackTitle: 'Back', // Set a custom back button label
                headerShown: true, // Show the header
                headerShadowVisible: false,
              }}
            />
            <Stack.Screen
              name="HomeScreen"
              component={HomeScreen}
              options={{
                title: '', // Set a title for the screen
                headerBackTitle: 'Back', // Set a custom back button label
                headerShown: false, // Show the header
                headerShadowVisible: false,
              }}
            />
          </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default App;
