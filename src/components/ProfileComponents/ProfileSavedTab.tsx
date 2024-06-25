import {StyleSheet, View} from "react-native";
import CustomText from "../Text/CustomText";
import Video from "react-native-video";
import {typography} from "@social/utils/typography";
import {TouchableOpacity} from "react-native";
import {useNavigation} from "@react-navigation/native";
import FastImage from "react-native-fast-image";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {
    useGetAllMySavedPostsQuery,
    useGetAllMySavedShortsQuery,
} from "@social/redux/services/auth/authApi";

const ProfileSavedTab = () => {
    const navigation = useNavigation();
    const handleNavigation = (screenName: string) => {
        (navigation as any).navigate(screenName);
    };
    const loggedInProfileData = useSelector((state: any) => state.auth?.user);
    const [page, setPage] = useState(1);
    const [allPosts, setAllPosts] = useState<any[]>([]);
    const [allShorts, setAllShorts] = useState<any[]>([]);
    const [hasFetchedShorts, setHasFetchedShorts] = useState(false);
    const [displayPostNone, setdisplayPostNone] = useState(false);
    const [displayShortNone, setdisplayShortNone] = useState(false);

    const {
        data: savedPosts,
        isLoading: isAllPostLoading,
        error: postError,
        refetch: refetchPosts,
    } = useGetAllMySavedPostsQuery({
        userId: loggedInProfileData?._id,
        page,
        limit: 8,
    });
    const {
        data: shortsResponse,
        isLoading: isAllShortsLoading,
        error: shortsError,
        refetch: refetchShorts,
    } = useGetAllMySavedShortsQuery({
        userId: loggedInProfileData?._id,
        page,
        limit: 8,
    });

    useEffect(() => {
        if (savedPosts?.data) {
            if (savedPosts?.data?.length === 0) {
                setdisplayPostNone(true);
            } else {
                let posts = savedPosts.data.slice(0, 4);
                while (posts.length < 4) {
                    posts.push({});
                }
                if (page === 1) {
                    setAllPosts(posts);
                }
                setHasFetchedShorts(true); // Indicate that posts have been fetched
            }
        }
    }, [savedPosts, page]);

    useEffect(() => {
        if (shortsResponse?.data) {
            if (shortsResponse?.data?.length === 0) {
                setdisplayShortNone(true);
            } else {
                let shorts = shortsResponse.data.slice(0, 4);
                while (shorts.length < 4) {
                    shorts.push({});
                }
                if (page === 1) {
                    setAllShorts(shorts);
                }
                setHasFetchedShorts(true);
            }
        }
    }, [shortsResponse, page]);

    useEffect(() => {
        console.log("allPosts", allPosts);
        console.log("allShorts", allShorts);
    }, [allPosts, allShorts]);

    return (
        <View style={styles.savedContainer}>
            <View style={styles.galleryWrapper}>
                {!displayPostNone ? (
                    <TouchableOpacity
                        onPress={() => handleNavigation("MySavedPosts")}
                        style={{overflow: "hidden"}}>
                        <View style={styles.postsGallery}>
                            {allPosts?.map((post, index) => (
                                <React.Fragment key={index}>
                                    {post?.media ? (
                                        <FastImage
                                            source={{uri: post?.media[0]?.url}}
                                            style={styles.post}
                                            key={`savedPost${index}`}
                                        />
                                    ) : (
                                        <View
                                            style={styles.post}
                                            key={`savedPost${index}`}></View>
                                    )}
                                </React.Fragment>
                            ))}
                        </View>
                    </TouchableOpacity>
                ) : (
                    <View style={styles.none}>
                        <CustomText className="text-white">None</CustomText>
                    </View>
                )}
                <CustomText style={styles.text}>Posts</CustomText>
            </View>
            <View style={styles.galleryWrapper}>
                {!displayShortNone ? (
                    <TouchableOpacity
                        onPress={() => handleNavigation("MySavedShorts")}>
                        <View style={styles.ShortsGallery}>
                            {allShorts?.map((short, index) => (
                                <>
                                    {short?.shorts ? (
                                        <Video
                                            source={{
                                                uri: short?.shorts[0]?.url
                                                    ? short?.shorts[0]?.url
                                                    : "",
                                            }}
                                            style={styles.short}
                                            muted
                                            repeat
                                            resizeMode="cover"
                                            paused
                                            key={`savedShort${index}`}
                                        />
                                    ) : (
                                        <View
                                            style={styles.short}
                                            key={`savedShort${index}`}></View>
                                    )}
                                </>
                            ))}
                        </View>
                    </TouchableOpacity>
                ) : (
                    <View style={styles.none}>
                        <CustomText className="text-white">None</CustomText>
                    </View>
                )}
                <CustomText style={styles.text}>Shorts</CustomText>
            </View>
        </View>
    );
};

export default ProfileSavedTab;
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
    none: {
        borderRadius: 20,
        height: 180,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        backgroundColor: "#797979",
    },
    postsGallery: {
        borderRadius: 10,
        width: "100%",
        height: 180,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        flexWrap: "wrap",
        overflow: "hidden",
        backgroundColor: "#797979",
    },
    ShortsGallery: {
        borderRadius: 10,
        width: "100%",
        height: 180,
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        overflow: "hidden",
        backgroundColor: "#797979",
    },
    post: {
        height: 90,
        width: "50%",
    },
    short: {
        height: 90,
        width: "50%",
    },
    text: {
        fontFamily: typography.sfMedium,
        fontSize: 12,
    },
});
