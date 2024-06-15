import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView,
    LayoutAnimation,
    UIManager,
    Platform,
    Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import PagerView from 'react-native-pager-view';
import { useNavigation } from '@react-navigation/native';
import CustomText from '@social/components/Text/CustomText';
import ScreenHeader from '@social/components/ScreenHeader/ScreenHeader';
import SearchHelpIcon from '@social/components/SvgIcons/HelpCenter/SearchHelpIcon';
import ContactUsIcon from '@social/components/SvgIcons/SettingScreenIcons/ContactUsIcon';
import Dot from '@social/components/SvgIcons/SettingScreenIcons/Dot';
import { typography } from '@social/utils/typography';

if (
    Platform.OS === 'android' &&
    UIManager.setLayoutAnimationEnabledExperimental
) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const HelpCenter = () => {
    const [expanded, setExpanded] = useState(false);

    const navigation = useNavigation();
    const [index, setIndex] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchText, setSearchText] = useState('');
    const [routes] = useState([
        { key: 'faqs', title: 'FAQs' },
        { key: 'contact', title: 'Contact Us' },
    ]);

    const [faqData, setFaqData] = useState([
        {
            question: 'What is Voodle?',
            answer: 'Voodle is a social media platform that allows users to share short reels and videos, connect with friends, discover new content, and engage with a global community.',
            expanded: true,
            category: 'General',
        },
        { question: 'How do I adjust my privacy settings on Voodle?', answer: 'Go to your profile, tap the three lines (menu) icon, select "Settings," and then navigate to "Privacy." Here, you can adjust who can see your posts, send you messages, and follow you.', expanded: false, category: 'General' },
        { question: 'What should I do if I encounter inappropriate content?', answer: `If you come across content that violates Voodle's community guidelines, tap the three dots (menu) icon on the post, and select "Report." You can also block or mute users who share inappropriate content.`, expanded: false, category: 'General' },

        {
            question: 'How can I upload a video or reel on Voodle?', answer: `
Tap the "+" button at the bottom of the screen, select or record a video, add effects, music, or filters, and then tap "Post" to share it with your followers and the Voodle community.`, expanded: false, category: 'Services'
        },
        { question: 'What video formats and lengths are supported?', answer: 'Voodle supports most common video formats including MP4, MOV, and AVI. Videos can be up to 60 seconds long.', expanded: false, category: 'Services' },
        { question: 'How do I find and follow other users on Voodle?', answer: 'You can search for users by their username using the search bar, browse through the Discover tab, or connect with suggested friends based on your contacts or social media connections. Tap "Follow" on a user’s profile to start following them.', expanded: false, category: 'Services' },
        {
            question: 'How do I interact with other users’ videos?', answer: `You can like, comment on, and share other users’ videos by tapping the respective icons below each video. To send a video directly to a friend, tap the share icon and choose the recipient.
`, expanded: false, category: 'Services'
        },
        { question: 'How does Voodle recommend videos to me?', answer: `Voodle uses an algorithm that considers your interactions, such as videos you've liked, shared, and commented on, as well as your follows, to recommend content that matches your interests.`, expanded: false, category: 'Services' },
        { question: 'Is there a way to save videos for offline viewing?', answer: `Currently, Voodle does not support offline viewing. However, you can save videos to your profile by tapping the bookmark icon to watch them later within the app.`, expanded: false, category: 'Accounts' },


        { question: 'How do I create an account on Voodle?', answer: 'To create an account, download the Voodle app from the App Store or Google Play Store, open the app, and follow the on-screen instructions to sign up using your email address or phone number.', expanded: false, category: 'Accounts' },
        { question: 'What do I do if I forget my password?', answer: 'If you forget your password, tap "Forgot Password?" on the login screen and follow the instructions to reset it via email or SMS.', expanded: false, category: 'Accounts' },
        { question: 'How can I contact Voodle support?', answer: `For any issues or questions, you can contact Voodle support by navigating to the "Help & Feedback" section in the app's settings or by emailing support@voodle.com.`, expanded: false, category: 'Accounts' },

    ]);

    const toggleExpandCustomerService = () => {
        setExpanded(!expanded);
    };
    const handleEmailPress = () => {
        Linking.openURL('mailto:voodle@reply.com');
    };
    const toggleExpand = (index: number) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        const newData = faqData.map((item, i) => {
            if (i === index) {
                return { ...item, expanded: !item.expanded };
            }
            return item;
        });
        setFaqData(newData);
    };

    const filterFaqData = () => {
        const filteredByCategory = selectedCategory === 'All' ? faqData : faqData.filter(item => item.category === selectedCategory);
        if (!searchText.trim()) {
            return filteredByCategory;
        }
        return filteredByCategory.filter(item =>
            item.question.toLowerCase().includes(searchText.toLowerCase()) ||
            item.answer.toLowerCase().includes(searchText.toLowerCase())
        );
    };

    const FaqsRoute = () => {
        const filteredData = filterFaqData();

        return (
            <ScrollView style={styles.container}>
                <View style={styles.tabContainer}>
                    <TouchableOpacity
                        style={[
                            styles.tabButton,
                            selectedCategory === 'All' && styles.activeTabButton,
                        ]}
                        onPress={() => setSelectedCategory('All')}
                    >
                        <CustomText style={[
                            styles.tabButtonText,
                            selectedCategory === 'All' && styles.activeTabButtonText,
                        ]}>All</CustomText>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.tabButton,
                            selectedCategory === 'Services' && styles.activeTabButton,
                        ]}
                        onPress={() => setSelectedCategory('Services')}
                    >
                        <CustomText style={[
                            styles.tabButtonText,
                            selectedCategory === 'Services' && styles.activeTabButtonText,
                        ]}>Services</CustomText>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.tabButton,
                            selectedCategory === 'General' && styles.activeTabButton,
                        ]}
                        onPress={() => setSelectedCategory('General')}
                    >
                        <CustomText style={[
                            styles.tabButtonText,
                            selectedCategory === 'General' && styles.activeTabButtonText,
                        ]}>General</CustomText>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.tabButton,
                            selectedCategory === 'Accounts' && styles.activeTabButton,
                        ]}
                        onPress={() => setSelectedCategory('Accounts')}
                    >
                        <CustomText style={[
                            styles.tabButtonText,
                            selectedCategory === 'Accounts' && styles.activeTabButtonText,
                        ]}>Accounts</CustomText>
                    </TouchableOpacity>
                </View>
                <View style={styles.ContentContainer}>
                    {filteredData.length === 0 ? (
                        <View style={styles.noResultsContainer}>
                            <CustomText style={styles.noResultsText}>No results found.</CustomText>
                        </View>
                    ) : (
                        <View style={styles.FAQsWrapper}>
                            {filteredData.map((item, index) => (
                                <View key={index} style={styles.FAQWrap}>
                                    <TouchableOpacity
                                        style={styles.faqContainer}
                                        onPress={() => toggleExpand(index)}
                                    >
                                        <CustomText style={styles.faqQuestion}>{item.question}</CustomText>
                                        <Icon name={item.expanded ? 'chevron-up' : 'chevron-down'} size={20} color="#FF4D67" />
                                    </TouchableOpacity>
                                    {item.expanded && (
                                        <View style={styles.faqAnswerContainer}>
                                            <CustomText style={styles.faqAnswer}>{item.answer}</CustomText>
                                        </View>
                                    )}
                                </View>
                            ))}
                        </View>

                    )}
                </View>
            </ScrollView>
        );
    };

    const ContactRoute = () => (
        <View style={styles.container}>
            <TouchableOpacity style={styles.contactCard} onPress={toggleExpandCustomerService}>
                <View style={styles.contactCardHeader}>
                    <ContactUsIcon />
                    <CustomText style={styles.contactCardTitle}>Customer Service</CustomText>
                    <Icon name={expanded ? "chevron-up" : "chevron-down"} size={20} color="#FF4D67" />
                </View>
                {expanded && (
                    <TouchableOpacity style={styles.contactCardContent} className='ml-6' onPress={handleEmailPress}>
                        <CustomText style={styles.contactCardEmail}> <Dot />   voodle@reply.com</CustomText>
                    </TouchableOpacity>
                )}
            </TouchableOpacity>
        </View>

    );

    const renderScene = SceneMap({
        faqs: FaqsRoute,
        contact: ContactRoute,
    });

    const renderTabBar = (props: any) => (
        <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: '#FF4D67',height:3,borderTopRightRadius:8,borderTopLeftRadius:8 }}
            style={{ backgroundColor: 'white' }}
            renderLabel={({ route, focused }) => (
                <CustomText style={{ color: focused ? '#FF4D67' : '#999', margin: 8, fontWeight: typography.sfMedium }}>
                    {route.title}
                </CustomText>
            )}
        />
    );

    return (
        <View style={styles.mainContainer}>
            <ScreenHeader headerName='Help Center'  />
            <View style={styles.searchContainer}>
                <SearchHelpIcon />
                <TextInput
                    placeholder="Search"
                    style={styles.searchInput}
                    placeholderTextColor={"#797979"}
                    value={searchText}
                    onChangeText={setSearchText}
                />
            </View>
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: '100%', marginBottom: 12 }}
                renderTabBar={renderTabBar}
                renderPager={(props) => <PagerView {...props} />}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 16
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
        justifyContent: 'center',
        position: 'relative',
    },
    backArrow: {
        position: 'absolute',
        left: 16,
    },
    headerText: {
        fontSize: 18,
        fontWeight: '600',
    },
    container: {
        flex: 1,
        marginTop: 24,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginVertical: 12,
        height: 42,
    },
    searchInput: {
        flex: 1,
        paddingVertical: 8,
        paddingHorizontal: 10,
        fontSize: 15,
        fontWeight: "400",
        color: '#242424'
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    fontMedium:{
        fontFamily: typography.sfMedium
    },
    tabButton: {
        borderRadius: 20,
        backgroundColor: '#F5F5F5',
        fontFamily: typography.sfRegular
    },
    activeTabButton: {
        backgroundColor: '#FF4D67',
        fontFamily: typography.sfMedium
    },
    tabButtonText: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        color: '#999',
        fontSize: 14,
        fontWeight: '500',
        fontFamily: typography.sfRegular
    },
    activeTabButtonText: {
        color: '#fff',
        fontFamily: typography.sfMedium
    },
    faqContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // paddingVertical: 12,
        // borderBottomWidth: 1,
        // borderBottomColor: '#E5E5E5',
        width: "100%",
    },
    FAQsWrapper: {
        display: "flex",
        gap: 12,
    },
    FAQWrap: {
        borderColor: "#F1F1F1",
        borderWidth: 1,
        padding: 12,
        borderRadius: 10,
    },
    ContentContainer: {
        marginBottom: 99,
    },
    faqQuestion: {
        fontSize: 16,
        fontWeight: '600',
        width: "90%",
        fontFamily: typography.sfSemiBold,
        color: "#242424"
    },
    faqAnswerContainer: {
        paddingVertical: 12,
        // borderBottomWidth: 1,
        // borderBottomColor: '#E5E5E5',
        borderTopWidth: 1,
        borderTopColor: '#E5E5E5',
        marginTop: 10,
    },
    faqAnswer: {
        fontSize: 14,
        color: '#666',
        fontFamily: typography.sfRegular,
    },
    noResultsContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    noResultsText: {
        fontSize: 16,
        color: '#666',
    },
    contactCard: {
        backgroundColor: '#FFF',
        borderRadius: 10,
        padding: 16,
        marginVertical: 12,
        borderWidth: 1,
        borderColor: '#F1F1F1',
    },
    contactCardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    contactCardTitle: {
        fontSize: 12,
        fontWeight: '600',
        color: '#333',
        flex: 1,
        marginLeft: 8,
        fontFamily:typography.sfSemiBold,
    },
    contactCardContent: {
        marginTop: 10,
    },
    contactCardEmail: {
        fontSize: 12,
        fontWeight: 400,
        color: '#FF4D67',
        fontFamily:typography.sfRegular,
    },
});

export default HelpCenter;
