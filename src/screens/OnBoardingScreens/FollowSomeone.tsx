import { WINDOW_HEIGHT } from '@gorhom/bottom-sheet'
import { useNavigation } from '@react-navigation/native'
import AuthHeader from '@social/components/AuthComponents/AuthHeader'
import PrimaryBtn from '@social/components/Buttons/PrimaryBtn'
import UserListItem from '@social/components/ProfileComponents/UserListItem'
import SearhExploreIcon from '@social/components/SvgIcons/ExploreScreenIcons/SearchExploreIcon'
import BackIcon from '@social/components/SvgIcons/NavigationHeaderIcons/BackIcon'
import CustomText from '@social/components/Text/CustomText'
import { WINDOW_WIDTH } from '@social/constants/screenSize'
import { useFollowUserMutation, useGetSearchUsersQuery, useGetTopTenUsersQuery, useUnfollowUserMutation } from '@social/redux/services/auth/authApi'
import { colors } from '@social/utils/colors'
import { typography } from '@social/utils/typography'
import { useEffect, useState } from 'react'
import { ActivityIndicator, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'

const FollowSomeone = () => {
    const loggedInProfileData = useSelector((state: any) => state.auth)
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [users, setUsers] = useState(null);

    const navigation = useNavigation()
    const { data: searchUsersData, isLoading: isSearchingUsers, error, refetch: refetchSearchUsers, isFetching } = useGetSearchUsersQuery({ searchText: searchQuery, loggedInUserId: loggedInProfileData?.user?._id }, { skip: searchQuery?.length === 0 });
    const { data: topUsersData, refetch: refetchTopUsers } = useGetTopTenUsersQuery({ userId: loggedInProfileData?.user?._id }, { skip: searchQuery?.length > 0 });
    const [unfollowUser, { isLoading: isUnFollowingLoading }] = useUnfollowUserMutation();
    const [followUser, { isLoading: isFollowingLoading }] = useFollowUserMutation();
    const handleFollowUnFollow = async (id) => {
        console.log(id);

        const user = users.find(user => (user?._id || user.userId) === id);
        console.log("that user",user);
        
        if (user && user.isFollowedByMe) {

            setUsers(prevData =>
                prevData.map(user =>
                    (user?._id || user.userId) === id? { ...user, isFollowedByMe: !user.isFollowedByMe } : user
                )
            );
            try {
                await unfollowUser({ myUserId: loggedInProfileData?.user?._id, myFollowingUserId: id }).unwrap();
            } catch (error) {
                console.error("Failed to unfollow user: ", error);
            }
        }
        else {
            setUsers(prevData =>
                prevData.map(user =>
                    (user?._id || user.userId) === id ? { ...user, isFollowedByMe: !user.isFollowedByMe } : user
                )
            );
            try {
                await followUser({ myUserId: loggedInProfileData?.user?._id, followUserId: id }).unwrap();
            } catch (error) {
                console.error("Failed to follow user: ", error);
            }
        }
    };


    const handleDone = () => {
        (navigation as any).navigate("MainStack")
    }

    const renderItem = ({ item }) => (
        <UserListItem
            item={item}
            buttonType={item.isFollowedByMe ? "secondary" : "primary"}
            buttonText={item.isFollowedByMe ? "Following" : "Follow"}
            onPress={() => handleFollowUnFollow(item?._id ? item?._id : item?.userId)}
            key={item?.userId}
        />
    );

    useEffect(() => {
        if (searchQuery?.length > 0) {
            refetchSearchUsers();
        } else {
            refetchTopUsers();
        }
    }, [searchQuery]);

    useEffect(() => {
        if (searchQuery?.length > 0 && searchUsersData) {
            console.log("search RESULTS:",searchUsersData?.data);
            
            setUsers(searchUsersData?.data);
        } else if (topUsersData) {
            console.log("top RESULTS:",searchUsersData?.data);

            setUsers(topUsersData?.data);
        }
    }, [searchUsersData, topUsersData]);
useEffect(() => {
 console.log("users :: ",users);
 
}, [users])


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <BackIcon />
                </TouchableOpacity>
                <CustomText style={styles.headerText}>Follow someone</CustomText>
            </View>
            <CustomText style={styles.headerDescription}>Follow someone you might know or you can skip this step</CustomText>
            <View style={styles.searchUsers}>
                <SearhExploreIcon />
                <TextInput
                    placeholder='Search'
                    placeholderTextColor={colors.lightText}
                    style={styles.inputText}
                    value={searchQuery}
                    onChangeText={e => setSearchQuery(e)}
                />
            </View>
            {isFetching ? (
                <ActivityIndicator
                    size="large"
                    color="#FF4D67"
                />
            ) : (
                <FlatList
                    data={users}
                    renderItem={renderItem}
                    numColumns={1}
                    contentContainerStyle={styles.listContainer}
                />
            )}
            <View style={{ position: "absolute", bottom: 16, width: "100%" }}>
                <PrimaryBtn btnText='Done' onPress={handleDone} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        position: "relative",
        height: WINDOW_HEIGHT,
        paddingBottom: 16,
    },
    header: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        marginTop: 39.41,
        marginBottom: 29.37,
        width: "100%",
    },
    headerText: {
        fontFamily: typography.sfSemiBold,
        fontSize: 22,
        letterSpacing: 0,
        lineHeight: 28,
        fontWeight: "600",
    },
    backButton: {
        position: "absolute",
        left: 0,
    },
    headerDescription: {
        color: "#797979",
        fontFamily: typography.sfRegular,
        fontSize: 13,
        fontStyle: "normal",
        letterSpacing: -0.07
    },
    searchUsers: {
        backgroundColor: "#F6F6F6",
        paddingHorizontal: 11,
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        width: "100%",
        gap: 9,
        borderRadius: 10,
        marginTop: 8,
        marginBottom: 16,
    },
    inputText: {
        fontFamily: typography.sfRegular,
        color: colors['24Color'],
    },
    listContainer: {
        paddingBottom: 100,
        width: WINDOW_WIDTH - 32,
    }
})

export default FollowSomeone
