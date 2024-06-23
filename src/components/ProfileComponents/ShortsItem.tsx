import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import Video from 'react-native-video';
import ReelPlayIcon from '../SvgIcons/ProfileScreenIcons/ReelPlayIcon';

interface ReelItem {
    id: string;
    source: { uri: string };
    views: string;
}

interface ShortsItemProps {
    item: any;
    paused?: boolean[];
    index?: number;
    togglePause?: (index: number) => void;
}
const windowWidth = Dimensions.get('window').width;
const numColumns = 3;
const itemWidth = (windowWidth - 32 - (numColumns - 1) * 10) / numColumns;
const ShortsItem: React.FC<ShortsItemProps> = ({ item, paused, index, togglePause }) => {
    console.log("item",index,item?.shorts[0]?.url);
    const videoUrl = item?.shorts?.[0]?.url 
    ? item.shorts[0].url 
    : 'https://v6.cdnpk.net/videvo_files/video/premium/partners0547/large_watermarked/2557898_preview.mp4';
    
    return (
        <View style={[styles.reelItem, { width: itemWidth, height: 174 }]}>
            <Video
                source={{ uri: videoUrl }}
                style={styles.video}
                muted
                repeat
                resizeMode="cover"
                paused
                // paused={paused[index]}
            />
            <View style={styles.overlay}>
                <ReelPlayIcon />
                <Text style={styles.viewsText}>{item?.views?item.views:"N/A"}</Text>
            </View>
            {/* Enable play/pause button if needed */}
            {/* <TouchableOpacity style={styles.button} onPress={() => togglePause(index)}>
                <Text style={styles.buttonText}>{paused[index] ? 'Play' : 'Pause'}</Text>
            </TouchableOpacity> */}
        </View>
    );
};

const styles = StyleSheet.create({
    reelItem: {
        margin: 2.5,
        height: 174,
        width: 106,
        position: 'relative',
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: '#f0f0f0',
    },
    video: {
        height: '100%',
        width: '100%',
    },
    overlay: {
        position: 'absolute',
        bottom: 7,
        left: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 3,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        padding:2,
        paddingHorizontal:4,
        borderRadius:5,
    },
    viewsText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 12,
    },
    button: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        borderRadius: 5,
        paddingHorizontal: 6,
        paddingVertical: 3,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 12,
    },
});

export default ShortsItem;
