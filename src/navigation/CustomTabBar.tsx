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
import { useCallback, useEffect, useState } from "react";
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
    const [activeTab, setActiveTab] = useState(0);
    useEffect(() => {
        console.log("navigationRef", navigationRef.current.getState());
    }, [])

    const tabs = [
        {
            label: "Home",
            activeIcon: <HomeIcon width={WIDTH} height={HEIGHT} />,
            inactiveIcon: (
                <HomeIcon fill={"white"} width={WIDTH} height={HEIGHT} />
            ),
            screenName: "HomeScreen",
        },
        {
            label: "Explore",
            inactiveIcon: <SearchIcon width={WIDTH} height={HEIGHT} />,
            activeIcon: (
                <SearchIcon
                    fill={"black"}
                    stroke={"white"}
                    width={WIDTH}
                    height={HEIGHT}
                />
            ),
            screenName: "ExploreStack",
        },
        {
            label: "Create-Post",
            activeIcon: <CircularPlusIcon width={60} height={60} />,
            screenName: "PostCreationStack",
        },
        {
            label: "Shorts",
            inactiveIcon: <PlayIcon width={WIDTH} height={HEIGHT} />,
            activeIcon: (
                <PlayIcon fill={"black"} width={WIDTH} height={HEIGHT} />
            ),
            screenName: "ShortStack",
        },
        {
            label: "Profile",
            inactiveIcon: <ProfileIcon width={WIDTH} height={HEIGHT} />,
            activeIcon: (
                <ProfileIcon fill={"black"} width={WIDTH} height={HEIGHT} />
            ),
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
          else if (screenName === "ExploreStack") {
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

    useEffect(() => {
        setActiveTab(props.state.index);
    }, [props.state.index]);

    // console.log(navigationRef?.current?.getCurrentRoute?.()?.name);
    // console.log(JSON.stringify(props.state, undefined, 4));

    if (NO_TABBAR[navigationRef?.current?.getCurrentRoute?.()?.name]) {
        return null;
    }

    return (
        <View style={styles.rootStyle}>
            {tabs.map((item, index) => {
                if (item.label === "Create-Post") {
                    return (
                        <TouchableOpacity
                            onPress={() => changeRoute(item.screenName)}
                            style={[
                                styles.container,
                                { position: "relative", top: -30 },
                            ]}
                            key={index}>
                            <View style={styles.iconStyle}>
                                {item.activeIcon}
                            </View>
                        </TouchableOpacity>
                    );
                }

                return (
                    <TouchableOpacity
                        onPress={() => changeRoute(item.screenName, item?.paramData)}
                        style={styles.container}
                        key={index}>
                        <View style={styles.iconStyle}>
                            {activeTab === index
                                ? item.activeIcon
                                : item.inactiveIcon}
                        </View>
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
        backgroundColor: colors.white,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
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
