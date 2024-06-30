import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PostDetails from "@social/screens/PostDetails/PostDetails.screen";
import Followers from "@social/screens/Profile/FollowersScreens/Followers";
import MyFollowers from "@social/screens/Profile/FollowersScreens/MyFollowers";
import Following from "@social/screens/Profile/FollowingScreens/Following";
import MyFollowing from "@social/screens/Profile/FollowingScreens/MyFollowing";
import PostDetailsScreen from "@social/screens/Profile/PostDetailsScreen/PostDetailsScreen";
import MySavedPosts from "@social/screens/Profile/SavedScreens/MySavedPosts";
import MySavedShorts from "@social/screens/Profile/SavedScreens/MySavedShorts";
import ShortDetailsScreen from "@social/screens/Profile/ShortDetailsScreen/ShortDetailsScreen";
import Profile from "@social/screens/Profile/profile.screen";
import HelpCenter from "@social/screens/SettingsScreens/HelpCenter";
import Logout from "@social/screens/SettingsScreens/Logout";
import ManageAccount from "@social/screens/SettingsScreens/ManageAccount";
import PasswordManager from "@social/screens/SettingsScreens/PasswordManager";
import PrivacyPolicy from "@social/screens/SettingsScreens/PrivacyPolicy";
import Saved from "@social/screens/SettingsScreens/Saved";
import Settings from "@social/screens/SettingsScreens/Settings";

const ProfileStackNavigator = createNativeStackNavigator<any>();

const ProfileStack = () => {
    return (
        <ProfileStackNavigator.Navigator screenOptions={{ headerShown: false }} initialRouteName="Profile" >
            <ProfileStackNavigator.Screen
                name={"Profile"}
                component={Profile}
            />
            <ProfileStackNavigator.Screen
                name={"MySavedPosts"}
                component={MySavedPosts}
            />
            <ProfileStackNavigator.Screen
                name={"ProfilePostDetails"}
                component={PostDetails}
            />
            <ProfileStackNavigator.Screen
                name={"ProfileShortDetails"}
                component={ShortDetailsScreen}
            />
            <ProfileStackNavigator.Screen
                name={"MySavedShorts"}
                component={MySavedShorts}
            />
            <ProfileStackNavigator.Screen
                name={"MyFollowing"}
                component={MyFollowing}
            />
            <ProfileStackNavigator.Screen
                name={"MyFollowers"}
                component={MyFollowers}
            />
            <ProfileStackNavigator.Screen
                name={"Followers"}
                component={Followers}
            />
            <ProfileStackNavigator.Screen
                name={"Following"}
                component={Following}
            />
            <ProfileStackNavigator.Screen
                name={"Settings"}
                component={Settings}
            />
            <ProfileStackNavigator.Screen
                name={"ManageAccount"}
                component={ManageAccount}
            />
            <ProfileStackNavigator.Screen
                name={"Saved"}
                component={Saved}
            />
            <ProfileStackNavigator.Screen
                name={"PasswordManager"}
                component={PasswordManager}
            />
            <ProfileStackNavigator.Screen
                name={"HelpCenter"}
                component={HelpCenter}
            />
            <ProfileStackNavigator.Screen
                name={"PrivacyPolicy"}
                component={PrivacyPolicy}
            />
            <ProfileStackNavigator.Screen
                name={"Logout"}
                component={Logout}
            />
        </ProfileStackNavigator.Navigator>
    );
};

export default ProfileStack;
