import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Website } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface WebsiteShowcaseProps {
  websites: Website[];
}

const WebsiteShowcase: React.FC<WebsiteShowcaseProps> = ({ websites }) => {
  const { t } = useLanguage();

  const handleWebsitePress = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('websitesWeDeveloped')}</Text>
      {websites.map((website, index) => (
        <TouchableOpacity
          key={index}
          style={styles.websiteItem}
          onPress={() => handleWebsitePress(website.url)}
          activeOpacity={0.7}
        >
          <View style={styles.websiteContent}>
            <Text style={styles.websiteName}>{website.name}</Text>
            {website.description && (
              <Text style={styles.websiteDescription}>{website.description}</Text>
            )}
            <Text style={styles.websiteUrl}>{website.url}</Text>
          </View>
          <Icon name="open-in-new" size={20} color="#0066CC" />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  websiteItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    marginBottom: 12,
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  websiteContent: {
    flex: 1,
  },
  websiteName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  websiteDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  websiteUrl: {
    fontSize: 12,
    color: '#0066CC',
    marginTop: 4,
  },
});

export default WebsiteShowcase;

