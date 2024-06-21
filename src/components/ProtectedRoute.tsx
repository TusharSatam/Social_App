import React, {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {View, ActivityIndicator} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {useDispatch, useSelector} from "react-redux";
import {useGetLoggedInUserDataMutation} from "../redux/services/auth/authApi";
import AuthStack from "@social/navigation/AuthStack";
// import AuthStack from "@social/navigation/AuthStack";
import OnBoardingStack from "@social/navigation/OnBoardingStack";
import MainStack from "@social/navigation/MainStack";
import {setAuthData} from "@social/redux/Slice/AuthSlice";
import {navigationRef} from "@social/refs/refs";
import TermsAndConditions from "@social/screens/SettingsScreens/TermsAndConditions";

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
    Settings: undefined;
    ManageAccount: undefined;
    Saved: undefined;
    PasswordManager: undefined;
    HelpCenter: undefined;
    PrivacyPolicy: undefined;
    Logout: undefined;
    TermsConditions: undefined;
};
interface GetUserDataType {
    token: string | null; // Adjust based on your actual response structure
}

const Stack = createNativeStackNavigator<RootStackParamList>();

const ProtectedRoute: React.FC = () => {
    const [getLoggedInUserData, {isLoading}] = useGetLoggedInUserDataMutation();
    const dispatch = useDispatch();
    const [isContentLoading, setIsContentLoading] = useState<boolean>(true);
    const [token, setToken] = useState<string | null>(null);
    const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<
        boolean | null
    >(false);
    const userData = useSelector((state: any) => state.auth);

    useEffect(() => {
        const fetchToken = async () => {
            try {
                const storedToken = await AsyncStorage.getItem("token");
                if (storedToken) {
                    const tokenObj = {token: storedToken};
                    const getUserDataResponse = await getLoggedInUserData(
                        tokenObj,
                    ).unwrap();
                    let userData = {
                        token: storedToken,
                        data: getUserDataResponse?.data,
                    };
                    dispatch(setAuthData(userData));
                }
                setToken(storedToken);
            } catch (error) {
                console.error(
                    "Failed to fetch the token from AsyncStorage:",
                    error,
                );
            } finally {
                setIsContentLoading(false);
            }
        };

        fetchToken();
    }, []);

    useEffect(() => {
        setHasCompletedOnboarding(userData?.user?.Interests?.length > 0);
    }, [userData]);

    if (isContentLoading) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                <ActivityIndicator size="large" color="#FF4D67" />
            </View>
        );
    }
    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator
                initialRouteName={
                    token
                        ? hasCompletedOnboarding
                            ? "MainStack"
                            : "OnBoardingStack"
                        : "AuthStack"
                }
                // initialRouteName="MainStack"
                screenOptions={{headerShown: false}}>
                <Stack.Screen name="AuthStack" component={AuthStack} />
                <Stack.Screen
                    name="OnBoardingStack"
                    component={OnBoardingStack}
                />
                <Stack.Screen name="MainStack" component={MainStack} />
                <Stack.Screen
                    name="TermsConditions"
                    component={TermsAndConditions}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default ProtectedRoute;
