import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLanguage } from '../i18n/LanguageContext';

interface ServiceAreaSectionProps {
  areas: string[];
}

const ServiceAreaSection: React.FC<ServiceAreaSectionProps> = ({ areas }) => {
  const { t } = useLanguage();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('serviceArea')}</Text>
      <Text style={styles.subtitle}>{t('serviceLocations')}</Text>
      <View style={styles.chipContainer}>
        {areas.map((area, index) => (
          <View key={index} style={styles.chip}>
            <Text style={styles.chipText}>{area}</Text>
          </View>
        ))}
      </View>
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
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 16,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    backgroundColor: '#eef2ff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  chipText: {
    color: '#0066CC',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default ServiceAreaSection;

