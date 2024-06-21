import React, { useEffect } from 'react';
import { View } from 'react-native';
import CustomText from '@social/components/Text/CustomText';
import { useRoute, RouteProp } from '@react-navigation/native';

// Define type for route params
type RootStackParamList = {
    PostDetailsScreen: { postId: string };
};

// Define props type using RouteProp
type PostDetailsScreenRouteProp = RouteProp<RootStackParamList, 'PostDetailsScreen'>;

// Props interface with navigation prop
interface PostDetailsScreenProps {
    route: PostDetailsScreenRouteProp;
}

const PostDetailsScreen: React.FC<PostDetailsScreenProps> = ({ route }) => {
    const { postId } = route.params;

    useEffect(() => {
        console.log('Post ID:', postId);
        // Additional logic related to post details fetching can be added here
    }, [postId]);

    return (
        <View>
            <CustomText>PostDetailsScreen {postId??postId}</CustomText>
        </View>
    );
}

export default PostDetailsScreen;
