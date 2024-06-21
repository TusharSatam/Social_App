import { StyleSheet, View } from "react-native"
import CustomText from "../Text/CustomText"
import { typography } from "@social/utils/typography"

interface EmptyMessageProps {
    header?: string; // Header is optional and can be a string
    description?: string; // Description is optional and can be a string
}

const EmptyMessage: React.FC<EmptyMessageProps> = ({ header, description }) => {

    return (
        <View className='flex justify-center items-center w-full py-4'>
            {header && <CustomText style={styles.headerText}>{header}</CustomText>}
            {description && <CustomText style={styles.description}>{description}</CustomText>}
        </View>
    )
}
const styles = StyleSheet.create({
    headerText: {
        fontFamily: typography.sfSemiBold,
        fontSize: 16
    },
    description: {
        fontFamily: typography.sfRegular,
        fontSize: 13,
    }
})

export default EmptyMessage