import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Profile from "@social/screens/Profile/profile.screen";

const ProfileStackNavigator = createNativeStackNavigator<any>();

const ProfileStack = () => {
    return (
        <ProfileStackNavigator.Navigator screenOptions={{headerShown: false}}>
            <ProfileStackNavigator.Screen
                name={"Profile"}
                component={Profile}
            />
        </ProfileStackNavigator.Navigator>
    );
};

export default ProfileStack;
