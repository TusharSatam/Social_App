import ScreenHeader from '@social/components/ScreenHeader/ScreenHeader';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View, Modal, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import UserListItem from '@social/components/ProfileComponents/UserListItem';
import CustomText from '@social/components/Text/CustomText';
import { useDispatch, useSelector } from 'react-redux';
import EmptyMessage from '@social/components/ProfileComponents/EmptyMessage';
import { useGetAllFollowersMutation, useRemoveFollowerMutation } from '@social/redux/services/auth/authApi';
import { setFollowers } from '@social/redux/Slice/UserProfileActivitySlice';
import FetchingLoader from '@social/components/Loader/FetchingLoader';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';

const MyFollowers = () => {
    const [removeFollower, { isLoading: isfollowerRemoving }] = useRemoveFollowerMutation();
    const [getAllFollowers, { isLoading: isAllFollowersLoading }] = useGetAllFollowersMutation();
    const dispatch = useDispatch();
    const loggedInProfileActivityStats = useSelector((state: any) => state.userProfileActivity);
    const loggedInProfileData = useSelector((state: any) => state.auth);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [followers, setFollowersList] = useState([]);
    const [page, setPage] = useState(1);
    const [isFetchingMore, setIsFetchingMore] = useState(false);
    const [hasMoreData, setHasMoreData] = useState(true); // Track if there are more pages to fetch

    const fetchAllFollowers = async (pageNumber = 1,removeReFetch=false) => {
        if (!hasMoreData && !removeReFetch) return; // Stop fetching if no more data is available
        setIsFetchingMore(true);
        try {
            
            const followersresponse = await getAllFollowers({
                userId: loggedInProfileData?.user?._id,
                page: pageNumber,
                limit:13,
            }).unwrap();
            console.log("followersresponse",pageNumber);
            
            if (followersresponse?.data) {
                if (pageNumber === 1) {
                    setFollowersList(followersresponse.data);
                    dispatch(setFollowers(followersresponse.data));
                } else {
                    const newFollowersList = [...followers, ...followersresponse.data];
                    setFollowersList(newFollowersList);
                    dispatch(setFollowers(newFollowersList));
                }
                setPage(pageNumber);
                // Check if there are more pages to fetch
                if (followersresponse.data.length < 13) {
                    setHasMoreData(false); // No more data available
                }
            } else {
                setHasMoreData(false); // No more data available
            }
        } catch (error) {
            console.error("Failed to fetch follower users: ", error);
        } finally {
            setIsFetchingMore(false);
        }
    };

    const handleRemoveFollower = async () => {
        if (selectedUser) {
            const payload = {
                myUserId: loggedInProfileData?.user?._id,
                myFollowerUserId: selectedUser._id,
            };
            setModalVisible(false);
            const removeResponse = await removeFollower(payload).unwrap();
            if (removeResponse.message === "Follower removed successfully") {
                console.log("remove hasMoreData",hasMoreData);
                
                await fetchAllFollowers(1,true);
                console.log("done removing");
                
                Dialog.show({
                    type: ALERT_TYPE.SUCCESS,
                    title: 'Success',
                    textBody: 'Follower removed successfully.',
                    button: 'close',
                });
            }
        }
    };

    useEffect(() => {
            fetchAllFollowers();
    }, []);

    const renderItem = ({ item,index }) => (
        <UserListItem
            item={item}
            buttonType={"secondary"}
            buttonText={"Remove"}
            onPress={() => {
                setSelectedUser(item);
                setModalVisible(true);
            }}
            key={item?._id}
        />
    );

    const handleLoadMore = () => {
        
        if (!isFetchingMore && hasMoreData && followers.length >= 13) {
            fetchAllFollowers(page + 1);
        }
    };

    if (isAllFollowersLoading && page === 1 && followers?.length===0 ) {
        return <FetchingLoader />;
    }

    return (
        <View style={styles.myFollowersContainer} >
            <ScreenHeader headerName='Followers' />
            <View>
                {followers.length === 0 ? (
                    <EmptyMessage header="Add Followers" description="You'll see all the people who follow you here" />
                ) : (
                    <FlatList
                        data={followers}
                        renderItem={renderItem}
                        keyExtractor={(item) => item._id}
                        numColumns={1}
                        contentContainerStyle={styles.videoContainer}
                        onEndReached={handleLoadMore}
                        onEndReachedThreshold={0.1}
                        ListFooterComponent={isFetchingMore ? <ActivityIndicator size="large" color="#FF4D67" /> : null}
                    />
                )}
            </View>
            {selectedUser && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <CustomText style={styles.modalText}>
                                Are you sure you want to remove {selectedUser.username || selectedUser.Name} from followers?
                            </CustomText>
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => setModalVisible(!modalVisible)}
                                >
                                    <Text style={styles.cancelTextStyle}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.button, styles.buttonConfirm]}
                                    onPress={handleRemoveFollower}
                                >
                                    <Text style={styles.textStyle}>Remove</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    myFollowersContainer: {
        paddingHorizontal: 16,
        flex: 1,
        backgroundColor: '#fff',
    },
    videoContainer: {
        width: "100%",
        paddingBottom: 100,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 30,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginTop: 20,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        width: '45%',
    },
    buttonClose: {
        backgroundColor: "#F6F6F6",
    },
    buttonConfirm: {
        backgroundColor: "#FF4D67",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    cancelTextStyle: {
        color: "#FF4D67",
        fontWeight: "bold",
        textAlign: "center",
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 16,
    },
});

export default MyFollowers;
