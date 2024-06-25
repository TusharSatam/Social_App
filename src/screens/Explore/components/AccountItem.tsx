import { useNavigation } from '@react-navigation/native'
import CustomText from '@social/components/Text/CustomText'
import { typography } from '@social/utils/typography'
import { TouchableOpacity } from 'react-native'
import { StyleSheet, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { useSelector } from 'react-redux'

const AccountItem = ({ item, handleProfileNavigation }) => {
    console.log("inside", item);

    return (
        <TouchableOpacity style={styles.itemContainer} onPress={() => handleProfileNavigation(item)}>
            <FastImage source={{ uri: item?.profileImage ? item?.profileImage : "https://images.freeimages.com/images/large-previews/6b2/paris-1217537.jpg?fmt=webp&w=500" }} style={styles.itemImage} />

            <View style={styles.userAccount}>
                <CustomText className="truncate" style={styles.primaryText}>{item?.username ? item?.username : "username N/A"}</CustomText>
                <CustomText className="truncate" style={styles.SecondaryText}>{item?.name ? item?.name : "name N/A"}</CustomText>
                {item.description && <CustomText className="truncate" style={styles.SecondaryText}>{item?.followers === "No followers in your list" ? "" : item?.followers}</CustomText>
                }
            </View>

        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    accountResultsContainer: {
        flex: 1,
        display: 'flex',
        gap: 14,
        width: '100%',
    },
    itemContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        gap: 10,
        justifyContent: "flex-start",
        alignItems: "center",
        marginBottom: 17,
    },
    itemImage: {
        height: 56,
        width: 56,
        borderRadius: 200,
    },
    locationIcon: {
        borderWidth: 1,
        borderColor: "#797979",
        height: 55,
        width: 55,
        borderRadius: 200,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    userAccount: {
        display: "flex",
        gap: 2,
    },
    primaryText: {
        fontFamily: typography.sfSemiBold,
        fontSize: 13,
        color: "#242424"
    },
    SecondaryText: {
        fontFamily: typography.sfRegular,
        fontSize: 13,
        color: "#242424",
    },
})

export default AccountItem