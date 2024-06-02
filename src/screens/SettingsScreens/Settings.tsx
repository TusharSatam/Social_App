import { View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import CustomText from '@social/components/Text/CustomText'; // Assuming you have this component
import PasswordManager from '@social/components/SvgIcons/SettingScreenIcons/PasswordManager';
import BookMarkIcon from '@social/components/SvgIcons/SettingScreenIcons/BookMarkIcon';
import UserIcon from '@social/components/SvgIcons/SettingScreenIcons/UserIcon';
import HelpIcon from '@social/components/SvgIcons/SettingScreenIcons/HelpIcon';
import PrivactPolicy from '@social/components/SvgIcons/SettingScreenIcons/PrivacyPolicy';
import LogoutIcon from '@social/components/SvgIcons/SettingScreenIcons/LogoutIcon';
import BackIcon from '@social/components/SvgIcons/NavigationHeaderIcons/BackIcon';
import ForwordIcon from '@social/components/SvgIcons/SettingScreenIcons/ForwardIcon';
import ScreenHeader from '@social/components/ScreenHeader/ScreenHeader';

const Settings = ({ navigation }) => {
    const settingsOptions = [
        { title: 'Manage Account', icon: UserIcon, path: 'ManageAccount' },
        { title: 'Saved', icon: BookMarkIcon, path: "Saved" },
        { title: 'Password Manager', icon: PasswordManager, path: "PasswordManager" },
        { title: 'Help Center', icon: HelpIcon, path: "HelpCenter" },
        { title: 'Privacy Policy', icon: PrivactPolicy, path: "PrivacyPolicy" },
        { title: 'Logout', icon: LogoutIcon, path: "Logout" },
    ];

    return (
        <View style={styles.container}>
            <ScreenHeader headerName={"Settings"} navigation={navigation} />
            <ScrollView>
                {settingsOptions.map((Option, index) => (
                    <TouchableOpacity key={index} style={styles.optionContainer} onPress={() => navigation.navigate(Option?.path)}>
                        {Option?.icon && <Option.icon />}
                        <View style={styles.textContainer}>
                            <CustomText style={styles.optionText}>{Option.title}</CustomText>
                        </View>
                        <ForwordIcon />
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        // borderBottomWidth: 1,
        // borderBottomColor: '#E5E5E5',
        justifyContent: 'center',
        position: 'relative'
    },
    backArrow: {
        position: 'absolute',
        left: 0,
    },
    headerText: {
        fontSize: 18,
        fontWeight: 600,
    },
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F1F1F1',
    },
    textContainer: {
        flex: 1,
        marginLeft: 16,
        fontSize: 16,
        fontWeight: 500,
        color: '#242424'
    },
    optionText: {
        fontSize: 16,
    },
});

export default Settings;
