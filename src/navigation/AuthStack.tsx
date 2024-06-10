import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChangePassword from "@social/screens/AuthScreens/ChangePassword";
import ForgotPassword from "@social/screens/AuthScreens/ForgotPassword";
import Signin from "@social/screens/AuthScreens/Signin";
import Signup from "@social/screens/AuthScreens/Signup";
import VerifyCode from "@social/screens/AuthScreens/VerifyCode";
import VerifyForgotPassCode from "@social/screens/AuthScreens/VerifyForgotPassCode";

const Stack = createNativeStackNavigator<any>();

const AuthStack = () => (
    <Stack.Navigator
        initialRouteName="Signin"
        screenOptions={{
            headerShown: false,
            contentStyle: { paddingHorizontal: 25,backgroundColor:"white" },
        }}>
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Signin" component={Signin} />
        <Stack.Screen
            name="ForgotPassword"
            component={ForgotPassword}
            options={{
                title: "",
                headerBackTitle: "Back",
                headerShown: true,
                headerShadowVisible: false,
            }}
        />
        <Stack.Screen
            name="ChangePassword"
            component={ChangePassword}
            options={{
                title: "", // Set a title for the screen
                headerBackTitle: "Back", // Set a custom back button label
                headerShown: true, // Show the header
                headerShadowVisible: false,
            }}
        />
        <Stack.Screen
            name="VerifyCode"
            component={VerifyCode}
            options={{
                title: "", // Set a title for the screen
                headerBackTitle: "Back", // Set a custom back button label
                headerShown: false, // Show the header
                headerShadowVisible: false,
            }}
        />
        <Stack.Screen
            name="VerifyForgotPassCode"
            component={VerifyForgotPassCode}
            options={{
                title: "", // Set a title for the screen
                headerBackTitle: "Back", // Set a custom back button label
                headerShown: true, // Show the header
                headerShadowVisible: false,
            }}
        />
    </Stack.Navigator>
);

export default AuthStack;
