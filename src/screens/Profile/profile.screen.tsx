import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import CustomText from '@social/components/Text/CustomText';
import { useDispatch, useSelector } from 'react-redux';
import SecondaryBtn from '@social/components/Buttons/SecondaryBtn';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';
import PrimaryBtn from '@social/components/Buttons/PrimaryBtn';
import { typography } from '@social/utils/typography';
import SettingIcon from '@social/components/SvgIcons/ProfileScreenIcons/SettingIcon';
import ThreeDots from '@social/components/SvgIcons/ProfileScreenIcons/ThreeDots';
import PostTabIcon from '@social/components/SvgIcons/ProfileScreenIcons/PostTabIcon';
import ReelsTabIcon from '@social/components/SvgIcons/ProfileScreenIcons/ReelsTabIcon';
import SavedTabIcon from '@social/components/SvgIcons/ProfileScreenIcons/SavedTabIcon';
import ProfilePostsTab from '@social/components/ProfileComponents/ProfilePostsTab';
import ProfileReelsTab from '@social/components/ProfileComponents/ProfileShortsTab';
import ProfileSavedTab from '@social/components/ProfileComponents/ProfileSavedTab';
import LocationPin from '@social/components/SvgIcons/ProfileScreenIcons/LocationPin';
import DefaultProfileIcon from '@social/components/SvgIcons/ProfileScreenIcons/DefaultProfileIcon';
import FastImage from 'react-native-fast-image';
import { useGetProfileActivityStatsQuery, useGetUserDetailsByIdMutation } from '@social/redux/services/auth/authApi';
import FetchingLoader from '@social/components/Loader/FetchingLoader';
const Profile = ({ route }) => {
    const paramData = route.params;

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const loggedInProfileData = useSelector((state: any) => state.auth);
    const loggedInProfileActivityStats = useSelector((state: any) => state.userProfileActivity);

    const [isLoggedInUser, setIsLoggedInUser] = useState<boolean | null>(paramData?.isLoggedInUser === false ? paramData?.isLoggedInUser : true);
    const [isContentLoading, setisContentLoading] = useState<boolean>(true);
    const [isFollow, setIsFollow] = useState<boolean>(true);
    const [profileData, setProfileData] = useState<any | null>(null);
    const [secondPersonUserId, setSecondPersonUserId] = useState<string | null>(null)
    const [activeTab, setActiveTab] = useState<'posts' | 'reels' | 'saved'>('posts');

    const { data: profileActivityStats, isLoading, refetch } = useGetProfileActivityStatsQuery(isLoggedInUser ? loggedInProfileData?.user?._id : secondPersonUserId);
    const [getUserDetailsById, { isLoading: isUserDetailsLoading }] = useGetUserDetailsByIdMutation();

    const handleNavigation = (screenName: string, userId = null) => {
        if (screenName === "MessageScreen") {
            Dialog.show({
                type: ALERT_TYPE.INFO,
                title: 'Info',
                textBody: 'Message feature coming soon.',
                button: 'close',
            });
        } else if (userId) {
            (navigation as any).push(screenName, userId);
        }
        else {
            (navigation as any).navigate(screenName);
        }
    }

    const toggleFollow = () => {
        setIsFollow(!isFollow);
    }


    const fetchSecondPersonDetails = async () => {
        try {
            const response = await getUserDetailsById({ userId: secondPersonUserId }).unwrap();
            console.log("secondPersonDetails--> ", response?.data);
            setProfileData(response?.data);
            setisContentLoading(false);
        } catch (error) {
            console.error("Failed to fetch user details: ", error);
            setisContentLoading(false);
        }
    }



    useEffect(() => {
        if (loggedInProfileData && isLoggedInUser) {
            setisContentLoading(false);
            setProfileData(loggedInProfileData?.user);

        } else if (loggedInProfileData && !isLoggedInUser && secondPersonUserId) {
            // Fetch the user profile data if needed
            fetchSecondPersonDetails()
        }
    }, [loggedInProfileData, isLoggedInUser, secondPersonUserId])

    useEffect(() => {
        if (!isLoggedInUser) {
            setSecondPersonUserId(paramData?.userId)
        }
    }, [paramData, isLoggedInUser])

    useFocusEffect(
        useCallback(() => {
            refetch();
        }, [])
    );
    // Function to render content based on active tab
    const renderContent = () => {
        switch (activeTab) {
            case 'posts':
                return <ProfilePostsTab userId={isLoggedInUser ? loggedInProfileData?.user?._id : secondPersonUserId} />;
            case 'reels':
                return <ProfileReelsTab />;
            case 'saved':
                return <ProfileSavedTab />;
            default:
                return null;
        }
    }

    if (isUserDetailsLoading) {
        return <FetchingLoader />
    }
    return (
        <View style={styles.container}>

            <View style={{ paddingHorizontal: 16, paddingTop: 26, backgroundColor: "white", minWidth: "100%" }}>

                <View style={styles.moreOptionBtn}>
                    {isLoggedInUser ?
                        <TouchableOpacity onPress={() => handleNavigation("Settings")}>
                            <SettingIcon />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity>
                            <ThreeDots />
                        </TouchableOpacity>
                    }
                </View>
                <View style={styles.userImgName}>
                    <View style={styles.profileImageWrapper}>
                        {profileData?.ProfilePicture !== "" || profileData?.ProfilePicture !== null
                            ?
                            <FastImage source={{ uri: profileData?.ProfilePicture }} style={styles.profileImage} />
                            :
                            <View style={[styles.profileImage]} >
                                <DefaultProfileIcon />
                            </View>
                        }
                    </View>
                    <View style={styles.nameWrap}>
                        <CustomText style={styles.username}>{profileData?.username ? profileData?.username : "username N/A"}</CustomText>
                        <CustomText style={styles.name}>{profileData?.Name ? profileData?.Name : "Name N/A"}</CustomText>
                    </View>
                </View>
                {/* Bio and Location sections */}
                <View style={styles.userLocBio}>
                    <CustomText style={styles.bio}>{profileData?.bio ? profileData?.bio : "bio N/A"}</CustomText>
                    <View style={styles.locationWrapper}>
                        <LocationPin />
                        <CustomText style={styles.location}>{profileData?.location ? profileData?.location : "location N/A"}</CustomText>
                    </View>
                </View>
                {/* Button Container */}
                <View style={styles.buttonContainer}>
                    {isLoggedInUser ? (
                        <SecondaryBtn btnText='Edit Profile' onPress={() => handleNavigation("ManageAccount")} />
                    ) : (
                        <>
                            <SecondaryBtn btnText='Message' onPress={() => handleNavigation("MessageScreen")} btnClass={styles.messageBtn} />
                            {isFollow ?
                                <SecondaryBtn btnText='Following' onPress={toggleFollow} btnClass={styles.FollowingBtn} textColor='#FF4D67' />
                                :
                                <PrimaryBtn btnText='Follow' onPress={toggleFollow} btnClass={"h-[32px] py-0 px-0 w-[100px] !text-[14px]"} btnstyle={styles.followBtnText} />
                            }
                        </>
                    )}
                </View>

                {/* Stats Container */}
                <View style={styles.statsContainer}>
                    <View style={styles.statsItem}>
                        <CustomText style={styles.statsNumber}>{profileActivityStats?.totalPosts ? profileActivityStats?.totalPosts : 0}</CustomText>
                        <CustomText style={styles.statsText}>Posts</CustomText>
                    </View>
                    <TouchableOpacity style={styles.statsItem} className='border-x-[.5px] border-[#F1F1F1]' onPress={() => handleNavigation(isLoggedInUser ? "MyFollowers" : "Followers", isLoggedInUser ? null : paramData?.userId)}>
                        <CustomText style={styles.statsNumber}>{profileActivityStats?.totalFollowers ? profileActivityStats?.totalFollowers : 0}</CustomText>
                        <CustomText style={styles.statsText}>Followers</CustomText>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.statsItem} onPress={() => handleNavigation(isLoggedInUser ? "MyFollowing" : "Following", isLoggedInUser ? null : paramData?.userId)}>
                        <CustomText style={styles.statsNumber}>{profileActivityStats?.totalFollowing ? profileActivityStats?.totalFollowing : 0}</CustomText>
                        <CustomText style={styles.statsText}>Following</CustomText>
                    </TouchableOpacity>
                </View>
                {/* Tab Buttons */}
                <View style={styles.tabContainer}>
                    <TouchableOpacity
                        style={[styles.tabButton, activeTab === 'posts' && styles.activeTab]}
                        onPress={() => setActiveTab('posts')}
                    >
                        <PostTabIcon isActive={activeTab === "posts"} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.tabButton, activeTab === 'reels' && styles.activeTab]}
                        onPress={() => setActiveTab('reels')}
                    >
                        <ReelsTabIcon isActive={activeTab === "reels"} />
                    </TouchableOpacity>
                    {isLoggedInUser && <TouchableOpacity
                        style={[styles.tabButton, activeTab === 'saved' && styles.activeTab]}
                        onPress={() => setActiveTab('saved')}
                    >
                        <SavedTabIcon isActive={activeTab === "saved"} />
                    </TouchableOpacity>}
                </View>
            </View>
            {/* <View className='h-fit'> */}
            {/* Content Based on Tab */}
            {renderContent()}
            {/* </View> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        width: "100%",
        position: "relative",
        // backgroundColor: "white",
        backgroundColor: "#F6F6F6",

    },
    moreOptionBtn: {
        position: "absolute",
        right: 16,
        top: 26,
    },
    userImgName: {
        display: "flex",
        gap: 12,
        justifyContent: "center",
        alignItems: "center"
    },
    userLocBio: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    nameWrap: {
        display: "flex",
        gap: 4,
        justifyContent: "center",
        alignItems: "center"
    },
    FollowingBtn: {
        borderColor: "#FF4D67",
        width: 100,
    },
    messageBtn: {
        width: 100,
    },
    followBtn: {
        height: 32,
        width: 100,
    },
    followBtnText: {
        fontSize: 14,
        fontFamily: typography.sfSemiBold,
    },
    profileImageWrapper: {
        padding: 5,
        borderColor: "#C7C7CC",
        borderWidth: 1.5,
        width: 96,
        height: 96,
        borderRadius: 50,
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center"
    },
    profileImage: {
        backgroundColor: "#F6F6F6",
        height: "100%",
        width: "100%",
        borderRadius: 50,
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center"
    },
    username: {
        fontSize: 17,
        fontWeight: 'bold',
        fontFamily: typography.sfSemiBold,
    },
    name: {
        fontSize: 12,
        color: '#797979',
        fontFamily: typography.sfRegular,
    },
    bio: {
        fontSize: 12,
        textAlign: 'center',
        fontFamily: typography.sfMedium,
        marginTop: 16,
    },
    locationWrapper: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
        gap: 4,
        marginTop: 6,
    },
    location: {
        fontSize: 12,
        color: 'gray',
        fontFamily: typography.sfMedium,
    },
    editButton: {
        backgroundColor: '#000',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    editButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    followButton: {
        backgroundColor: '#FF4081',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    followButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: 27,
    },
    statsItem: {
        flex: 1,
        alignItems: 'center',
        display: "flex",
        justifyContent: "center",
        gap: 6,
    },
    statsNumber: {
        fontSize: 18,
        fontFamily: typography.sfSemiBold,
    },
    statsText: {
        fontSize: 13,
        color: "#262626",
        fontFamily: typography.sfRegular
    },
    buttonContainer: {
        display: "flex",
        flexDirection: "row",
        gap: 16,
        width: "100%",
        paddingTop: 16,
        paddingBottom: 26,
        justifyContent: "center",
        alignContent: "center"
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        height: 37,
    },
    tabButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        flex: 1,
        borderBottomWidth: 3,
        borderBottomColor: 'transparent',
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        paddingBottom: 13,
        textAlign: "center"
    },
    activeTab: {
        borderBottomColor: "black",
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
    },
    tabButtonText: {
        fontSize: 14,
        color: '#333',
        fontWeight: 'bold',
    },
});

export default Profile;
