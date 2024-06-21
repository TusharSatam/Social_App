import {
    FlatList,
    SectionList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import React from "react";
import GenericHeader from "@social/components/GenericHeader/GenericHeader";
import HeaderLeftArrow from "@social/components/SvgIcons/HeaderLeftArrow";
import {typography} from "@social/utils/typography";
import {colors} from "@social/utils/colors";
import NotificationBox from "./components/NotificationBox";
import {useNavigation} from "@react-navigation/native";

const SPACING_HORIZONTAL = 15;

const Header = props => {
    const {onHeaderLeftAction, onHeaderRightAction} = props;
    return (
        <View style={styles.root}>
            <TouchableOpacity onPress={onHeaderLeftAction}>
                <HeaderLeftArrow height={19} />
            </TouchableOpacity>
            <View>
                <Text style={styles.headerText}>Notifications</Text>
            </View>
            <TouchableOpacity style={{opacity: 0}}>
                <HeaderLeftArrow height={19} />
            </TouchableOpacity>
        </View>
    );
};

const renderNotification = ({item}) => {
    return (
        <NotificationBox
            atTo=""
            author="carig_dove"
            authorDesc={item.desc}
            whenTitle="Today"
            type={item.type}
        />
    );
};

const renderSectionHeader = ({section: {title}}) => {
    return (
        <View style={styles.whenContainer}>
            <Text style={styles.when}>{title}</Text>
        </View>
    );
};

const Notification = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <GenericHeader>
                <Header
                    onHeaderLeftAction={() => navigation.goBack()}
                    onHeaderRightAction={() => {}}
                />
            </GenericHeader>
            <SectionList
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                renderSectionFooter={() => (
                    <View
                        style={{
                            height: StyleSheet.hairlineWidth,
                            backgroundColor: colors.lightText,
                            marginBottom: 10,
                        }}
                    />
                )}
                renderSectionHeader={renderSectionHeader}
                renderItem={renderNotification}
                sections={[
                    {
                        title: "Today",
                        data: [
                            {
                                type: "tagged",
                                desc: "mentioned you in a comment: @jacob_w exactly",
                            },
                            {type: "follow", desc: "started following you"},
                            {type: "message", desc: "started following you"},
                        ],
                    },
                    {
                        title: "Last Week",
                        data: [
                            {
                                type: "tagged",
                                desc: "mentioned you in a comment: @jacob_w exactly",
                            },
                            {type: "message", desc: "started following you"},
                            {
                                type: "tagged",
                                desc: "mentioned you in a comment: @jacob_w exactly",
                            },
                            {type: "message", desc: "started following you"},
                        ],
                    },
                    {
                        title: "Previous",
                        data: [
                            {
                                type: "tagged",
                                desc: "mentioned you in a comment: @jacob_w exactly",
                            },
                            {type: "follow", desc: "started following you"},
                            {
                                type: "tagged",
                                desc: "mentioned you in a comment: @jacob_w exactly",
                            },
                            {type: "message", desc: "started following you"},
                            {type: "follow", desc: "started following you"},
                            {
                                type: "tagged",
                                desc: "mentioned you in a comment: @jacob_w exactly",
                            },
                        ],
                    },
                ]}
            />
            {/* <FlatList
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                data={}
                renderItem={renderNotification}
            /> */}
        </View>
    );
};

export default Notification;

const styles = StyleSheet.create({
    whenContainer: {
        paddingBottom: 15,
    },
    when: {
        fontSize: 15,
        fontFamily: typography.sfSemiBold,
        color: colors["26Color"],
    },
    container: {
        paddingHorizontal: SPACING_HORIZONTAL,
        flex: 1,
        paddingVertical: 10,
        backgroundColor: colors.white,
    },
    root: {
        height: 50,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    headerText: {
        fontSize: 18,
        fontFamily: typography.sfSemiBold,
        fontWeight: "600",
        color: colors.black,
    },
});
