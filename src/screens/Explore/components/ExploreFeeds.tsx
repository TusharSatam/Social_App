import CustomText from '@social/components/Text/CustomText'
import { StyleSheet, View } from 'react-native'
import { FlashList, MasonryFlashList } from "@shopify/flash-list";
import Feed from './Feed';
const ExploreFeeds = () => {
    const exploreData = [
        { id: '1', type: "image", source: { uri: 'https://images.freeimages.com/images/large-previews/6b2/paris-1217537.jpg?fmt=webp&w=500' } },
        { id: '2', type: "image", source: { uri: 'https://cdn.pixabay.com/photo/2017/08/24/11/04/brain-2676370_640.jpg' } },
        { id: '3', type: "video", source: { uri: 'https://videocdn.cdnpk.net/excite/content/video/premium/partners0764/large_watermarked/2856991_preview.mp4' } },
        { id: '4', type: "image", source: { uri: 'https://media.istockphoto.com/id/811745564/photo/night-view-of-hakodateyama-in-hokkaido-japan.jpg?s=1024x1024&w=is&k=20&c=7K8CPG7BGf6NaDcUExLzTFL5YWZLKO7ptMqoPnkXyXo=' } },
        { id: '5', type: "image", source: { uri: 'https://media.istockphoto.com/id/1398473177/photo/questionnaire-with-checkboxes-filling-survey-form-online-answer-questions.jpg?s=612x612&w=0&k=20&c=sgZY6ojUqB0goVyn_9fKLfeyZ6lyWjSb3-FQjgeUPec=' } },
        { id: '6', type: "image", source: { uri: 'https://media.istockphoto.com/id/1341866705/vector/web-design-and-layout-wireframe.jpg?s=612x612&w=0&k=20&c=WOmN5J6xQnxnGJ2jaMpCYzMVb-JC67iZfSKk4I54KNc=' } },
        { id: '7', type: "video", source: { uri: 'https://videocdn.cdnpk.net/excite/content/video/premium/partners0764/large_watermarked/2856991_preview.mp4' } },
        { id: '8', type: "image", source: { uri: 'https://media.istockphoto.com/id/1265041897/vector/business-team-working-together-on-web-page-design-people-building-website-interface-on.jpg?s=612x612&w=0&k=20&c=0nwzJe_VQNlN94Own93LE5pqnYG5g8E1ez7M4u0NWvk=' } },
        { id: '10', type: "image", source: { uri: 'https://media.istockphoto.com/id/1341866705/vector/web-design-and-layout-wireframe.jpg?s=612x612&w=0&k=20&c=WOmN5J6xQnxnGJ2jaMpCYzMVb-JC67iZfSKk4I54KNc=' } },
        { id: '11', type: "image", source: { uri: 'https://images.freeimages.com/images/large-previews/6b2/paris-1217537.jpg?fmt=webp&w=500' } },
        { id: '12', type: "image", source: { uri: 'https://cdn.pixabay.com/photo/2017/08/24/11/04/brain-2676370_640.jpg' } },
        { id: '13', type: "video", source: { uri: 'https://videocdn.cdnpk.net/excite/content/video/premium/partners0764/large_watermarked/2856991_preview.mp4' } },
        { id: '14', type: "image", source: { uri: 'https://media.istockphoto.com/id/811745564/photo/night-view-of-hakodateyama-in-hokkaido-japan.jpg?s=1024x1024&w=is&k=20&c=7K8CPG7BGf6NaDcUExLzTFL5YWZLKO7ptMqoPnkXyXo=' } },
        { id: '15', type: "image", source: { uri: 'https://media.istockphoto.com/id/1398473177/photo/questionnaire-with-checkboxes-filling-survey-form-online-answer-questions.jpg?s=612x612&w=0&k=20&c=sgZY6ojUqB0goVyn_9fKLfeyZ6lyWjSb3-FQjgeUPec=' } },
        { id: '16', type: "image", source: { uri: 'https://media.istockphoto.com/id/1341866705/vector/web-design-and-layout-wireframe.jpg?s=612x612&w=0&k=20&c=WOmN5J6xQnxnGJ2jaMpCYzMVb-JC67iZfSKk4I54KNc=' } },
        { id: '17', type: "video", source: { uri: 'https://videocdn.cdnpk.net/excite/content/video/premium/partners0764/large_watermarked/2856991_preview.mp4' } },
        { id: '18', type: "image", source: { uri: 'https://media.istockphoto.com/id/1265041897/vector/business-team-working-together-on-web-page-design-people-building-website-interface-on.jpg?s=612x612&w=0&k=20&c=0nwzJe_VQNlN94Own93LE5pqnYG5g8E1ez7M4u0NWvk=' } },
        { id: '19', type: "image", source: { uri: '	https://media.istockphoto.com/id/485866983/vector/…20&c=0dBjVrm88Gj4brbAk3Z-gsbAbPyIdg_ESWACFQBC2Mo=' } },
    ];
    return (
        <View style={styles.FeedsContainer}>
            <MasonryFlashList
                data={exploreData}
                numColumns={3}
                renderItem={({ item }) => <Feed item={item} key={item?.id} />}
                estimatedItemSize={200}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    FeedsContainer: {
        width: "100%",
        display: "flex",
        flex: 1,
        marginTop: 10,
    }
})
export default ExploreFeeds