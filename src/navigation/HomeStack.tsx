import {
    getFocusedRouteNameFromRoute,
    useFocusEffect,
    useNavigation,
    useRoute,
} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import CreatePost from "@social/screens/CreatePost/create-post.screen";
import Home from "@social/screens/HomeScreen/home.screen";
import Notification from "@social/screens/Notification/notification.screen";
import SharePost from "@social/screens/SharePost/share-post.screen";
import {useCallback, useEffect} from "react";

const HomeStackNavigator = createNativeStackNavigator<any>();

const HomeStack = props => {
    return (
        <HomeStackNavigator.Navigator screenOptions={{headerShown: false}}>
            <HomeStackNavigator.Screen name={"Home"} component={Home} />
            <HomeStackNavigator.Screen
                name={"Notification"}
                component={Notification}
            />
        </HomeStackNavigator.Navigator>
    );
};

export default HomeStack;
