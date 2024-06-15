import { CommonActions, useNavigation } from "@react-navigation/native";
import CircularPlusIcon from "@social/components/SvgIcons/CircularPlusIcon";
import HomeIcon from "@social/components/SvgIcons/HomeIcon";
import PlayIcon from "@social/components/SvgIcons/PlayIcon";
import ProfileIcon from "@social/components/SvgIcons/ProfileIcon";
import SearchIcon from "@social/components/SvgIcons/SearchIcon";
import { clearMediaPost } from "@social/redux/Slice/PostSlice";
import { navigationRef } from "@social/refs/refs";
import { colors } from "@social/utils/colors";
import { helpers } from "@social/utils/helpers";
import { typography } from "@social/utils/typography";
import { useEffect, useState } from "react";
import {
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

const HEIGHT = 30;
const WIDTH = 30;

const NO_TABBAR = {
    PostCreationStack: true,
    CreatePost: true,
    SharePost: true,
};

const CustomTabBar = props => {
    const dispatch = useDispatch();
    const [routes, setRoutes] = useState(props.state.routeNames);
    const navigation = useNavigation();
    const loggedInProfileData = useSelector((state: any) => state.auth)

    const tabs = [
        {
            label: "Home",
            icon: <HomeIcon width={WIDTH} height={HEIGHT} />,
            screenName: "HomeScreen",
        },
        {
            label: "Explore",
            icon: <SearchIcon width={25} height={25} />,
            screenName: "ExploreStack",
        },
        {
            label: "Create-Post",
            icon: <CircularPlusIcon width={45} height={45} />,
            screenName: "PostCreationStack",
        },
        {
            label: "Shorts",
            icon: <PlayIcon width={WIDTH} height={HEIGHT} />,
            screenName: "ShortStack",
        },
        {
            label: "Profile",
            icon: <ProfileIcon width={WIDTH} height={HEIGHT} />,
            screenName: "ProfileStack",
            paramData: { userId: loggedInProfileData?.user?._id, loggedInUserId: loggedInProfileData?.user?._id }
        },
    ];

    const changeRoute = (screenName, paramData = null) => {
        if (screenName === "PostCreationStack") {
            dispatch(clearMediaPost());
            (navigation as any).navigate(screenName, {
                screen: "CreatePost",
            });
        }
        else if (screenName === "ProfileStack") {
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [
                        {
                            name: screenName,
                        },
                    ],
                })
            );
        }
        else if (paramData) {
            (navigation as any).navigate(screenName,paramData);
        }
        else {
            (navigation as any).navigate(screenName);
        }

    };

    const init = async () => {
        const isGranted = await helpers.checkReadCameraGalleryPermission();
        if (!isGranted) {
            helpers.requestReadCameraGalleryPermission();
        }
    };

    useEffect(() => {
        init();
    }, []);

    if (NO_TABBAR[navigationRef?.current?.getCurrentRoute?.()?.name]) {
        return null;
    }

    return (
        <View style={styles.rootStyle}>
            {tabs.map((item, index) => {
                return (
                    <TouchableOpacity
                        onPress={() => changeRoute(item.screenName, item?.paramData)}
                        style={styles.container}
                        key={index}>
                        <View style={styles.iconStyle}>{item.icon}</View>
                        {item.label !== "Create-Post" && (
                            <View style={styles.labelStyle}>
                                <Text style={styles.label}>{item.label}</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

export default CustomTabBar;

const styles = StyleSheet.create({
    rootStyle: {
        height: 65,
        width: "100%",
        backgroundColor: colors.black,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },
    label: {
        fontSize: 10,
        color: colors.lightGrey,
        fontFamily: typography.sfRegular,
    },
    container: {
        height: "100%",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    iconStyle: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    labelStyle: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
});
