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
            question: 'Is this social media app free to use?',
            answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, set do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            expanded: true,
            category: 'General',
        },
        { question: 'How can I unfollow a user?', answer: 'Answer to this question.', expanded: false, category: 'Services' },
        { question: 'How can I stay updated on new features?', answer: 'Answer to this question.', expanded: false, category: 'General' },
        { question: 'How can I verify my account on this app?', answer: 'Answer to this question.', expanded: false, category: 'Accounts' },
        { question: 'How do I contact customer support?', answer: 'Answer to this question.', expanded: false, category: 'Services' },
        { question: 'What if I encounter technical problems?', answer: 'Answer to this question.', expanded: false, category: 'General' },
        { question: 'How to add app review?', answer: 'Answer to this question.', expanded: false, category: 'Accounts' },
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
                {filteredData.length === 0 ? (
                    <View style={styles.noResultsContainer}>
                        <CustomText style={styles.noResultsText}>No results found.</CustomText>
                    </View>
                ) : (
                    filteredData.map((item, index) => (
                        <View key={index}>
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
                    ))
                )}
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
            indicatorStyle={{ backgroundColor: '#FF4D67' }}
            style={{ backgroundColor: 'white' }}
            renderLabel={({ route, focused }) => (
                <CustomText style={{ color: focused ? '#FF4D67' : '#999', margin: 8, fontWeight: '500' }}>
                    {route.title}
                </CustomText>
            )}
        />
    );

    return (
        <View style={styles.mainContainer}>
            <ScreenHeader headerName='Help Center' navigation={navigation} />
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
        borderRadius: 8,
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
        color: '#797979'
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    tabButton: {
        borderRadius: 20,
        backgroundColor: '#F5F5F5',
    },
    activeTabButton: {
        backgroundColor: '#FF4D67',
    },
    tabButtonText: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        color: '#999',
        fontSize: 14,
        fontWeight: '500',
    },
    activeTabButtonText: {
        color: '#fff',
    },
    faqContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
    },
    faqQuestion: {
        fontSize: 16,
        fontWeight: '500',
    },
    faqAnswerContainer: {
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
    },
    faqAnswer: {
        fontSize: 14,
        color: '#666',
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
    },
    contactCardContent: {
        marginTop: 10,
    },
    contactCardEmail: {
        fontSize: 12,
        fontWeight: 400,
        color: '#FF4D67',
    },
});

export default HelpCenter;
