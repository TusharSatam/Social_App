import ExploreShortIcon from '@social/components/SvgIcons/ExploreScreenIcons/ExploreShortIcon'
import CustomText from '@social/components/Text/CustomText'
import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Video from 'react-native-video'

const Feed = ({ item }) => {
    return (
        <View style={styles.feedContainer}>
            {item?.type === "image" ?
                <TouchableOpacity>
                    <FastImage source={item.source} style={{ height: 106, borderRadius: 5 }} />
                </TouchableOpacity> :
                <TouchableOpacity style={styles.shortWrapper}>
                    <ExploreShortIcon style={styles.shortIcon} />
                    <Video
                        source={item.source}
                        muted
                        repeat
                        resizeMode="cover"
                        paused
                        style={{ height: "100%", borderRadius: 5 }}
                    />
                </TouchableOpacity>
            }
        </View>
    )
}
const styles = StyleSheet.create({
    feedContainer: {
        margin: 2.5
    },
    shortWrapper: {
        position: "relative",
        height: 174,
        borderRadius: 5,
        overflow: "hidden",
        zIndex: 1,
    },
    shortIcon: {
        position: "absolute",
        top: 7,
        right: 7,
        zIndex: 2,
    }
})
export default Feed