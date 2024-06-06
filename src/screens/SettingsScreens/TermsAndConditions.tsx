import { useNavigation } from '@react-navigation/native';
import ScreenHeader from '@social/components/ScreenHeader/ScreenHeader';
import CustomText from '@social/components/Text/CustomText';
import { ScrollView, StyleSheet, View } from 'react-native';

const TermsAndConditions = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.mainContainer}>
            <ScreenHeader headerName='Terms and Conditions' navigation={navigation} />
            <ScrollView style={styles.containWrapper}>

                <View>
                    <CustomText style={styles.subTitle}>1. Introduction</CustomText>
                    <CustomText style={styles.description}>
                        Welcome to Voodle, a social media platform designed for sharing reels. By using our platform, you agree to be bound by these terms and conditions (the "Terms"). Voodle is a platform that allows users to create, share, and discover short videos. We reserve the right to modify or update these Terms at any time, so please review them frequently. If you do not agree to any changes, please discontinue using the platform.
                    </CustomText>
                </View>
                <View>
                    <CustomText style={styles.subTitle}>2. Eligibility</CustomText>
                    <CustomText style={styles.description}>
                        To use Voodle, you must be at least 13 years old. By using the platform, you represent and warrant that you are at least 13 years old and that you have the right, authority, and capacity to enter into these Terms.
                    </CustomText>
                </View>
                <View>
                    <CustomText style={styles.subTitle}>3. Content Guidelines</CustomText>
                    <CustomText style={styles.description}>
                        Voodle is a platform that is intended for users to share their creative and original content. The following types of content are not allowed on Voodle:
                        {"\n"}• Copyrighted content: You cannot upload videos that you do not have the rights to. All videos must be original and created by you.
                        {"\n"}• Hate speech: Voodle does not tolerate content that promotes hate speech, violence, or discrimination against individuals or groups based on race, ethnicity, gender, religion, or sexual orientation.
                        {"\n"}• Graphic or violent content: Voodle does not allow content that is graphically violent, gory, or disturbing.
                        {"\n"}• Inappropriate content: Voodle does not allow content that is inappropriate, offensive, or explicit in nature.
                        {"\n"}• Spam or phishing: Voodle does not allow content that is intended to manipulate or disrupt the platform's functionality or that attempts to solicit personal information from users.
                    </CustomText>
                </View>
                <View>
                    <CustomText style={styles.subTitle}>4. Intellectual Property</CustomText>
                    <CustomText style={styles.description}>
                        By uploading content to Voodle, you grant us a worldwide, royalty-free, non-exclusive, sublicensable, and transferable license to use, reproduce, distribute, prepare derivative works of, display, and perform the user submissions in connection with the Voodle platform and Voodle's (and its successors' and affiliates') business, including for promoting and redistributing the Voodle platform. You also agree to waive any moral rights you may have in the user submissions.
                    </CustomText>
                </View>
                <View>
                    <CustomText style={styles.subTitle}>5. Account Termination</CustomText>
                    <CustomText style={styles.description}>
                        Voodle reserves the right to terminate or suspend your account at any time, without notice, for any reason, including, but not limited to, violation of these Terms, infringement of intellectual property rights, or other illegal activities. In the event of termination, your access to the platform will be terminated, and you will not be able to access your account or any content that you have uploaded.
                    </CustomText>
                </View>
                <View>
                    <CustomText style={styles.subTitle}>6. Content Moderation</CustomText>
                    <CustomText style={styles.description}>
                        Voodle reserves the right to remove any content that violates these terms and conditions or that is deemed inappropriate or offensive. Voodle also reserves the right to terminate the account of any user who repeatedly violates these terms and conditions.
                    </CustomText>
                </View>
                <View>
                    <CustomText style={styles.subTitle}>7. Privacy</CustomText>
                    <CustomText style={styles.description}>
                        Voodle respects your privacy and will not share your personal information with third parties without your consent, except as required by law. However, please be aware that any content you post or share on Voodle may be visible to other users and may be shared or reproduced by them.
                    </CustomText>
                </View>
                <View>
                    <CustomText style={styles.subTitle}>8. Warranty Disclaimer</CustomText>
                    <CustomText style={styles.description}>
                        Voodle provides the platform on an "as is" and "as available" basis. Voodle does not warrant that the platform will be error-free, and uninterrupted, or that it will meet your specific requirements. Voodle disclaims all warranties, either express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, and non-infringement.
                    </CustomText>
                </View>
                <View>
                    <CustomText style={styles.subTitle}>9. Limitation of Liability</CustomText>
                    <CustomText style={styles.description}>
                        In no event will Voodle be liable for any damages, including, but not limited to, incidental, consequential, or punitive damages, arising out of the use or inability to use the platform, whether based on breach of contract, tort (including negligence), or otherwise. Voodle's liability to you shall be limited to the amount, if any, that you have paid to Voodle for the use of the platform.
                    </CustomText>
                </View>
                <View>
                    <CustomText style={styles.subTitle}>10. Governing Law and Jurisdiction</CustomText>
                    <CustomText style={styles.description}>
                        These Terms shall be governed by and construed in accordance with the laws of the Republic of India. Any disputes arising out of or related to these Terms shall be resolved through binding arbitration, in accordance with the rules of the Indian Arbitration & Conciliation Act, 1996 and in accordance with the rules of the Indian Council of Arbitration. The courts in New Delhi, India shall have exclusive jurisdiction over any disputes arising out of or related to these Terms.
                    </CustomText>
                </View>
                <View>
                    <CustomText style={styles.subTitle}>11. Entire Agreement</CustomText>
                    <CustomText style={styles.description}>
                        These Terms constitute the entire agreement between you and Voodle regarding your use of the platform and supersede all prior or contemporaneous agreements, whether written or oral. Any waiver of any provision of these Terms shall be effective only if in writing and signed by an authorized representative of Voodle.
                    </CustomText>
                </View>
                <View>
                    <CustomText style={styles.subTitle}>12. Changes to Terms</CustomText>
                    <CustomText style={styles.description}>
                        Voodle reserves the right to modify or update these Terms at any time, so please review them frequently.
                    </CustomText>
                </View>
                <View>
                    <CustomText style={styles.subTitle}>Acknowledgement</CustomText>
                    <CustomText style={styles.description}>
                        By using Voodle, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree to these Terms, please do not use the platform.
                    </CustomText>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
    },
    title: {
        fontFamily: '600',
        fontSize: 16,
        marginTop: 10,
        marginBottom: 8,
    },
    subTitle: {
        color: "#FF4D67",
        fontFamily: '600',
        fontSize: 16,
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
});

export default TermsAndConditions;
