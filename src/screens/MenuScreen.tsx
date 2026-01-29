import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, Dimensions } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { getAllServicesFromData } from '../utils/getServiceFromData';
import Icon from 'react-native-vector-icons/MaterialIcons';

const packageJson = require('../../package.json');

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const MENU_WIDTH = SCREEN_WIDTH * 0.85; // 85% of screen width

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const MenuScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { language, setLanguage } = useLanguage();
  const [languageModalVisible, setLanguageModalVisible] = useState(false);
  const insets = useSafeAreaInsets();
  const services = getAllServicesFromData(language);

  const languages = [
    { code: 'en' as const, name: 'English' },
    { code: 'hi' as const, name: 'हिंदी' },
    { code: 'mr' as const, name: 'मराठी' },
  ];

  const getLanguageName = (code: string) => {
    return languages.find(l => l.code === code)?.name || 'English';
  };

  const handleServicePress = (serviceId: string) => {
    navigation.goBack();
    navigation.navigate('ServiceDetails', { serviceId: serviceId as any });
  };

  const getServiceIcon = (serviceId: string): string => {
    const iconMap: { [key: string]: string } = {
      'solar-setup': 'solar-power',
      'websites-mobile-app-development': 'code',
      'interior-designs': 'palette',
      'elevations': 'layers',
      'raw-materials': 'inventory',
      'furnitures': 'chair',
      'plumber': 'plumbing',
      'electrician': 'electrical-services',
      'windows-doors-mesh': 'window',
      'steel-iron-railings': 'fence',
      'glass-homes': 'window',
      'pop-puc-services': 'brush',
      'layout-planning': 'architecture',
      'painting': 'format-paint',
      'floor-and-tiles': 'square-foot',
      'carpentry': 'carpenter',
      'office-setup': 'business-center',
      'gardening': 'local-florist',
      'construction': 'construction',
    };
    return iconMap[serviceId] || 'category';
  };

  return (
    <View style={styles.overlay}>
      <TouchableOpacity 
        style={styles.backdrop}
        activeOpacity={1}
        onPress={() => navigation.goBack()}
      />
      <View
        style={[styles.container, { width: MENU_WIDTH }]}
      >
        <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
          <View style={styles.header}>
            <Text style={styles.brandName}>KaamLo</Text>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
              <Icon name="close" size={24} color="#0066CC" />
            </TouchableOpacity>
          </View>

          <View style={styles.menuHeader}>
            <Text style={styles.allServicesText}>ALL SERVICES</Text>
            <TouchableOpacity 
              style={styles.languageButton}
              onPress={() => setLanguageModalVisible(true)}
            >
              <Text style={styles.languageButtonText}>{getLanguageName(language)}</Text>
              <Icon name="keyboard-arrow-down" size={20} color="#374151" />
            </TouchableOpacity>
          </View>

          <ScrollView 
            style={styles.servicesList}
            contentContainerStyle={{ paddingBottom: 20 }}
          >
            {services.map((service, index) => (
              <View key={service.id}>
                <TouchableOpacity
                  style={styles.serviceItem}
                  onPress={() => handleServicePress(service.id)}
                  activeOpacity={0.7}
                >
                  <Icon 
                    name={getServiceIcon(service.id)} 
                    size={20} 
                    color="#0066CC" 
                    style={styles.serviceIcon}
                  />
                  <Text style={styles.serviceItemText}>{service.name}</Text>
                </TouchableOpacity>
                {index < services.length - 1 && <View style={styles.separator} />}
              </View>
            ))}
            <View style={styles.separator} />
            <TouchableOpacity
              style={styles.serviceItem}
              onPress={() => {
                navigation.goBack();
                navigation.navigate('Home');
              }}
              activeOpacity={0.7}
            >
              <Icon 
                name="home" 
                size={20} 
                color="#0066CC" 
                style={styles.serviceIcon}
              />
              <Text style={styles.serviceItemText}>Home</Text>
            </TouchableOpacity>
          </ScrollView>
          
          <View style={[styles.versionContainer, { paddingBottom: insets.bottom }]}>
            <Text style={styles.versionText}>Version {packageJson.version}</Text>
          </View>
        </SafeAreaView>
      </View>

      {/* Language Selection Modal */}
      <Modal
        visible={languageModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setLanguageModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select language</Text>
            {languages.map((lang) => (
              <TouchableOpacity
                key={lang.code}
                style={[
                  styles.languageItem,
                  language === lang.code && styles.languageItemActive,
                ]}
                onPress={() => {
                  setLanguage(lang.code);
                  setLanguageModalVisible(false);
                }}
              >
                <Text
                  style={[
                    styles.languageText,
                    language === lang.code && styles.languageTextActive,
                  ]}
                >
                  {lang.name}
                </Text>
                {language === lang.code && (
                  <Icon name="check" size={24} color="#9333ea" />
                )}
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.closeModalButton}
              onPress={() => setLanguageModalVisible(false)}
            >
              <Text style={styles.closeModalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  safeArea: {
    flex: 1,
  },
  container: {
    height: '100%',
    backgroundColor: '#ffffff',
    borderRightWidth: 1,
    borderRightColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: {
      width: -2,
      height: 0,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  brandName: {
    fontSize: 26,
    fontWeight: '700',
    color: '#0066CC',
    letterSpacing: 0.5,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 28,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  allServicesText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0066CC',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    gap: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  languageButtonText: {
    fontSize: 13,
    color: '#0066CC',
    fontWeight: '600',
  },
  servicesList: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  versionContainer: {
    paddingTop: 16,
    paddingBottom: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
    backgroundColor: '#ffffff',
  },
  serviceItem: {
    minHeight: 36,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 0,
    paddingHorizontal: 12,
    marginVertical: 2,
    borderRadius: 8,
  },
  serviceIcon: {
    marginRight: 12,
  },
  serviceItemText: {
    fontSize: 15,
    color: '#111827',
    fontWeight: '500',
    lineHeight: 20,
    flex: 1,
  },
  separator: {
    height: 1,
    backgroundColor: '#f3f4f6',
    marginVertical: 8,
    marginHorizontal: 12,
  },
  versionText: {
    fontSize: 12,
    color: '#9ca3af',
    fontWeight: '400',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    width: '85%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 20,
  },
  languageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    backgroundColor: '#f9fafb',
  },
  languageItemActive: {
    backgroundColor: '#f3e8ff',
  },
  languageText: {
    fontSize: 16,
    color: '#374151',
  },
  languageTextActive: {
    color: '#9333ea',
    fontWeight: '600',
  },
  closeModalButton: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    alignItems: 'center',
  },
  closeModalButtonText: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '500',
  },
});

export default MenuScreen;

