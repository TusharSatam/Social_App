import React, { useEffect } from 'react';
import { View } from 'react-native';
import CustomText from '@social/components/Text/CustomText';
import { useRoute, RouteProp } from '@react-navigation/native';

// Define type for route params
type RootStackParamList = {
    ShortsDetailsScreen: { shortId: string };
};

// Define props type using RouteProp
type ShortsDetailsScreenRouteProp = RouteProp<RootStackParamList, 'ShortsDetailsScreen'>;

// Props interface with navigation prop
interface PostDetailsScreenProps {
    route: ShortsDetailsScreenRouteProp;
}

const ShortsDetailsScreen: React.FC<PostDetailsScreenProps> = ({ route }) => {
    const { shortId } = route.params;

    useEffect(() => {
        console.log('Short ID:', shortId);
        // Additional logic related to post details fetching can be added here
    }, [shortId]);

    return (
        <View>
            <CustomText>ShortsDetailsScreen {shortId??shortId}</CustomText>
        </View>
    );
}

export default ShortsDetailsScreen;
