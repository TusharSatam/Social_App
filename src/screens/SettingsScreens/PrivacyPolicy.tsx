import { useNavigation } from '@react-navigation/native'
import ScreenHeader from '@social/components/ScreenHeader/ScreenHeader'
import CustomText from '@social/components/Text/CustomText'
import { ScrollView, StyleSheet, View } from 'react-native'

const PrivacyPolicy = () => {
    const navigation = useNavigation()
    return (
        <View style={styles.mainContainer} ><ScreenHeader headerName='Privacy Policy' navigation={navigation} />
            <ScrollView style={styles.containWrapper}>
                <View>
                    <CustomText style={styles.title}>Terms & Conditions </CustomText>
                    <CustomText style={styles.description}>Lorem Ipsum dolor sit ametm Lorem Ipsum dolor sit ametm Lorem Ipsum dolor sit ametm Lorem Ipsum dolor stm Lorem Ipsum dolor sit ametm Lorem Ipsum doletm Lorem Ipsum dolor sit ametm Lorem Ipsum dolor stm  Lorem Ipsum dolor sit ametm Lorem Ipsum dolor sit ametm Lorem Ipsum dolor sit ametm Lorem Ipsum dolor sit ametm  Lorem Ipsum dolor sit ametm Lorem Ipsum dolor sit ametm Lorem Ipsum dolor sit ametm Lorem Ipsum dolor sit ametm  Lorem Ipsum dolor sit ametm LoreLorem Ipsum dolor sit ametm Lorem Ipsum dolor sit ametm Lorem Ipsum dolor sit ametm Lorem Ipsum dolor stm Lorem Ipsum dolor sit ametm Lorem Ipsum doletm Lorem Ipsum dolor sit ametm Lorem Ipsum dolor stm  Lorem Ipsum dolor sit ametm Lorem Ipsum dolor sit ametm Lorem Ipsum dolor sit ametm Lorem Ipsum dolor sit ametm  Lorem Ipsum dolor sit ametm Lorem Ipsum dolor sit ametm Lorem Ipsum dolor sit ametm Lorem Ipsum dolor sit ametm  Lorem Ipsum dolor sit ametm Lore</CustomText>
                </View>
                <View>
                    <CustomText style={styles.title}>Terms & Conditions </CustomText>
                    <CustomText style={styles.description}>Lorem Ipsum dolor sit ametm Lorem Ipsum dolor sit ametm Lorem Ipsum dolor sit ametm Lorem Ipsum dolor stm Lorem Ipsum dolor sit ametm Lorem Ipsum doletm Lorem Ipsum dolor sit ametm Lorem Ipsum dolor stm  Lorem Ipsum dolor sit ametm Lorem Ipsum dolor sit ametm Lorem Ipsum dolor sit ametm Lorem Ipsum dolor sit ametm  Lorem Ipsum dolor sit ametm Lorem Ipsum dolor sit ametm Lorem Ipsum dolor sit ametm Lorem Ipsum dolor sit ametm  Lorem Ipsum dolor sit ametm LoreLorem Ipsum dolor sit ametm Lorem Ipsum dolor sit ametm Lorem Ipsum dolor sit ametm Lorem Ipsum dolor stm Lorem Ipsum dolor sit ametm Lorem Ipsum doletm Lorem Ipsum dolor sit ametm Lorem Ipsum dolor stm  Lorem Ipsum dolor sit ametm Lorem Ipsum dolor sit ametm Lorem Ipsum dolor sit ametm Lorem Ipsum dolor sit ametm  Lorem Ipsum dolor sit ametm Lorem Ipsum dolor sit ametm Lorem Ipsum dolor sit ametm Lorem Ipsum dolor sit ametm  Lorem Ipsum dolor sit ametm Lore</CustomText>
                </View>
                <View>
                    <CustomText style={styles.title}>Terms & Conditions </CustomText>
                    <CustomText style={styles.description}>Lorem Ipsum dolor sit ametm Lorem Ipsum dolor sit ametm Lorem Ipsum dolor sit ametm Lorem Ipsum dolor stm Lorem Ipsum dolor sit ametm Lorem Ipsum doletm Lorem Ipsum dolor sit ametm Lorem Ipsum dolor stm  Lorem Ipsum dolor sit ametm Lorem Ipsum dolor sit ametm Lorem Ipsum dolor sit ametm Lorem Ipsum dolor sit ametm  Lorem Ipsum dolor sit ametm Lorem Ipsum dolor sit ametm Lorem Ipsum dolor sit ametm Lorem Ipsum dolor sit ametm  Lorem Ipsum dolor sit ametm LoreLorem Ipsum dolor sit ametm Lorem Ipsum dolor sit ametm Lorem Ipsum dolor sit ametm Lorem Ipsum dolor stm Lorem Ipsum dolor sit ametm Lorem Ipsum doletm Lorem Ipsum dolor sit ametm Lorem Ipsum dolor stm  Lorem Ipsum dolor sit ametm Lorem Ipsum dolor sit ametm Lorem Ipsum dolor sit ametm Lorem Ipsum dolor sit ametm  Lorem Ipsum dolor sit ametm Lorem Ipsum dolor sit ametm Lorem Ipsum dolor sit ametm Lorem Ipsum dolor sit ametm  Lorem Ipsum dolor sit ametm Lore</CustomText>
                </View>
            </ScrollView>

        </View>
    )
}
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
    },
    title: {
        fontFamily: '600',
        fontSize: 16,
        color: "#FF4D67",
        marginTop: 10,
        marginBottom: 8,
    },
    description: {
        fontSize: 12,
        fontWeight: '400'
    },
    containWrapper: {
        width: "100%",
        display: "flex",
    }
})
export default PrivacyPolicy