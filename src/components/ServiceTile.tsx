import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import { Service } from '../types';
import { NO_IMAGE } from '../constants';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ShareModal from './ShareModal';

const shareIcon = require('../assets/images/share.png');

interface ServiceTileProps {
  service: Service;
  onPress: () => void;
}

const ServiceTile: React.FC<ServiceTileProps> = ({ service, onPress }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [shareModalVisible, setShareModalVisible] = useState(false);

  // Use Azure Blob Storage tileImage URL directly
  const imageSource = service.tileImage || service.images[0] || null;
  const hasValidImage = imageSource && imageSource !== NO_IMAGE;
  
  // Reset state when image source changes
  useEffect(() => {
    if (hasValidImage) {
      setImageLoaded(false);
      setImageError(false);
      setImageLoading(true);
      console.log(`[ServiceTile] Loading image for ${service.id}:`, imageSource);
    } else {
      setImageError(true);
      setImageLoaded(false);
      setImageLoading(false);
    }
  }, [imageSource, service.id, hasValidImage]);

  const handleSharePress = (e: any) => {
    e.stopPropagation(); // Prevent card press
    setShareModalVisible(true);
  };

  return (
    <>
      <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
        <View style={styles.imageContainer}>
          {/* Show emoji icon as placeholder while loading or if error */}
          {(!imageLoaded || imageError) && (
            <View style={[styles.fallbackContainer, imageLoaded && styles.fallbackHidden]}>
              <Text style={styles.fallbackIcon}>{service.icon}</Text>
            </View>
          )}
          
          {/* Show loading indicator while image is loading */}
          {hasValidImage && imageLoading && !imageError && (
            <View style={styles.loader}>
              <ActivityIndicator size="small" color="#0066CC" />
            </View>
          )}
          
          {/* Always render image so it can load, but hide it until loaded */}
          {hasValidImage && (
            <Image
              source={{ uri: imageSource! }}
              style={[styles.image, !imageLoaded && styles.imageLoading]}
              onLoadStart={() => {
                setImageLoading(true);
                setImageError(false);
              }}
              onLoadEnd={() => {
                console.log(`[ServiceTile] Image loaded successfully for ${service.id}`);
                setImageLoaded(true);
                setImageError(false);
                setImageLoading(false);
              }}
              onError={(error) => {
                console.warn(`[ServiceTile] Failed to load image for ${service.id}:`, imageSource, error.nativeEvent?.error || 'Unknown error');
                setImageError(true);
                setImageLoaded(false);
                setImageLoading(false);
              }}
            />
          )}
          {/* Share Button */}
          <TouchableOpacity 
            style={styles.shareButton}
            onPress={handleSharePress}
            activeOpacity={0.7}
          >
            <Image 
              source={shareIcon} 
              style={styles.shareIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <Text style={styles.name} numberOfLines={2}>
            {service.name}
          </Text>
          <Text style={styles.description} numberOfLines={2}>
            {service.description}
          </Text>
        </View>
      </TouchableOpacity>

      {/* Share Modal */}
      <ShareModal
        visible={shareModalVisible}
        onClose={() => setShareModalVisible(false)}
        serviceName={service.name}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    margin: 6,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  imageContainer: {
    width: '100%',
    height: 140,
    backgroundColor: '#f3f4f6',
    position: 'relative',
  },
  shareButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  shareIcon: {
    width: 18,
    height: 18,
    tintColor: '#0066CC',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  imageLoading: {
    opacity: 0,
  },
  loader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  fallbackContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    zIndex: 1,
  },
  fallbackHidden: {
    zIndex: 0,
    opacity: 0,
  },
  fallbackIcon: {
    fontSize: 64,
    textAlign: 'center',
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  content: {
    padding: 10,
  },
  name: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#111827',
    marginTop: 4,
    marginBottom: 4,
  },
  description: {
    fontSize: 11,
    color: '#6b7280',
    marginBottom: 4,
    lineHeight: 15,
  },
});

export default ServiceTile;

