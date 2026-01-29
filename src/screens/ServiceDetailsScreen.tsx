import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Image,
  ActivityIndicator,
  Modal,
  Dimensions,
  ImageSourcePropType,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { RootStackParamList, Service } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { getServiceFromData } from '../utils/getServiceFromData';
import { CONTACT_INFO, NO_IMAGE } from '../constants';
import { useFieldWorkImages } from '../hooks/useFieldWorkImages';
import ShareModal from '../components/ShareModal';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FAQSection from '../components/FAQSection';
import ServiceAreaSection from '../components/ServiceAreaSection';
import WebsiteShowcase from '../components/WebsiteShowcase';

const shareIcon: ImageSourcePropType = require('../assets/images/share.png');

type ServiceDetailsRouteProp = RouteProp<RootStackParamList, 'ServiceDetails'>;
const { width } = Dimensions.get('window');

const ServiceDetailsScreen: React.FC = () => {
  const route = useRoute<ServiceDetailsRouteProp>();
  const navigation = useNavigation();
  const { serviceId } = route.params;
  const { t, language } = useLanguage();
  const insets = useSafeAreaInsets();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [shareModalVisible, setShareModalVisible] = useState(false);

  // Fetch field work images using hook (matches web app logic)
  // Now uses service ID instead of assetFolder URL
  const { images: fieldWorkImages, loading: fieldWorkLoading } = useFieldWorkImages(serviceId);


  useEffect(() => {
    const loadService = () => {
      try {
        const loadedService = getServiceFromData(serviceId, language);
        setService(loadedService);
        setLoading(false);
      } catch (error) {
        console.error('Error loading service:', error);
        setLoading(false);
      }
    };
    loadService();
  }, [serviceId, language]);


  const handleCall = () => {
    const phone = service?.contact?.phone || CONTACT_INFO.phone;
    Linking.openURL(`tel:${phone}`);
  };

  const handleEmail = () => {
    const email = service?.contact?.email || CONTACT_INFO.email;
    Linking.openURL(`mailto:${email}`);
  };

  // Combine service images and field work images for the modal
  const allImages = useMemo(() => {
    return [...(service?.images || []), ...fieldWorkImages];
  }, [service?.images, fieldWorkImages]);

  const handleImagePress = (index: number) => {
    setSelectedImageIndex(index);
  };

  const handleCloseImage = () => {
    setSelectedImageIndex(null);
  };

  const handlePreviousImage = () => {
    if (selectedImageIndex !== null && selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  };

  const handleNextImage = () => {
    if (selectedImageIndex !== null && selectedImageIndex < allImages.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0066CC" />
          <Text style={styles.loadingText}>{t('loadingImages')}</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!service) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text style={styles.errorText}>{t('serviceNotFound')}</Text>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>{t('goToHome')}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const selectedImage = selectedImageIndex !== null && selectedImageIndex < allImages.length 
    ? allImages[selectedImageIndex] 
    : null;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        {/* Top Navigation Bar */}
        <View style={styles.topNavBar}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButtonNav}>
            <Icon name="arrow-back" size={24} color="#0066CC" />
            <Text style={styles.backTextNav}>Back</Text>
          </TouchableOpacity>
          <Text style={styles.navTitle}>{service.name}</Text>
          <TouchableOpacity 
            onPress={() => setShareModalVisible(true)}
            style={styles.shareButtonNav}
          >
            <Image 
              source={shareIcon} 
              style={styles.shareIconNav}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        {/* Service Description */}
        <View style={styles.serviceDescriptionContainer}>
          <Text style={styles.serviceDescription}>{service.description}</Text>
        </View>

        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={[styles.scrollContent, { paddingBottom: 100 + insets.bottom }]}
        >
          {/* Our Work Images */}
        {service.images && service.images.length > 0 && (
          <View style={[styles.section, styles.firstSection]}>
            <Text style={styles.sectionTitle}>{t('ourWork')}</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imagesScroll}>
              {service.images.map((image, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.imageWrapper}
                  onPress={() => handleImagePress(index)}
                >
                  <Image
                    source={{ uri: image }}
                    style={styles.workImage}
                    resizeMode="cover"
                    onError={() => {
                      console.warn('Failed to load work image:', image);
                    }}
                  />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {/* What We Do Section */}
        {service.whatWeDo && service.whatWeDo.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t('whatWeDo')}</Text>
            {service.whatWeDo.map((item, index) => (
              <View key={index} style={styles.listItem}>
                <Icon name="check-circle" size={20} color="#10b981" style={styles.checkIcon} />
                <Text style={styles.listItemText}>{item}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Field Work Section */}
        {service.id !== 'websites-mobile-app-development' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t('fieldWork')}</Text>
            {fieldWorkLoading ? (
              <View style={styles.fieldWorkLoading}>
                <ActivityIndicator size="small" color="#0066CC" />
                <Text style={styles.fieldWorkLoadingText}>{t('loadingImages')}</Text>
              </View>
            ) : fieldWorkImages.length > 0 ? (
              <View style={styles.fieldWorkGrid}>
                {fieldWorkImages.map((image, index) => (
                  <TouchableOpacity
                    key={`${image}-${index}`}
                    style={styles.fieldWorkImageWrapper}
                    onPress={() => {
                      // Set selected image index for modal
                      const fieldWorkStartIndex = service.images?.length || 0;
                      setSelectedImageIndex(fieldWorkStartIndex + index);
                    }}
                  >
                    <Image
                      source={{ uri: image }}
                      style={styles.fieldWorkImage}
                      resizeMode="cover"
                      onError={(error) => {
                        console.error(`[ServiceDetails] Failed to load field work image ${index}:`, image);
                      }}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            ) : (
              <View style={styles.noImagesContainer}>
                <Icon name="image" size={48} color="#9ca3af" />
                <Text style={styles.noImagesText}>{t('noImagesAvailable')}</Text>
              </View>
            )}
          </View>
        )}

        {/* Website Showcase (for website development service) */}
        {service.id === 'websites-mobile-app-development' && service.websites && (
          <WebsiteShowcase websites={service.websites} />
        )}

        {/* Service Area */}
        {service.serviceArea && service.serviceArea.length > 0 && (
          <ServiceAreaSection areas={service.serviceArea} />
        )}

          {/* FAQ Section */}
          {service.faq && service.faq.length > 0 && (
            <FAQSection faqs={service.faq} />
          )}
        </ScrollView>

        {/* Fixed Contact Buttons at Bottom */}
        <View style={[styles.contactSectionFixed, { paddingBottom: insets.bottom }]}>
          <TouchableOpacity 
            style={[styles.contactButtonFixed, { backgroundColor: '#10b981' }]} 
            onPress={handleCall}
          >
            <Icon name="phone" size={18} color="#ffffff" />
            <Text style={styles.contactButtonTextFixed}>{t('callUs')}</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.contactButtonFixed, { backgroundColor: '#0066CC' }]} 
            onPress={handleEmail}
          >
            <Icon name="email" size={18} color="#ffffff" />
            <Text style={styles.contactButtonTextFixed}>{t('mailUs')}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Image Modal */}
      <Modal
        visible={selectedImageIndex !== null}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCloseImage}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.modalCloseButton} onPress={handleCloseImage}>
            <Icon name="close" size={30} color="#ffffff" />
          </TouchableOpacity>
          
          {/* Previous Button */}
          {selectedImageIndex !== null && selectedImageIndex > 0 && (
            <TouchableOpacity 
              style={styles.modalNavButton} 
              onPress={handlePreviousImage}
            >
              <Icon name="chevron-left" size={40} color="#ffffff" />
            </TouchableOpacity>
          )}

          {/* Next Button */}
          {selectedImageIndex !== null && selectedImageIndex < allImages.length - 1 && (
            <TouchableOpacity 
              style={[styles.modalNavButton, styles.modalNavButtonRight]} 
              onPress={handleNextImage}
            >
              <Icon name="chevron-right" size={40} color="#ffffff" />
            </TouchableOpacity>
          )}

          {selectedImage && (
            <Image
              source={{ uri: selectedImage }}
              style={styles.modalImage}
              resizeMode="contain"
            />
          )}

          {/* Image Counter */}
          {selectedImageIndex !== null && (
            <View style={styles.imageCounter}>
              <Text style={styles.imageCounterText}>
                {selectedImageIndex + 1} / {allImages.length}
              </Text>
            </View>
          )}
        </View>
      </Modal>

      {/* Share Modal */}
      <ShareModal
        visible={shareModalVisible}
        onClose={() => setShareModalVisible(false)}
        serviceName={service.name}
      />
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
  topNavBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: '#ffffff',
  },
  serviceDescriptionContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    backgroundColor: '#ffffff',
  },
  serviceDescription: {
    fontSize: 16,
    color: '#6b7280',
    lineHeight: 24,
    textAlign: 'left',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  backButtonNav: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  backTextNav: {
    fontSize: 16,
    color: '#0066CC',
    fontWeight: '500',
  },
  navTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0066CC',
    textAlign: 'center',
    marginHorizontal: 16,
  },
  shareButtonNav: {
    padding: 4,
  },
  shareIconNav: {
    width: 24,
    height: 24,
    tintColor: '#0066CC',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#6b7280',
  },
  contactSectionFixed: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    padding: 12,
    gap: 12,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  contactButtonFixed: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    gap: 8,
  },
  contactButtonTextFixed: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  section: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  firstSection: {
    borderTopWidth: 0,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
    textAlign: 'left',
  },
  imagesScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  imageWrapper: {
    marginRight: 12,
    borderRadius: 12,
    overflow: 'hidden',
  },
  workImage: {
    width: 200,
    height: 150,
    borderRadius: 12,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    gap: 12,
    paddingLeft: 8,
  },
  checkIcon: {
    marginTop: 2,
  },
  listItemText: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
  },
  fieldWorkLoading: {
    padding: 40,
    alignItems: 'center',
  },
  fieldWorkLoadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#6b7280',
  },
  fieldWorkGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'flex-start',
    paddingHorizontal: 4,
  },
  fieldWorkImageWrapper: {
    width: (width - 64) / 3,
    height: 140,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#f3f4f6',
    marginBottom: 8,
    position: 'relative',
  },
  fieldWorkImage: {
    width: '100%',
    height: '100%',
  },
  noImagesContainer: {
    padding: 40,
    alignItems: 'center',
  },
  noImagesText: {
    marginTop: 12,
    fontSize: 14,
    color: '#6b7280',
  },
  errorText: {
    fontSize: 18,
    color: '#0066CC',
    textAlign: 'center',
    marginTop: 50,
  },
  backButton: {
    marginTop: 20,
    padding: 12,
    backgroundColor: '#0066CC',
    borderRadius: 8,
    alignSelf: 'center',
  },
  backButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCloseButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 2,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
  },
  modalNavButton: {
    position: 'absolute',
    left: 20,
    top: '50%',
    marginTop: -25,
    zIndex: 2,
    padding: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 25,
  },
  modalNavButtonRight: {
    left: 'auto',
    right: 20,
  },
  modalImage: {
    width: width,
    height: '100%',
  },
  imageCounter: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    zIndex: 2,
  },
  imageCounterText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default ServiceDetailsScreen;
