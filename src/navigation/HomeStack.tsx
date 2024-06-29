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
import dynamicLinks, { FirebaseDynamicLinksTypes } from "@react-native-firebase/dynamic-links";

const HomeStackNavigator = createNativeStackNavigator<any>();

const HomeStack = props => {
    const navigation = useNavigation()
     //DeepLinking
     const handleLink = async (link: FirebaseDynamicLinksTypes.DynamicLink | null) => {
        if (link) {
            let postId = link.url.split('=').pop()
            console.log('link:', postId);
            (navigation as any).navigate('PostDetails', { postId })
        }
    }

    useEffect(() => {
        const unsubscribe = dynamicLinks().onLink(handleLink)
        return () => unsubscribe
    }, [])
    useEffect(() => {
        const unsubscribe = dynamicLinks().getInitialLink().then((link) => {
            handleLink(link)
        })
        return () => unsubscribe
    }, [])
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
