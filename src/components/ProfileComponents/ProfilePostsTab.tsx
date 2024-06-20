import { StyleSheet, View } from 'react-native'
import { useSelector } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';

const ProfilePostsTab = () => {
    const profileData = useSelector((state: any) => state.auth?.user);
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

    return (
        <ScrollView>
            <View style={styles.postContainer}>
                {postsData?.map((post, index) => (
                    <FastImage source={{ uri: post?.source?.uri }} style={styles.profileImage} key={post?.id}/>
                ))}
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    postContainer: {
        width: "100%",
        backgroundColor: "#F6F6F6",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 5,
        paddingVertical: 11,
        paddingHorizontal: 16,
    },
    profileImage: {
        height: 106,
        aspectRatio: 1, // To maintain aspect ratio (1:1 square images)
        borderRadius: 5,
    },
})
export default ProfilePostsTab