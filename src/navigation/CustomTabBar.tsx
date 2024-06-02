import {useNavigation} from "@react-navigation/native";
import CircularPlusIcon from "@social/components/SvgIcons/CircularPlusIcon";
import HomeIcon from "@social/components/SvgIcons/HomeIcon";
import PlayIcon from "@social/components/SvgIcons/PlayIcon";
import ProfileIcon from "@social/components/SvgIcons/ProfileIcon";
import SearchIcon from "@social/components/SvgIcons/SearchIcon";
import {navigationRef} from "@social/refs/refs";
import {colors} from "@social/utils/colors";
import {typography} from "@social/utils/typography";
import {useState} from "react";
import {
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const HEIGHT = 30;
const WIDTH = 30;

const CustomTabBar = props => {
    const [routes, setRoutes] = useState(props.state.routeNames);
    const navigation = useNavigation();

    const [tabs, setTabs] = useState([
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
        },
    ]);

    const changeRoute = screenName => {
        (navigation as any).navigate(screenName);
    };

    return (
        <View style={styles.rootStyle}>
            {tabs.map((item, index) => {
                return (
                    <TouchableOpacity
                        onPress={() => changeRoute(item.screenName)}
                        style={{
                            height: "100%",
                            flex: 1,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                        key={index}>
                        <View
                            style={{
                                width: "100%",
                                alignItems: "center",
                                justifyContent: "center",
                            }}>
                            {item.icon}
                        </View>
                        {item.label !== "Create-Post" && (
                            <View
                                style={{
                                    width: "100%",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}>
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
});
