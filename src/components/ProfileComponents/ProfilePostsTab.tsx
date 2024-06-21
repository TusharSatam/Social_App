import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';
import { setPosts } from '@social/redux/Slice/UserProfileActivitySlice';
import { useGetAllMyPostsMutation } from '@social/redux/services/auth/authApi';
import { useEffect, useState } from 'react';
import FetchingLoader from '../Loader/FetchingLoader';
import ExploreShortIcon from '../SvgIcons/ExploreScreenIcons/ExploreShortIcon';
import LocationSearchIcon from '../SvgIcons/ExploreScreenIcons/LocationSearchIcon';
import MultiPostIcon from "react-native-vector-icons/MaterialCommunityIcons"
import EmptyMessage from './EmptyMessage';
import { TouchableOpacity } from '@gorhom/bottom-sheet';
import CustomText from '../Text/CustomText';
import { typography } from '@social/utils/typography';
import { colors } from '@social/utils/colors';
import { useNavigation } from '@react-navigation/native';
import AddContentIcon from "react-native-vector-icons/Ionicons"
const ProfilePostsTab = ({ userId }) => {
    const navigation = useNavigation()
    const dispatch = useDispatch();
    const loggedInProfileData = useSelector((state: any) => state.auth?.user);
    const loggedInProfileActivityStats = useSelector((state: any) => state.userProfileActivity);

    const [getAllMyPosts, { isLoading: isAllPostLoading }] = useGetAllMyPostsMutation();
    const [allPosts, setallPosts] = useState<any[] | null>(null)

    const handlePostClick = (postId) => {
        console.log("handlePostClick", userId);

        (navigation as any).navigate('PostDetailsScreen', { postId });

    };
    const fetchAllMyPosts = async () => {
        const postResponse = await getAllMyPosts({ userId }).unwrap()
        try {
            if (postResponse?.data) {
                setallPosts(postResponse?.data)
                dispatch(
                    setPosts(postResponse?.data)
                )
            }
        }
        catch (error) {
            console.error("Failed to fetch follower users: ", error);
        }
    }

    useEffect(() => {
        fetchAllMyPosts()
    }, [])

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => handlePostClick(item._id)}>
            <View style={styles.postItem}>
                {item?.Media?.length > 1 &&
                    <View style={styles.multiPostIcon}>
                        <MultiPostIcon name='card-multiple-outline' />
                    </View>
                }
                <FastImage source={{ uri: item?.Media[0]?.url }} style={styles.profileImage} />
            </View>
        </TouchableOpacity>
    );

    if (isAllPostLoading) {
        return <View className='h-full min-w-full justify-center items-center flex flex-1'>
            <ActivityIndicator size="large" color="#FF4D67" />
        </View>;
    }
    return (
        <FlatList
            data={allPosts}
            keyExtractor={(item) => item._id}
            renderItem={renderItem}
            ListEmptyComponent={
                <View style={styles.emptyListComponent}>
                    {loggedInProfileData?._id === userId ? <TouchableOpacity onPress={() => (navigation as any).navigate("PostCreationStack")} style={styles.createPostBtn}>
                        <AddContentIcon name='add-circle-outline' size={24} color={colors['24Color']} />
                        <CustomText style={styles.emptyPostText}> Create your first post</CustomText>
                    </TouchableOpacity> :
                        <View>
                            <CustomText style={styles.emptyPostText}>No Post Yet</CustomText>
                        </View>}
                </View>
            }
            numColumns={3}
            contentContainerStyle={styles.postContainer}
        />

    )
}
const styles = StyleSheet.create({
    postContainer: {
        // backgroundColor: "#F6F6F6",
        paddingVertical: 11,
        paddingHorizontal: 16,
        // flex:1,
        minWidth: "100%",
    },
    postItem: {
        margin: 2.5,
    },
    profileImage: {
        height: 106,
        aspectRatio: 1, // To maintain aspect ratio (1:1 square images)
        borderRadius: 5,
    },
    emptyListComponent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 30,
    },

    emptyPostText: {
        fontFamily: typography.sfSemiBold,
        fontSize: 16,
        color: colors['24Color'],
    },
    multiPostIcon: {
        position: 'absolute',
        top: 2,
        right: 2,
        zIndex: 10,
    },
    createPostBtn: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
})
export default ProfilePostsTab