import React, { useState, useMemo, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
  ActivityIndicator,
  Linking,
  Image,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, Service } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { getAllServicesFromData } from '../utils/getServiceFromData';
import { CONTACT_INFO } from '../constants';
import ServiceTile from '../components/ServiceTile';
import ShareModal from '../components/ShareModal';
import Icon from 'react-native-vector-icons/MaterialIcons';

const hamburgerIcon = require('../assets/images/hamburger.png');
const shareIcon = require('../assets/images/share.png');

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { t, language } = useLanguage();
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [shareModalVisible, setShareModalVisible] = useState(false);

  // Images are now loaded directly from Azure Blob Storage URLs in servicesData.ts

  // Load services from data
  useEffect(() => {
    const loadServices = () => {
      try {
        const allServices = getAllServicesFromData(language);
        setServices(allServices);
        setLoading(false);
        
        // Preload images for better reliability (especially for solar-setup and interior-designs)
        allServices.forEach(service => {
          if (service.tileImage) {
            Image.prefetch(service.tileImage).catch(err => {
              console.warn(`[HomeScreen] Failed to preload image for ${service.id}:`, err);
            });
          }
        });
      } catch (error) {
        console.error('Error loading services:', error);
        setLoading(false);
      }
    };
    loadServices();
  }, [language]);

  const filteredServices = useMemo(() => {
    if (!searchQuery.trim()) {
      return services;
    }
    const query = searchQuery.toLowerCase();
    return services.filter(
      (service) =>
        service.name.toLowerCase().includes(query) ||
        service.description.toLowerCase().includes(query)
    );
  }, [services, searchQuery]);

  const renderService = ({ item }: { item: Service }) => (
    <ServiceTile 
      service={item}
      onPress={() => navigation.navigate('ServiceDetails', { serviceId: item.id as any })} 
    />
  );

  const handleShare = () => {
    setShareModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
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

      {/* Banner Section */}
      <View style={styles.banner}>
        <Text style={styles.bannerSubtitle}>{t('bannerSubtitle')}</Text>
        <Text style={styles.bannerTitle}>
          {t('bannerTitle')}{' '}
          <Text style={styles.bannerTitleHighlight}>{t('bannerTitleHighlight')}</Text>
        </Text>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>18+</Text>
            <Text style={styles.statLabel}>{t('bannerServices')}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>100%</Text>
            <Text style={styles.statLabel}>{t('bannerSatisfaction')}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>24/7</Text>
            <Text style={styles.statLabel}>{t('bannerSupport')}</Text>
          </View>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#6b7280" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder={t('searchPlaceholder')}
          placeholderTextColor="#9ca3af"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Icon name="close" size={20} color="#6b7280" />
          </TouchableOpacity>
        )}
      </View>

      {/* Services Grid */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0066CC" />
          <Text style={styles.loadingText}>{t('loadingImages')}</Text>
        </View>
      ) : filteredServices.length > 0 ? (
        <FlatList
          data={filteredServices}
          renderItem={renderService}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={[styles.servicesGrid, { paddingBottom: 100 + insets.bottom }]}
          columnWrapperStyle={styles.row}
          style={styles.flatList}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Icon name="search-off" size={64} color="#9ca3af" />
          <Text style={styles.emptyText}>{t('noServicesFound')}</Text>
        </View>
      )}

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
  header: {
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
    tintColor: '#0066CC', // Professional blue to match theme
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
    tintColor: '#0066CC', // Professional blue to match theme
  },
  banner: {
    backgroundColor: '#ffffff',
    padding: 16,
    paddingTop: 8,
    alignItems: 'center',
  },
  bannerSubtitle: {
    fontSize: 10,
    color: '#6b7280',
    fontWeight: '600',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  bannerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0066CC',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 24,
  },
  bannerTitleHighlight: {
    color: '#fbbf24',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 8,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fbbf24',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 9,
    color: '#0066CC',
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    margin: 16,
    marginTop: 12,
    marginBottom: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    minHeight: 44,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#111827',
    paddingVertical: 0,
  },
  flatList: {
    flex: 1,
  },
  servicesGrid: {
    padding: 6,
    paddingBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
    paddingHorizontal: 2,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#6b7280',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
  },
});

export default HomeScreen;

