import { useNavigation } from '@react-navigation/native';
import ScreenHeader from '@social/components/ScreenHeader/ScreenHeader';
import CustomText from '@social/components/Text/CustomText';
import React from 'react';
import { StyleSheet, View, FlatList, Image, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const windowWidth = Dimensions.get('window').width;
const numColumns = 3; // Number of columns

const MySavedPosts = () => {
    const navigation = useNavigation();
    const postsData = [
        { id: '1', source: { uri: 'https://images.freeimages.com/images/large-previews/6b2/paris-1217537.jpg?fmt=webp&w=500' } },
        { id: '2', source: { uri: 'https://cdn.pixabay.com/photo/2017/08/24/11/04/brain-2676370_640.jpg' } },
        { id: '3', source: { uri: 'https://media.istockphoto.com/id/1277730699/photo/industrial-technology-concept-communication-network-industry-4-0-factory-automation.jpg?s=1024x1024&w=is&k=20&c=tj0FhN8XQDnjolxJAeTYySVCU-Hxh1POEzE3ALK5eVU=' } },
        { id: '4', source: { uri: 'https://media.istockphoto.com/id/811745564/photo/night-view-of-hakodateyama-in-hokkaido-japan.jpg?s=1024x1024&w=is&k=20&c=7K8CPG7BGf6NaDcUExLzTFL5YWZLKO7ptMqoPnkXyXo=' } },
        { id: '5', source: { uri: 'https://media.istockphoto.com/id/1398473177/photo/questionnaire-with-checkboxes-filling-survey-form-online-answer-questions.jpg?s=612x612&w=0&k=20&c=sgZY6ojUqB0goVyn_9fKLfeyZ6lyWjSb3-FQjgeUPec=' } },
        { id: '6', source: { uri: 'https://media.istockphoto.com/id/1341866705/vector/web-design-and-layout-wireframe.jpg?s=612x612&w=0&k=20&c=WOmN5J6xQnxnGJ2jaMpCYzMVb-JC67iZfSKk4I54KNc=' } },
        { id: '7', source: { uri: 'https://media.istockphoto.com/id/1305995602/photo/responsive-floating-responsive-design.jpg?s=612x612&w=0&k=20&c=_i6M_ECBZWJtoHh6dVlmZxxSNaQOBfUNXGT2Q9phpvQ=' } },
        { id: '8', source: { uri: 'https://media.istockphoto.com/id/1265041897/vector/business-team-working-together-on-web-page-design-people-building-website-interface-on.jpg?s=612x612&w=0&k=20&c=0nwzJe_VQNlN94Own93LE5pqnYG5g8E1ez7M4u0NWvk=' } },
        { id: '9', source: { uri: '	https://media.istockphoto.com/id/485866983/vector/…20&c=0dBjVrm88Gj4brbAk3Z-gsbAbPyIdg_ESWACFQBC2Mo=' } },
    ];

    // Calculate item width dynamically based on window width and number of columns
    const itemWidth = (windowWidth - 32 - (numColumns - 1) * 10) / numColumns; // 32 is for horizontal padding, 10 is for margin between items

    // Function to render each item in the FlatList
    const renderItem = ({ item }) => (
        <Image
            source={item.source}
            style={{ width: itemWidth, height: itemWidth, margin: 2.5, borderRadius: 8 }}
        />
    );

    return (
        <View style={styles.savedContainer}>
            <ScreenHeader headerName='Saved Posts' navigation={navigation} />
            <FlatList
                data={postsData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                numColumns={numColumns} // Render 3 columns
                contentContainerStyle={styles.savedPosts}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    savedContainer: {
        paddingHorizontal: 16,
    },
    savedPosts: {
        // paddingTop: 16,
        // paddingHorizontal: 10,
    },
});

export default MySavedPosts;
