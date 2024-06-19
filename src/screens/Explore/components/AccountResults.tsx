import CustomText from '@social/components/Text/CustomText'
import { typography } from '@social/utils/typography'
import React from 'react'
import { FlatList, TouchableOpacity } from 'react-native'
import { StyleSheet, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import AccountItem from './AccountItem'
import { CommonActions, useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'

const AccountResults = () => {
    const dummyAccountsData = [
        { id: "rs1", source: { uri: "https://images.freeimages.com/images/large-previews/6b2/paris-1217537.jpg?fmt=webp&w=500" }, username: "Kelly_Scott", name: "Scott Kelly", description: "Followed by Irjvr and 62M others" },
        { id: "rs2", source: { uri: "https://images.freeimages.com/images/large-previews/6b2/paris-1217537.jpg?fmt=webp&w=500" }, username: "Kelly_Scott", name: "Scott Kelly", description: "Followed by Irjvr and 62M others" }
    ]
    const navigation = useNavigation()
    const loggedInProfileData = useSelector((state: any) => state.auth)

    const handleProfileNavigation = (userId) => {
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
    }
    return (
        <View style={styles.accountResultsContainer}>
            <FlatList renderItem={({ item }) => (
                <AccountItem
                    item={item}
                    handleProfileNavigation={handleProfileNavigation}
                />
            )} data={dummyAccountsData} />
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