import {createNativeStackNavigator} from "@react-navigation/native-stack";
import CompleteProfile from "@social/screens/OnBoardingScreens/CompleteProfile";
import SelectInterests from "@social/screens/OnBoardingScreens/SelectInterests";

const Stack = createNativeStackNavigator<any>();

const OnBoardingStack = () => (
    <Stack.Navigator
    initialRouteName="CompleteProfile"
           screenOptions={{
            headerShown: false,
            contentStyle: { paddingHorizontal: 0,backgroundColor:"white" },
        }}>
        <Stack.Screen
            name="SelectInterests"
            component={SelectInterests}
            options={{
                title: "", // Set a title for the screen
                headerBackTitle: "Back", // Set a custom back button label
                headerShown: false, // Show the header
                headerShadowVisible: false,
            }}
        />
        <Stack.Screen name="CompleteProfile" component={CompleteProfile} />
    </Stack.Navigator>
);

export default OnBoardingStack;
