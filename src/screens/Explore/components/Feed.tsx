import { CommonActions, useNavigation } from '@react-navigation/native'
import ExploreShortIcon from '@social/components/SvgIcons/ExploreScreenIcons/ExploreShortIcon'
import CustomText from '@social/components/Text/CustomText'
import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Video from 'react-native-video'

const Feed = ({ item, index }) => {
    // console.log(`item ${index}:`);
    // console.log(item?.Media[0]?.mimetype.split("/"));
    const navigation = useNavigation()
    const handlePostNavigation = () => {
        (navigation as any).navigate("ExplorePostDetailScreen", { postId: item?._id })
    }
    const handleShortNavigation = () => {
        (navigation as any).navigate("ExploreShortDetailScreen", { shortId: item?._id })
    }
    return (
        <View style={styles.feedContainer}>
            {item?.Media?.length > 0 && <>
                {item?.Media[0]?.mimetype?.split("/")[0] === "image" ?
                    <TouchableOpacity onPress={handlePostNavigation}>
                        <FastImage source={{ uri: item?.Media[0]?.url ? item?.Media[0]?.url : "https://images.freeimages.com/images/large-previews/6b2/paris-1217537.jpg?fmt=webp&w=500" }} style={{ height: 106, borderRadius: 5 }} />
                    </TouchableOpacity> :
                    null
                }
            </>
            }
            {item?.shorts?.length > 0 &&
                <TouchableOpacity style={styles.shortWrapper} onPress={handleShortNavigation}>
                    <ExploreShortIcon style={styles.shortIcon} />
                    <Video
                        source={{ uri: item.shorts[0]?.url ? item.shorts[0]?.url : "https://videocdn.cdnpk.net/excite/content/video/premium/partners0764/large_watermarked/2856991_preview.mp4" }}
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
        margin: 2.5,
        borderRadius:10,
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