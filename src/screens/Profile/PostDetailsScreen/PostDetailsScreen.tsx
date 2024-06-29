import React, { useEffect } from 'react';
import { View } from 'react-native';
import CustomText from '@social/components/Text/CustomText';
import { useRoute, RouteProp } from '@react-navigation/native';

// Define type for route params
type RootStackParamList = {
    PostDetailsScreen: { postId: string };
};

// Define props type using RouteProp
// type PostDetailsScreenRouteProp = RouteProp<RootStackParamList, 'PostDetailsScreen'>;

// Props interface with navigation prop
// interface PostDetailsScreenProps {
//     route: PostDetailsScreenRouteProp;
// }
// :React.FC<PostDetailsScreenProps>
const PostDetailsScreen = ({ route }) => {
    const { postId } = route.params;

  

    return (
        <View>
            <CustomText>PostDetailsScreen {postId??postId}</CustomText>
        </View>
    );
}

export default PostDetailsScreen;
