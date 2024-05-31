import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Explore from "@social/screens/Explore/explore.screen";

const ExploreStackNavigator = createNativeStackNavigator<any>();

const ExploreStack = () => {
    return (
        <ExploreStackNavigator.Navigator screenOptions={{headerShown: false}}>
            <ExploreStackNavigator.Screen
                name={"Explore"}
                component={Explore}
            />
        </ExploreStackNavigator.Navigator>
    );
};

export default ExploreStack;
