import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import CustomText from '../Text/CustomText'
import { useSelector } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';

const ProfilePostsTab = () => {
    const profileData = useSelector((state: any) => state.auth?.user);
    return (
        <ScrollView>
            <View style={styles.postContainer}>
                <Image source={{ uri: profileData?.ProfilePicture }} style={styles.profileImage} />
                <Image source={{ uri: profileData?.ProfilePicture }} style={styles.profileImage} />
                <Image source={{ uri: profileData?.ProfilePicture }} style={styles.profileImage} />
                <Image source={{ uri: profileData?.ProfilePicture }} style={styles.profileImage} />
                <Image source={{ uri: profileData?.ProfilePicture }} style={styles.profileImage} />
                <Image source={{ uri: profileData?.ProfilePicture }} style={styles.profileImage} />
                <Image source={{ uri: profileData?.ProfilePicture }} style={styles.profileImage} />
                <Image source={{ uri: profileData?.ProfilePicture }} style={styles.profileImage} />
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    postContainer: {
        width: "100%",
        backgroundColor: "#F6F6F6",
        flexDirection: "row",
        flexWrap: "wrap",
        gap:5,
        paddingVertical: 11,
        paddingHorizontal: 16,
    },
    profileImage: {
        height: 106,
        aspectRatio: 1, // To maintain aspect ratio (1:1 square images)
        borderRadius: 5,
    },
})
export default ProfilePostsTab