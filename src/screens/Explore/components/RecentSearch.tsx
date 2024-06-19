import CustomText from '@social/components/Text/CustomText'
import { typography } from '@social/utils/typography'
import { FlatList, StyleSheet, View } from 'react-native'
import RecentSearchItem from './RecentSearchItem'
import { CommonActions, useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'

const RecentSearch = () => {
    const dummyRecentSearchData = [
        { id: "rs1", type: "userAccount", source: { uri: "https://images.freeimages.com/images/large-previews/6b2/paris-1217537.jpg?fmt=webp&w=500" }, username: "Kelly_Scott", name: "Scott Kelly", description: "Followed by Irjvr and 62M others" }, { id: "rs2", type: "location", locationName: "Mumbai", totalPosts: "19.3M" }
    ]
    const navigation = useNavigation()
    const loggedInProfileData = useSelector((state: any) => state.auth)

    const handleProfileNavigation = (userId, itemType) => {
        if (itemType === "userAccount") {
            const isLoggedInUser = userId === loggedInProfileData?.user?._id;
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [
                        {
                            name: 'ProfileStack',
                            state: {
                                routes: [
                                    {
                                        name: 'Profile',
                                        params: isLoggedInUser 
                                    }
                                ]
                            }
                        }
                    ]
                })
            );
            // (navigation as any).navigate("Profile",isLoggedInUser)
        }
    }
    return (
        <View style={styles.recentSearchContainer}>
            <CustomText style={styles.recentSearchText}>Recent Searches</CustomText>
            <View style={styles.searchResults}>
                <FlatList renderItem={({ item }) => (
                    <RecentSearchItem
                        item={item}
                        handleProfileNavigation={handleProfileNavigation}
                    />
                )} data={dummyRecentSearchData} />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    recentSearchContainer: {
        width: "100%",
        display: "flex",
        flex: 1,
        backgroundColor: "white",
    },
    recentSearchText: {
        fontFamily: typography.sfSemiBold,
        fontSize: 16,
        marginTop: 20,
        marginBottom: 16,
    },
    searchResults: {
        display: "flex",
        // gap: 14,
        width: "100%",
    }
})
export default RecentSearch