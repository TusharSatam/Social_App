import {createNativeStackNavigator} from "@react-navigation/native-stack";
import HomeScreen from "@social/screens/HomeScreen/HomeScreen";

const Stack = createNativeStackNavigator<any>();

const MainStack = () => (
    <Stack.Navigator
        initialRouteName="HomeScreen"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
    </Stack.Navigator>
);

export default MainStack;
