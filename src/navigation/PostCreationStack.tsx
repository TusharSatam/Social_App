import {
    getFocusedRouteNameFromRoute,
    useFocusEffect,
    useNavigation,
} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import CreatePost from "@social/screens/CreatePost/create-post.screen";
import {useCallback, useEffect} from "react";

const PostCreationNavigator = createNativeStackNavigator<any>();

const PostCreationStack = props => {
    const navigation = useNavigation();

    return (
        <PostCreationNavigator.Navigator screenOptions={{headerShown: false}}>
            <PostCreationNavigator.Screen
                name={"CreatePost"}
                component={CreatePost}
            />
        </PostCreationNavigator.Navigator>
    );
};

export default PostCreationStack;
