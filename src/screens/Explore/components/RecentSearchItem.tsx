import LocationSearchIcon from '@social/components/SvgIcons/ExploreScreenIcons/LocationSearchIcon'
import CustomText from '@social/components/Text/CustomText'
import { typography } from '@social/utils/typography'
import { StyleSheet, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { TouchableOpacity } from 'react-native-gesture-handler'

const RecentSearchItem = ({ item, handleProfileNavigation }) => {

    return (
        <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => handleProfileNavigation(item)}
        >
            {
                item.itemType === "userAccount" ?
                    <FastImage source={{ uri: item?.profileImage ? item?.profileImage : "https://images.freeimages.com/images/large-previews/6b2/paris-1217537.jpg?fmt=webp&w=500" }} style={styles.itemImage} />
                    :
                    <View style={styles.locationIcon}>
                        <LocationSearchIcon />
                    </View>
            }
            {
                item.itemType === "userAccount" ?
                    <View style={styles.userAccount}>
                        <CustomText className="truncate" style={styles.primaryText}>{item?.username ? item?.username : "username N/A"}</CustomText>
                        <CustomText className="truncate" style={styles.SecondaryText}>{item?.name ? item?.name : "name N/A"}</CustomText>
                        {item.description && <CustomText className="truncate" style={styles.SecondaryText}>{item.description}</CustomText>
                        }
                    </View>
                    : <View>
                        <CustomText className="truncate" style={styles.primaryText}>{item?.location ? item?.location : "location N/A"}</CustomText>
                        <CustomText className="truncate" style={styles.SecondaryText}>{item?.totalCount ? `${item?.totalCount} posts` : "0 posts"}</CustomText>
                    </View>
            }
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
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

export default RecentSearchItem