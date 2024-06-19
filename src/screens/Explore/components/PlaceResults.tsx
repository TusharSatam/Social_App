import { FlatList } from 'react-native'
import { StyleSheet, View } from 'react-native'
import PlaceItem from './PlaceItem'

const PlaceResults = () => {
    const dummyPlaceData = [
        { id: "plc1", type: "location", locationName: "Mumbai", totalPosts: "19.3M" },
        { id: "plc2", type: "location", locationName: "Delhi", totalPosts: "19.3M" }
    ]
    return (
        <View style={styles.placeResultsContainer}>
            <FlatList renderItem={PlaceItem} data={dummyPlaceData} />
        </View>
    )
}
const styles = StyleSheet.create({
    placeResultsContainer: {
        flex: 1,
        display: 'flex',
        gap: 14,
        width: '100%',
    },

})
export default PlaceResults