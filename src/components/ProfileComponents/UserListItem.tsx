import { StyleSheet, View, TouchableOpacity } from 'react-native';
import CustomText from '../Text/CustomText';
import { typography } from '@social/utils/typography';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';

const UserListItem = ({ item, buttonType, buttonText, onPress }) => {
    const navigation = useNavigation()
    const loggedInProfileData = useSelector((state: any) => state.auth)

    const handleProfileNavigation = (userId) => {
        console.log("userId", userId);

        const isLoggedInUser = userId === loggedInProfileData?.user?._id;
        (navigation as any).push("Profile", { isLoggedInUser, userId })
    }
    return (
        <View style={styles.userListItemContainer} key={item?._id || item?.userId}>
            <View style={styles.userInfo}>
                <FastImage
                    style={styles.profileImg}
                    source={{ uri: item.ProfilePicture || item?.profileImage || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png" }}
                />
                <TouchableOpacity onPress={() => handleProfileNavigation(item?._id || item?.userId)} style={styles.nameWrapper}>
                    <CustomText style={styles.username}>{item.username || "Username N/A"}</CustomText>
                    <CustomText style={styles.name}>{item.Name || "Name N/A"}</CustomText>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={[styles.buttonClass, buttonType === "primary" ? styles.primaryButton : styles.secondaryButton]} onPress={onPress}>
                <CustomText style={[styles.btnText, buttonType === "primary" ? styles.primaryButtonText : styles.secondaryButtonText]}>{buttonText}</CustomText>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    userListItemContainer: {
        paddingVertical: 11,
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#e0e0e0",
    },
    userInfo: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 12.85,
    },
    profileImg: {
        height: 40,
        width: 40,
        borderRadius: 20,
        borderWidth: .2,
        borderColor: "#00000"
    },
    nameWrapper: {
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: 3,
        width: 140,
    },
    username: {
        fontFamily: typography.sfSemiBold,
        fontSize: 13,
        color: "#242424",
    },
    name: {
        fontFamily: typography.sfRegular,
        fontSize: 11,
        color: "#797979",
    },
    btnText: {
        fontFamily: typography.sfSemiBold,
        fontSize: 14,
    },
    buttonClass: {
        height: 28,
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 100,
        paddingHorizontal: 16,
    },
    primaryButton: {
        backgroundColor: "#FF4D67",
    },
    secondaryButton: {
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: "#797979",
    },
    primaryButtonText: {
        color: "#fff",
    },
    secondaryButtonText: {
        color: "#797979",
    },
});

export default UserListItem;
