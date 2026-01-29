import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Image,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { CONTACT_INFO } from '../constants';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ShareModal from '../components/ShareModal';

const hamburgerIcon = require('../assets/images/hamburger.png');
const shareIcon = require('../assets/images/share.png');

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const AboutUsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { t } = useLanguage();
  const insets = useSafeAreaInsets();
  const [shareModalVisible, setShareModalVisible] = React.useState(false);

  const handleShare = () => {
    setShareModalVisible(true);
  };

  const handlePhonePress = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };

  const handleEmailPress = () => {
    Linking.openURL(`mailto:${CONTACT_INFO.email}`);
  };

  const handleWebsitePress = () => {
    Linking.openURL('https://kaamlo.com');
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
          {/* About Us Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>About Us</Text>
          <Text style={styles.cardText}>
            KaamLo is your trusted partner for all home and business service needs. 
            We provide professional, reliable, and affordable services with a team of 
            skilled professionals committed to delivering excellence in every project.
          </Text>
        </View>

        {/* Contact Information Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Book a Service</Text>
          
          {/* Main Office */}
          <TouchableOpacity 
            style={styles.contactItem}
            onPress={() => handlePhonePress(CONTACT_INFO.phone)}
          >
            <View style={[styles.iconCircle, styles.phoneIcon]}>
              <Icon name="phone" size={24} color="#ffffff" />
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactLabel}>{t('mainOffice').toUpperCase()}</Text>
              <Text style={styles.contactValue}>{CONTACT_INFO.phone}</Text>
            </View>
          </TouchableOpacity>

          {/* Emergency */}
          <TouchableOpacity 
            style={styles.contactItem}
            onPress={() => handlePhonePress(CONTACT_INFO.emergencyPhone)}
          >
            <View style={[styles.iconCircle, styles.emergencyIcon]}>
              <Icon name="local-hospital" size={24} color="#ffffff" />
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactLabel}>{t('emergency').toUpperCase()}</Text>
              <Text style={styles.contactValue}>{CONTACT_INFO.emergencyPhone}</Text>
            </View>
          </TouchableOpacity>

          {/* Support */}
          <TouchableOpacity 
            style={styles.contactItem}
            onPress={() => handlePhonePress(CONTACT_INFO.supportPhone)}
          >
            <View style={[styles.iconCircle, styles.supportIcon]}>
              <Icon name="headset-mic" size={24} color="#ffffff" />
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactLabel}>{t('support').toUpperCase()}</Text>
              <Text style={styles.contactValue}>{CONTACT_INFO.supportPhone}</Text>
            </View>
          </TouchableOpacity>

          {/* Email */}
          <TouchableOpacity 
            style={styles.contactItem}
            onPress={handleEmailPress}
          >
            <View style={[styles.iconCircle, styles.emailIcon]}>
              <Icon name="email" size={24} color="#ffffff" />
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactLabel}>{t('business').toUpperCase()}</Text>
              <Text style={styles.contactValue}>{CONTACT_INFO.email}</Text>
            </View>
          </TouchableOpacity>

          {/* Website */}
          <TouchableOpacity 
            style={styles.contactItem}
            onPress={handleWebsitePress}
          >
            <View style={[styles.iconCircle, styles.websiteIcon]}>
              <Icon name="public" size={24} color="#ffffff" />
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactLabel}>WEBSITE</Text>
              <Text style={styles.contactValue}>www.kaamlo.com</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Our Services Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Our Services</Text>
          <Text style={styles.cardText}>
            We offer a comprehensive range of professional services to meet all your 
            home and business needs. Our expert team is equipped to handle projects of 
            any size, from small repairs to complete renovations.
          </Text>
          <View style={styles.servicesList}>
            <Text style={styles.serviceItem}>• Interior Design - Transform your spaces with creative and functional designs</Text>
            <Text style={styles.serviceItem}>• Plumbing - Expert installation, repair, and maintenance services</Text>
            <Text style={styles.serviceItem}>• Electrical Work - Safe and reliable electrical solutions</Text>
            <Text style={styles.serviceItem}>• Construction - Complete building and renovation services</Text>
            <Text style={styles.serviceItem}>• And many more professional services...</Text>
          </View>
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
  content: {
    padding: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0066CC',
    marginBottom: 12,
  },
  cardText: {
    fontSize: 15,
    color: '#374151',
    lineHeight: 22,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  phoneIcon: {
    backgroundColor: '#10b981',
  },
  supportIcon: {
    backgroundColor: '#0066CC',
  },
  emergencyIcon: {
    backgroundColor: '#0066CC',
  },
  emailIcon: {
    backgroundColor: '#8b5cf6',
  },
  websiteIcon: {
    backgroundColor: '#f59e0b',
  },
  contactInfo: {
    flex: 1,
  },
  contactLabel: {
    fontSize: 12,
    color: '#9ca3af',
    fontWeight: '600',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  contactValue: {
    fontSize: 16,
    color: '#0066CC',
    fontWeight: 'bold',
  },
  servicesList: {
    marginTop: 12,
  },
  serviceItem: {
    fontSize: 15,
    color: '#374151',
    lineHeight: 24,
    marginBottom: 8,
  },
});

export default AboutUsScreen;

