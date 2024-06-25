import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Explore from "@social/screens/Explore/explore.screen";
import PostDetailsScreen from "@social/screens/Profile/PostDetailsScreen/PostDetailsScreen";
import ShortsDetailsScreen from "@social/screens/Profile/ShortDetailsScreen/ShortDetailsScreen";

const ExploreStackNavigator = createNativeStackNavigator<any>();

const ExploreStack = () => {
    return (
        <ExploreStackNavigator.Navigator screenOptions={{headerShown: false}}>
            <ExploreStackNavigator.Screen
                name={"Explore"}
                component={Explore}
            />
               <ExploreStackNavigator.Screen
                name={"ExplorePostDetailScreen"}
                component={PostDetailsScreen}
            />
             <ExploreStackNavigator.Screen
                name={"ExploreShortDetailScreen"}
                component={ShortsDetailsScreen}
            />
        </ExploreStackNavigator.Navigator>
    );
};

export default ExploreStack;
