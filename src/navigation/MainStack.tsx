import {createNativeStackNavigator} from "@react-navigation/native-stack";

import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import ExploreStack from "./ExploreStack";
import PostCreationStack from "./PostCreationStack";
import ShortStack from "./ShortStack";
import ProfileStack from "./ProfileStack";
import CustomTabBar from "./CustomTabBar";
import HomeScreen from "@social/screens/HomeScreen/home.screen";
import HomeStack from "./HomeStack";

const MainStackBottomTab = createBottomTabNavigator();

const MainStack = () => (
    <MainStackBottomTab.Navigator
        tabBar={props => <CustomTabBar {...props} />}
        screenOptions={{
            headerShown: false,
        }}>
        <MainStackBottomTab.Screen
            options={{unmountOnBlur: true}}
            name="HomeStack"
            component={HomeStack}
        />
        <MainStackBottomTab.Screen
            options={{unmountOnBlur: true}}
            name="ExploreStack"
            component={ExploreStack}
        />
        <MainStackBottomTab.Screen
            options={{unmountOnBlur: true}}
            name="PostCreationStack"
            component={PostCreationStack}
        />
        <MainStackBottomTab.Screen name="ShortStack" component={ShortStack} />
        <MainStackBottomTab.Screen
            options={{unmountOnBlur: true}}
            name="ProfileStack"
            component={ProfileStack}
        />
    </MainStackBottomTab.Navigator>
);

export default MainStack;
