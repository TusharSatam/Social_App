import CustomText from '@social/components/Text/CustomText'
import { typography } from '@social/utils/typography'
import React, { useEffect, useState } from 'react'
import { FlatList, TouchableOpacity } from 'react-native'
import { StyleSheet, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import AccountItem from './AccountItem'
import { CommonActions, useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { useGetAllUsersQuery, useGetSearchUsersQuery } from '@social/redux/services/auth/authApi'
import FetchingLoader from '@social/components/Loader/FetchingLoader'
import AsyncStorage from '@react-native-async-storage/async-storage'

const AccountResults = ({ searchQuery }) => {
    const loggedInProfileData = useSelector((state: any) => state.auth)

    const navigation = useNavigation()
    const dummyAccountsData = [
        { id: "rs1", source: { uri: "https://images.freeimages.com/images/large-previews/6b2/paris-1217537.jpg?fmt=webp&w=500" }, username: "Kelly_Scott", name: "Scott Kelly", description: "Followed by Irjvr and 62M others" },
        { id: "rs2", source: { uri: "https://images.freeimages.com/images/large-previews/6b2/paris-1217537.jpg?fmt=webp&w=500" }, username: "Kelly_Scott", name: "Scott Kelly", description: "Followed by Irjvr and 62M others" }
    ]
    const { data: searchedUsers, isLoading: isSearchingUsers, error, refetch } = useGetSearchUsersQuery({ searchText: searchQuery, loggedInUserId: loggedInProfileData?.user?._id });
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (searchedUsers) {
            setUsers(searchedUsers?.data);
        }
    }, [searchedUsers]);

    useEffect(() => {
        refetch();
    }, [searchQuery]);

    const storeRecentSearch = async (newItem) => {
        try {
            const existingSearches = await AsyncStorage.getItem('RecentSearch');
            const searches = existingSearches ? JSON.parse(existingSearches) : [];

            // Add new item and filter out duplicates
            const updatedSearches = [newItem, ...searches.filter(search => search?.userId !== newItem?.userId)];

            // Ensure only the latest 15 items are stored
            const limitedSearches = updatedSearches.slice(0, 8);

            await AsyncStorage.setItem('RecentSearch', JSON.stringify(limitedSearches));
        } catch (error) {
            console.error('Error storing recent search:', error);
        }
    };

    const handleProfileNavigation = async (user) => {
        const isLoggedInUser = user?.userId === loggedInProfileData?.user?._id;
        await storeRecentSearch({ ...user, itemType: 'userAccount' });
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
                                    params: { isLoggedInUser, userId: user?.userId }
                                }
                            ]
                        }
                    }
                ]
            })
        );
    }
    if (isSearchingUsers) {
        return <FetchingLoader />;
    }

    if (error) {
        return <CustomText>Error loading data</CustomText>;
    }
    return (
        <View style={styles.accountResultsContainer}>
            <FlatList renderItem={({ item }) => (
                <AccountItem
                    item={item}
                    handleProfileNavigation={handleProfileNavigation}
                />
            )} data={users} />
        </View>
    )
}
const styles = StyleSheet.create({
    accountResultsContainer: {
        flex: 1,
        display: 'flex',
        gap: 14,
        width: '100%',
    },

})
export default AccountResults