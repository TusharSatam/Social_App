import ScreenHeader from '@social/components/ScreenHeader/ScreenHeader';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View, Modal, Text, TouchableOpacity } from 'react-native';
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

    const fetchAllFollowers = async () => {
        const followersresponse = await getAllFollowers({ userId: loggedInProfileData?.user?._id }).unwrap()
        try {
            if (followersresponse?.data) {
                console.log("followersresponse", followersresponse?.data);

                dispatch(
                    setFollowers(followersresponse?.data)
                )
            }
        }
        catch (error) {
            console.error("Failed to fetch follower users: ", error);
        }
    }
    const handleRemoveFollower = async () => {
        if (selectedUser) {
            console.log(selectedUser);

            const payload = {
                myUserId: loggedInProfileData?.user?._id,
                myFollowerUserId: selectedUser._id
            }
            console.log(payload);
            setModalVisible(false);
            const removeResponse = await removeFollower(payload).unwrap()
            console.log(removeResponse);
            if (removeResponse.message === "Follower removed successfully") {
                await fetchAllFollowers()
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
        fetchAllFollowers()
    }, [])

    const renderItem = ({ item }) => (
        <UserListItem
            item={item}
            buttonType={"secondary"}
            buttonText={"Remove"}
            onPress={() => {
                setSelectedUser(item);
                setModalVisible(true);
            }}
        />
    );
    if (isAllFollowersLoading) {
        return <FetchingLoader />
    }
    return (
        <View style={styles.myFollowersContainer}>
            <ScreenHeader headerName='Followers' />
            <View>
                {loggedInProfileActivityStats?.followers?.length === 0 ? <EmptyMessage header="Add Followers" description="You'll see all the people who follow you here" /> :
                    <FlatList
                        data={loggedInProfileActivityStats?.followers}
                        renderItem={renderItem}
                        keyExtractor={(item) => item._id}
                        numColumns={1}
                        contentContainerStyle={styles.videoContainer}
                    />}
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
                            <CustomText style={styles.modalText}>Are you sure you want to remove {selectedUser.username || selectedUser.Name} from followers?</CustomText>
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
            height: 2
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
    }
});

export default MyFollowers;
