import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import ShareModal from '../components/ShareModal';
import Icon from 'react-native-vector-icons/MaterialIcons';

const hamburgerIcon = require('../assets/images/hamburger.png');
const shareIcon = require('../assets/images/share.png');

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface Review {
  name: string;
  location: string;
  rating: number;
  text: string;
}

// Service areas from the app
const SERVICE_AREAS = [
  'Nagpur City',
  'Ramtek',
  'Kamptee',
  'Katol',
  'Umred',
  'Kalmeshwar',
  'Narkhed',
  'Mauda',
  'Parseoni',
  'Saoner',
  'Hingna',
  'Kuhi',
  'Bhiwapur',
  'Kapsi',
  'Koradi'
];

// Function to blur customer name (show only first letter, rest as asterisks)
const blurName = (name: string): string => {
  if (!name || name.length === 0) return '***';
  
  const parts = name.trim().split(' ');
  if (parts.length === 0) return '***';
  
  // Show first letter of first name, rest blurred
  const firstName = parts[0];
  const blurredFirstName = firstName.length > 0 
    ? firstName[0] + '*'.repeat(Math.max(2, firstName.length - 1))
    : '***';
  
  // If there's a last name, show first letter blurred
  if (parts.length > 1) {
    const lastName = parts[parts.length - 1];
    const blurredLastName = lastName.length > 0
      ? lastName[0] + '*'.repeat(Math.max(2, lastName.length - 1))
      : '**';
    return `${blurredFirstName} ${blurredLastName}`;
  }
  
  return blurredFirstName;
};

const reviews: Review[] = [
  {
    name: 'Rajesh Kumar',
    location: SERVICE_AREAS[0], // Nagpur City
    rating: 5,
    text: 'Excellent service! The team was professional and completed the work on time. Highly recommended!',
  },
  {
    name: 'Priya Sharma',
    location: SERVICE_AREAS[1], // Ramtek
    rating: 5,
    text: 'Very satisfied with the plumbing service. The technician was knowledgeable and fixed the issue quickly.',
  },
  {
    name: 'Amit Patel',
    location: SERVICE_AREAS[2], // Kamptee
    rating: 5,
    text: 'Great experience with KaamLo. The electrical work was done perfectly and the pricing was fair.',
  },
  {
    name: 'Sunita Devi',
    location: SERVICE_AREAS[0], // Nagpur City
    rating: 5,
    text: 'Outstanding workmanship! The interior design team transformed our home beautifully. Very professional.',
  },
  {
    name: 'Vikram Singh',
    location: SERVICE_AREAS[3], // Katol
    rating: 5,
    text: 'Prompt service and excellent quality. The solar installation was done efficiently. Highly satisfied!',
  },
];

const FeedbackScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { t } = useLanguage();
  const insets = useSafeAreaInsets();
  const [shareModalVisible, setShareModalVisible] = React.useState(false);

  const handleShare = () => {
    setShareModalVisible(true);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Icon
        key={index}
        name={index < rating ? 'star' : 'star-border'}
        size={20}
        color="#fbbf24"
      />
    ));
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.topHeader}>
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => {
              const drawerNavigation = navigation.getParent();
              if (drawerNavigation) {
                drawerNavigation.openDrawer();
              }
            }}
          >
            <Image 
              source={hamburgerIcon} 
              style={styles.hamburgerIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t('localServices')}</Text>
          <TouchableOpacity 
            style={styles.shareButton}
            onPress={handleShare}
          >
            <Image 
              source={shareIcon} 
              style={styles.shareIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={{ paddingBottom: 100 + insets.bottom }}
        >
          <View style={styles.header}>
          <Text style={styles.title}>Feedback</Text>
        </View>
      
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>What Our Customers Say</Text>
          <Text style={styles.subtitle}>
            Read what our satisfied customers have to say about our services
          </Text>

          {reviews.map((review, index) => (
            <View key={index} style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <View style={styles.reviewInfo}>
                  <Text style={styles.reviewName}>{blurName(review.name)}</Text>
                  <Text style={styles.reviewLocation}>{review.location}</Text>
                </View>
                <View style={styles.starsContainer}>
                  {renderStars(review.rating)}
                </View>
              </View>
              <Text style={styles.reviewText}>{review.text}</Text>
            </View>
          ))}
          </View>
        </ScrollView>

        {/* Share Modal */}
        <ShareModal
          visible={shareModalVisible}
          onClose={() => setShareModalVisible(false)}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollView: {
    flex: 1,
  },
  topHeader: {
    backgroundColor: '#ffffff',
    paddingTop: 12,
    paddingBottom: 15,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuButton: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hamburgerIcon: {
    width: 28,
    height: 28,
    tintColor: '#0066CC',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0066CC',
    flex: 1,
    textAlign: 'center',
  },
  shareButton: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareIcon: {
    width: 24,
    height: 24,
    tintColor: '#0066CC',
  },
  scrollContent: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    padding: 20,
    paddingTop: 10,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0066CC',
    textAlign: 'center',
  },
  content: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0066CC',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 20,
  },
  reviewCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  reviewInfo: {
    flex: 1,
  },
  reviewName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  reviewLocation: {
    fontSize: 14,
    color: '#6b7280',
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 2,
  },
  reviewText: {
    fontSize: 15,
    color: '#374151',
    lineHeight: 22,
  },
});

export default FeedbackScreen;

