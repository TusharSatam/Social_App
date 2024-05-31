import {createNativeStackNavigator} from "@react-navigation/native-stack";
import HomeScreen from "@social/screens/HomeScreen/HomeScreen";

import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import ExploreStack from "./ExploreStack";
import PostCreationStack from "./PostCreationStack";
import ShortStack from "./ShortStack";
import ProfileStack from "./ProfileStack";
import CustomTabBar from "./CustomTabBar";

const MainStackBottomTab = createBottomTabNavigator();

const MainStack = () => (
    <MainStackBottomTab.Navigator
        tabBar={props => <CustomTabBar {...props} />}
        screenOptions={{headerShown: false}}>
        <MainStackBottomTab.Screen name="HomeScreen" component={HomeScreen} />
        <MainStackBottomTab.Screen
            name="ExploreStack"
            component={ExploreStack}
        />
        <MainStackBottomTab.Screen
            name="PostCreationStack"
            component={PostCreationStack}
        />
        <MainStackBottomTab.Screen name="ShortStack" component={ShortStack} />
        <MainStackBottomTab.Screen
            name="ProfileStack"
            component={ProfileStack}
        />
    </MainStackBottomTab.Navigator>
);

export default MainStack;
