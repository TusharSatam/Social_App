import {createNativeStackNavigator} from "@react-navigation/native-stack";
import CreatePost from "@social/screens/CreatePost/create-post.screen";

const PostCreationNavigator = createNativeStackNavigator<any>();

const PostCreationStack = () => {
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
