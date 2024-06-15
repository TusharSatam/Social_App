import ScreenHeader from '@social/components/ScreenHeader/ScreenHeader';
import React, { useState } from 'react';
import { FlatList, StyleSheet, View, Modal, Text, TouchableOpacity } from 'react-native';
import UserListItem from '@social/components/ProfileComponents/UserListItem';
import CustomText from '@social/components/Text/CustomText';

const MyFollowers = () => {
    const [followersData, setFollowersData] = useState([
        { id: '1', source: { uri: 'https://images.freeimages.com/images/large-previews/6b2/paris-1217537.jpg?fmt=webp&w=500' }, username: "test1", Name: "test user", isFollowing: true },
        { id: '2', source: { uri: 'https://images.freeimages.com/images/large-previews/6b2/paris-1217537.jpg?fmt=webp&w=500' }, username: "test2", Name: "test user", isFollowing: true },
        { id: '3', source: { uri: 'https://images.freeimages.com/images/large-previews/6b2/paris-1217537.jpg?fmt=webp&w=500' }, username: "test3", Name: "test user", isFollowing: true },
        { id: '4', source: { uri: 'https://images.freeimages.com/images/large-previews/6b2/paris-1217537.jpg?fmt=webp&w=500' }, username: "test4", Name: "test user", isFollowing: true },
        { id: '5', source: { uri: 'https://images.freeimages.com/images/large-previews/6b2/paris-1217537.jpg?fmt=webp&w=500' }, username: "test5", Name: "test user", isFollowing: true },
    ]);

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const handleRemoveFollows = () => {
        if (selectedUser) {
            setFollowersData(prevData =>
                prevData.filter(user =>
                    user.id !== selectedUser.id
                )
            );
            setModalVisible(false);
        }
    };

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

    return (
        <View style={styles.myFollowersContainer}>
            <ScreenHeader headerName='Followers' />
            <View>
                <FlatList
                    data={followersData}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    numColumns={1}
                    contentContainerStyle={styles.videoContainer}
                />
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
                            <CustomText style={styles.modalText}>Are you sure you want to remove {selectedUser.username} from followers?</CustomText>
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => setModalVisible(!modalVisible)}
                                >
                                    <Text style={styles.textStyle}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.button, styles.buttonConfirm]}
                                    onPress={handleRemoveFollows}
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
        backgroundColor: "black",
        borderRadius: 20,
        padding: 35,
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
        backgroundColor: "#797979",
    },
    buttonConfirm: {
        backgroundColor: "#FF4D67",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        color:"white",
        fontSize:16,
    }
});

export default MyFollowers;
