import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import Video from 'react-native-video';
import ReelPlayIcon from '../SvgIcons/ProfileScreenIcons/ReelPlayIcon';
import ShortsItem from './ShortsItem';


// Sample data to represent the reels
const shortsData = [
  { id: '1', source: { uri: 'https://v6.cdnpk.net/videvo_files/video/premium/partners0547/large_watermarked/2557898_preview.mp4' }, views: '56K' },
  { id: '2', source: { uri: 'https://videocdn.cdnpk.net/cdn/content/video/partners0316/large_watermarked/h7975e5ac_MotionFlow6307_preview.mp4' }, views: '56K' },
  { id: '3', source: { uri: 'https://v3.cdnpk.net/videvo_files/video/premium/partners0485/large_watermarked/BB_572945f2-0abd-4d23-84f1-76146cd7422d_preview.mp4' }, views: '56K' },
  { id: '4', source: { uri: 'https://videocdn.cdnpk.net/euphony/content/video/happy/premium/partners0067/large_watermarked/BB_fb7a63cf-7bea-46c5-ac09-36fe1f101b89_preview.mp4' }, views: '56K' },
  { id: '5', source: { uri: 'https://v1.cdnpk.net/videvo_files/video/premium/getty_160/large_watermarked/istock-1175322947_preview.mp4' }, views: '56K' },
  { id: '6', source: { uri: 'https://videocdn.cdnpk.net/excite/content/video/premium/partners0764/large_watermarked/2856991_preview.mp4' }, views: '56K' },
];

const ProfileShortsTab = () => {
  const [paused, setPaused] = useState(Array(shortsData.length).fill(true));

  const togglePause = (index) => {
    setPaused((prevPaused) => {
      const newPaused = [...prevPaused];
      newPaused[index] = !newPaused[index];
      return newPaused;
    });
  };

  const renderItem = ({ item, index }) => (
    <ShortsItem item={item} paused={paused} index={index} togglePause={togglePause} />
  );

  return (
      <View style={styles.Reelscontainer}>
        <FlatList
          data={shortsData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={3}
          contentContainerStyle={styles.videoContainer}
          style={{flex:1}}
        />
      </View>
  );
};

const styles = StyleSheet.create({
  Reelscontainer: {
    width: '100%',
    paddingVertical: 11,
    paddingHorizontal: 16,
    backgroundColor: "#F6F6F6",
    flex:1,
  },
  videoContainer: {
    paddingHorizontal: 5,
    width: '100%',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  reelItem: {
    margin: 2.5,
    height: 174,
    width: 106,
    position: 'relative',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0', // Background color for placeholder effect
  },
  video: {
    height: '100%',
    width: '100%',
  },
  overlay: {
    position: 'absolute',
    bottom: 7,
    left: 10,
    // borderRadius: 5,
    // backgroundColor: 'rgba(0, 0, 0, 0.6)',
    // paddingHorizontal: 6,
    // paddingVertical: 3,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    gap: 3,
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

export default ProfileShortsTab;
