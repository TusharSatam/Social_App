import RecentLocationIcon from '@social/components/SvgIcons/ExploreScreenIcons/RecentlocationIcon'
import CustomText from '@social/components/Text/CustomText'
import { typography } from '@social/utils/typography'
import { TouchableOpacity } from 'react-native'
import { StyleSheet, View } from 'react-native'
import FastImage from 'react-native-fast-image'

const PlaceItem = ({ item }) => {
    return (
        <TouchableOpacity style={styles.itemContainer}>

            <View style={styles.locationIcon}>
                <RecentLocationIcon />
            </View>

            <View>
                <CustomText className="truncate" style={styles.primaryText}>{item?.locationName ? item?.locationName : "locationName N/A"}</CustomText>
                <CustomText className="truncate" style={styles.SecondaryText}>{item?.totalPosts ? item?.totalPosts : "totalPosts N/A"}</CustomText>
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

export default PlaceItem