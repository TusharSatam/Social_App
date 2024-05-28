import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signup from '../screens/AuthScreens/Signup';
import Signin from '../screens/AuthScreens/Signin';
import ChangePassword from '../screens/AuthScreens/ChangePassword';
import ForgotPassword from '../screens/AuthScreens/ForgotPassword';
import SelectInterests from '../screens/OnBoardingScreens/SelectInterests';
import CompleteProfile from '../screens/OnBoardingScreens/CompleteProfile';
import VerifyCode from '../screens/AuthScreens/VerifyCode';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import VerifyForgotPassCode from '../screens/AuthScreens/VerifyForgotPassCode';
import { useDispatch, useSelector } from 'react-redux';
import { useGetLoggedInUserDataMutation } from '../redux/services/auth/authApi';
import { setAuthData } from '../redux/Slice/AuthSlice';

type RootStackParamList = {
    AuthStack: undefined;
    MainStack: undefined;
    OnBoardingStack: undefined;
    Signup: undefined;
    Signin: undefined;
    ForgotPassword: undefined;
    ChangePassword: undefined;
    SelectInterests: undefined;
    CompleteProfile: undefined;
    VerifyCode: undefined;
    VerifyForgotPassCode: undefined;
    HomeScreen: undefined;
};
interface GetUserDataType {
    token: string | null; // Adjust based on your actual response structure
}

const Stack = createNativeStackNavigator<RootStackParamList>();

const AuthStack = () => (
    <Stack.Navigator initialRouteName="Signin" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Signin" component={Signin} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword}
            options={{
                title: '',
                headerBackTitle: 'Back',
                headerShown: true,
                headerShadowVisible: false,
            }}
        />
        <Stack.Screen name="ChangePassword" component={ChangePassword}
            options={{
                title: '', // Set a title for the screen
                headerBackTitle: 'Back', // Set a custom back button label
                headerShown: true, // Show the header
                headerShadowVisible: false,
            }}
        />
        <Stack.Screen name="VerifyCode" component={VerifyCode}
            options={{
                title: '', // Set a title for the screen
                headerBackTitle: 'Back', // Set a custom back button label
                headerShown: true, // Show the header
                headerShadowVisible: false,
            }}
        />
        <Stack.Screen name="VerifyForgotPassCode" component={VerifyForgotPassCode}
            options={{
                title: '', // Set a title for the screen
                headerBackTitle: 'Back', // Set a custom back button label
                headerShown: true, // Show the header
                headerShadowVisible: false,
            }}
        />
    </Stack.Navigator>
);
const OnBoardingStack = () => (
    <Stack.Navigator initialRouteName="CompleteProfile" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SelectInterests" component={SelectInterests}
            options={{
                title: '', // Set a title for the screen
                headerBackTitle: 'Back', // Set a custom back button label
                headerShown: true, // Show the header
                headerShadowVisible: false,
            }}
        />
        <Stack.Screen name="CompleteProfile" component={CompleteProfile} />
    </Stack.Navigator>
);
const MainStack = () => (
    <Stack.Navigator initialRouteName="HomeScreen" screenOptions={{ headerShown: false }}>

        <Stack.Screen name="HomeScreen" component={HomeScreen} />
    </Stack.Navigator>
);

const ProtectedRoute: React.FC = () => {
    const [getLoggedInUserData, { isLoading }] = useGetLoggedInUserDataMutation();
    const dispatch = useDispatch();
    const [isContentLoading, setIsContentLoading] = useState<boolean>(true);
    const [token, setToken] = useState<string | null>(null);
    const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean | null>(false);
    const userData = useSelector((state: any) => state.auth)
    console.log("userData=>", userData);

    useEffect(() => {
        const fetchToken = async () => {
            try {
                const storedToken = await AsyncStorage.getItem('token');
                if (storedToken) {
                    const tokenObj = { token: storedToken };
                    const getUserDataResponse = await getLoggedInUserData(tokenObj).unwrap();
                    console.log("getUserDataResponse", getUserDataResponse);
                    let userData = {
                        token: storedToken,
                        data: getUserDataResponse,
                    }
                    dispatch(setAuthData(userData));
                }
                setToken(storedToken);
            } catch (error) {
                console.error('Failed to fetch the token from AsyncStorage:', error);
            } finally {
                setIsContentLoading(false);
            }
        };

        fetchToken();
    }, []);

    useEffect(() => {
        setHasCompletedOnboarding(userData?.user?.Interests?.length > 0)
    }, [userData])

    if (isContentLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#FF4D67" />
            </View>
        );
    }
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={token ? (hasCompletedOnboarding ? 'MainStack' : 'OnBoardingStack') : 'AuthStack'} screenOptions={{ headerShown: false }}>
                <Stack.Screen name="AuthStack" component={AuthStack} />
                <Stack.Screen name="OnBoardingStack" component={OnBoardingStack} />
                <Stack.Screen name="MainStack" component={MainStack} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default ProtectedRoute;
