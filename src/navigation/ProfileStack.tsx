import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PrivactPolicy from "@social/components/SvgIcons/SettingScreenIcons/PrivacyPolicy";
import Profile from "@social/screens/Profile/profile.screen";
import HelpCenter from "@social/screens/SettingsScreens/HelpCenter";
import Logout from "@social/screens/SettingsScreens/Logout";
import ManageAccount from "@social/screens/SettingsScreens/ManageAccount";
import PasswordManager from "@social/screens/SettingsScreens/PasswordManager";
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
                component={PrivactPolicy}
            />
            <ProfileStackNavigator.Screen
                name={"Logout"}
                component={Logout}
            />
        </ProfileStackNavigator.Navigator>
    );
};

export default ProfileStack;
