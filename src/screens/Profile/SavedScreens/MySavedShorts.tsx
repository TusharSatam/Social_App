import { useNavigation } from '@react-navigation/native';
import ShortsItem from '@social/components/ProfileComponents/ShortsItem';
import ScreenHeader from '@social/components/ScreenHeader/ScreenHeader';
import React from 'react';
import { StyleSheet, View, FlatList, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const numColumns = 3; // Number of columns

const MySavedPosts = () => {
  const navigation = useNavigation();
  const shortsData = [
    { id: '1', source: { uri: 'https://v6.cdnpk.net/videvo_files/video/premium/partners0547/large_watermarked/2557898_preview.mp4' }, views: '56K' },
    { id: '2', source: { uri: 'https://videocdn.cdnpk.net/cdn/content/video/partners0316/large_watermarked/h7975e5ac_MotionFlow6307_preview.mp4' }, views: '56K' },
    { id: '3', source: { uri: 'https://v3.cdnpk.net/videvo_files/video/premium/partners0485/large_watermarked/BB_572945f2-0abd-4d23-84f1-76146cd7422d_preview.mp4' }, views: '56K' },
    { id: '4', source: { uri: 'https://videocdn.cdnpk.net/euphony/content/video/happy/premium/partners0067/large_watermarked/BB_fb7a63cf-7bea-46c5-ac09-36fe1f101b89_preview.mp4' }, views: '56K' },
    { id: '5', source: { uri: 'https://v1.cdnpk.net/videvo_files/video/premium/getty_160/large_watermarked/istock-1175322947_preview.mp4' }, views: '56K' },
    { id: '6', source: { uri: 'https://videocdn.cdnpk.net/excite/content/video/premium/partners0764/large_watermarked/2856991_preview.mp4' }, views: '56K' },
  ];

  // Calculate item width dynamically based on window width and number of columns
  const itemWidth = (windowWidth - 32 - (numColumns - 1) * 10) / numColumns; // 32 is for horizontal padding, 10 is for margin between items

  // Function to render each item in the FlatList
  const renderItem = ({ item, index }) => (
    <View style={{ width: itemWidth, margin: 5 }}>
      <ShortsItem item={item} index={index} />
    </View>
  );

  return (
    <View style={styles.savedContainer}>
      <ScreenHeader headerName='Saved Shorts' navigation={navigation} />
      <FlatList
        data={shortsData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={numColumns} // Render 3 columns
        contentContainerStyle={styles.savedPosts}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  savedContainer: {
    paddingHorizontal: 16,
    flex: 1, // Ensure the container takes full height
  },
  savedPosts: {
    paddingTop: 16,
  },
});

export default MySavedPosts;
