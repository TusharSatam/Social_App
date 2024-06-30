import AmazedIcon from "@social/components/SvgIcons/AmazedIcon";
import CryingIcon from "@social/components/SvgIcons/CryingIcon";
import HaloEmojiIcon from "@social/components/SvgIcons/HaloEmojiIcon";
import HeartIcon from "@social/components/SvgIcons/HeartIcon";
import LolIcon from "@social/components/SvgIcons/LolIcon";
import WinkIcon from "@social/components/SvgIcons/WinkIcon";
import {useLikePostMutation} from "@social/redux/services/auth/authApi";
import {colors} from "@social/utils/colors";
import React from "react";
import {
    FlatList,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import Animated, {
    Easing,
    SharedValue,
    useAnimatedStyle,
    useDerivedValue,
    withTiming,
} from "react-native-reanimated";
import {useSelector} from "react-redux";

const variantData = [
    {
        icon: HeartIcon,
        type: "heart",
    },
    {
        icon: AmazedIcon,
        type: "amazed",
    },
    {
        icon: HaloEmojiIcon,
        type: "halo",
    },
    {
        icon: LolIcon,
        type: "lol",
    },
    {
        icon: CryingIcon,
        type: "crying",
    },
    {
        icon: WinkIcon,
        type: "wink",
    },
];

interface PostFooterProps {
    showLikeVariant: SharedValue<boolean | number>;
    postIndex: number;
    forScroll: SharedValue<boolean | number>;
    id: string;
    like: any;
    setLike: any;
}

const AnimatedTouchaableOpacity =
    Animated.createAnimatedComponent(TouchableOpacity);

const LikeVariants = (props: PostFooterProps) => {
    const {showLikeVariant, postIndex, forScroll, id, like, setLike} = props;
    const loggedInProfileData = useSelector((state: any) => state.auth);

    const [likePostFn, {isLoading, isSuccess, isError, status}] =
        useLikePostMutation();

    const likedAPost = async likeType => {
        try {
            setLike(likeType);
            const resp = await likePostFn({
                likeType,
                userId: loggedInProfileData?.user?._id,
                postId: id,
            });
        } catch (error) {
            setLike(null);
        }
    };

    const scaleLikes = useDerivedValue(() => {
        return showLikeVariant.value === postIndex
            ? withTiming(1, {
                  duration: 500,
                  easing: Easing.inOut(Easing.circle),
              })
            : withTiming(0, {
                  duration: 300,
                  easing: Easing.out(Easing.circle),
              });
    }, [postIndex]);

    const scaleLikesList = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    scale: scaleLikes.value,
                },
            ],
            opacity: scaleLikes.value,
        };
    }, []);

    const renderLikes = ({item}) => {
        return (
            <AnimatedTouchaableOpacity
                onPress={() => {
                    forScroll.value = false;
                    likedAPost(item.type);
                }}>
                {React.createElement(item.icon, {width: 36, height: 36})}
            </AnimatedTouchaableOpacity>
        );
    };

    return (
        <Animated.View style={[styles.rootView, scaleLikesList]}>
            <Animated.FlatList
                horizontal
                style={[{flex: 1}, scaleLikesList]}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.containerStyle}
                data={variantData}
                renderItem={renderLikes}
            />
        </Animated.View>
    );
};

export default LikeVariants;

const styles = StyleSheet.create({
    containerStyle: {
        gap: 24,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 5,
    },
    rootView: {
        position: "absolute",
        borderRadius: 6,
        zIndex: 9999,
        backgroundColor: colors.white,
        width: "90%",
        alignSelf: "center",
        bottom: 100,
        height: 56,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        transform: [
            {
                scale: 0,
            },
        ],
    },
});
