import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Shorts from "@social/screens/Shorts/shorts.screen";

const ShortStackNavigator = createNativeStackNavigator<any>();

const ShortStack = () => {
    return (
        <ShortStackNavigator.Navigator screenOptions={{headerShown: false}}>
            <ShortStackNavigator.Screen name={"Shorts"} component={Shorts} />
        </ShortStackNavigator.Navigator>
    );
};

export default ShortStack;
