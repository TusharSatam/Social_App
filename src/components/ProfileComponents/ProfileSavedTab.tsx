import React from 'react'
import { StyleSheet, View } from 'react-native'
import CustomText from '../Text/CustomText'
import { Image } from 'react-native';
import Video from 'react-native-video';
import { typography } from '@social/utils/typography';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ProfileSavedTab = () => {
  const navigation = useNavigation()
  const handleNavigation = (screenName: string) => {
    (navigation as any).navigate(screenName)
  }
  // Sample data to represent the posts
  const postsData = [
    { id: '1', source: { uri: 'https://images.freeimages.com/images/large-previews/6b2/paris-1217537.jpg?fmt=webp&w=500' } },
    { id: '2', source: { uri: 'https://cdn.pixabay.com/photo/2017/08/24/11/04/brain-2676370_640.jpg' } },
    { id: '3', source: { uri: 'https://media.istockphoto.com/id/1277730699/photo/industrial-technology-concept-communication-network-industry-4-0-factory-automation.jpg?s=1024x1024&w=is&k=20&c=tj0FhN8XQDnjolxJAeTYySVCU-Hxh1POEzE3ALK5eVU=' } },
    { id: '4', source: { uri: 'https://media.istockphoto.com/id/811745564/photo/night-view-of-hakodateyama-in-hokkaido-japan.jpg?s=1024x1024&w=is&k=20&c=7K8CPG7BGf6NaDcUExLzTFL5YWZLKO7ptMqoPnkXyXo=' } },
  ];
  // Sample data to represent the shorts
  const shortsData = [
    { id: '1', source: { uri: 'https://v6.cdnpk.net/videvo_files/video/premium/partners0547/large_watermarked/2557898_preview.mp4' }, views: '56K' },
    { id: '2', source: { uri: 'https://videocdn.cdnpk.net/cdn/content/video/partners0316/large_watermarked/h7975e5ac_MotionFlow6307_preview.mp4' }, views: '56K' },
    { id: '3', source: { uri: 'https://v3.cdnpk.net/videvo_files/video/premium/partners0485/large_watermarked/BB_572945f2-0abd-4d23-84f1-76146cd7422d_preview.mp4' }, views: '56K' },
    { id: '4', source: { uri: 'https://videocdn.cdnpk.net/euphony/content/video/happy/premium/partners0067/large_watermarked/BB_fb7a63cf-7bea-46c5-ac09-36fe1f101b89_preview.mp4' }, views: '56K' },
  ];

  return (
    <View style={styles.savedContainer}>
      <View style={styles.galleryWrapper}>
        <TouchableOpacity onPress={() => handleNavigation("MySavedPosts")}>
          <View style={styles.postsGallery}>
            {postsData?.map((post, i) => (
              <Image source={{ uri: post?.source?.uri }} style={styles.post} />
            ))
            }
          </View>
        </TouchableOpacity>
        <CustomText style={styles.text}>Posts</CustomText>
      </View>
      <View style={styles.galleryWrapper}>
        <TouchableOpacity onPress={() => handleNavigation("MySavedShorts")}>
          <View style={styles.ShortsGallery}>
            {shortsData?.map((short, i) => (
              <Video
                source={short.source}
                style={styles.short}
                muted
                repeat
                resizeMode="cover"
                paused
              />
            ))
            }
          </View>
        </TouchableOpacity>
        <CustomText style={styles.text}>Shorts</CustomText>
      </View>
    </View>
  )
}

export default ProfileSavedTab
const styles = StyleSheet.create({
  savedContainer: {
    paddingVertical: 11,
    paddingHorizontal: 16,
    display: "flex",
    gap: 5,
    flexDirection: "row",
    backgroundColor: "#f6f6f6",
    width: "100%",
    flex: 1,
  },
  galleryWrapper: {
    width: "50%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    overflow: "hidden",
    gap: 10,
    // backgroundColor:"yellow",
    // borderRadius: 10,
  },
  postsGallery: {
    borderRadius: 10,
    width: "100%",
    height: 180,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    overflow: "hidden",
  },
  ShortsGallery: {
    borderRadius: 10,
    width: "100%",
    height: 180,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    overflow: "hidden",
  },
  post: {
    height: 90,
    width: "50%"
  },
  short: {
    height: 90,
    width: "50%"
  },
  text: {
    fontFamily: typography.sfMedium,
    fontSize: 12,
  }
})