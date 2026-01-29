import React, { useState, useEffect, useRef, useCallback } from 'react';
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
  const [retryCount, setRetryCount] = useState(0);
  const [imageKey, setImageKey] = useState(0); // Key to force Image remount on retry
  const [shareModalVisible, setShareModalVisible] = useState(false);
  const retryTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const loadTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  // Use Azure Blob Storage tileImage URL directly
  const imageSource = service.tileImage || service.images[0] || null;
  const hasValidImage = imageSource && imageSource !== NO_IMAGE;
  
  // Handle image error with retry logic
  const handleImageError = React.useCallback(() => {
    if (loadTimeoutRef.current) {
      clearTimeout(loadTimeoutRef.current);
      loadTimeoutRef.current = null;
    }
    
    setRetryCount(currentRetryCount => {
      if (currentRetryCount < 3 && hasValidImage && imageSource) {
        const delay = Math.min(1000 * Math.pow(2, currentRetryCount), 5000); // Exponential backoff: 1s, 2s, 4s
        console.log(`[ServiceTile] Retrying image load for ${service.id} (attempt ${currentRetryCount + 1}/3) after ${delay}ms`);
        
        retryTimeoutRef.current = setTimeout(() => {
          setRetryCount(prev => prev + 1);
          setImageKey(prev => prev + 1); // Force Image remount with new key
          setImageError(false);
          setImageLoading(true);
          
          // Reset load timeout for retry
          loadTimeoutRef.current = setTimeout(() => {
            setImageError(true);
            setImageLoaded(false);
            setImageLoading(false);
            console.error(`[ServiceTile] Image load timeout for ${service.id} on retry`);
          }, 15000);
        }, delay);
        return currentRetryCount;
      } else {
        // Max retries reached, show error state
        console.error(`[ServiceTile] Max retries reached for ${service.id}. Image failed to load after ${currentRetryCount} attempts.`);
        setImageError(true);
        setImageLoaded(false);
        setImageLoading(false);
        return currentRetryCount;
      }
    });
  }, [hasValidImage, imageSource, service.id]);
  
  // Reset state when image source changes
  useEffect(() => {
    if (hasValidImage) {
      setImageLoaded(false);
      setImageError(false);
      setImageLoading(true);
      setRetryCount(0);
      setImageKey(0);
      console.log(`[ServiceTile] Loading image for ${service.id}:`, imageSource);
      
      // Set a timeout for image loading (15 seconds)
      loadTimeoutRef.current = setTimeout(() => {
        console.warn(`[ServiceTile] Image load timeout for ${service.id}, will retry...`);
        handleImageError();
      }, 15000);
    } else {
      setImageError(true);
      setImageLoaded(false);
      setImageLoading(false);
    }
    
    // Cleanup timeouts on unmount or source change
    return () => {
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current);
        retryTimeoutRef.current = null;
      }
      if (loadTimeoutRef.current) {
        clearTimeout(loadTimeoutRef.current);
        loadTimeoutRef.current = null;
      }
    };
  }, [imageSource, service.id, hasValidImage, handleImageError]);

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
          {/* Use key prop to force remount on retry */}
          {hasValidImage && (
            <Image
              key={`${service.id}-${imageKey}`}
              source={{ 
                uri: imageSource!,
                cache: 'force-cache', // Use cache for better performance
              }}
              style={[styles.image, !imageLoaded && styles.imageLoading]}
              onLoadStart={() => {
                setImageLoading(true);
                setImageError(false);
                if (loadTimeoutRef.current) {
                  clearTimeout(loadTimeoutRef.current);
                }
                // Set new timeout for this load attempt
                loadTimeoutRef.current = setTimeout(() => {
                  console.warn(`[ServiceTile] Image load timeout for ${service.id}`);
                  handleImageError();
                }, 15000);
                
                // Special logging for problematic services
                if (service.id === 'solar-setup' || service.id === 'interior-designs') {
                  console.log(`[ServiceTile] Starting load for ${service.id}:`, imageSource);
                }
              }}
              onLoadEnd={() => {
                if (loadTimeoutRef.current) {
                  clearTimeout(loadTimeoutRef.current);
                  loadTimeoutRef.current = null;
                }
                setImageLoaded(true);
                setImageError(false);
                setImageLoading(false);
                setRetryCount(0); // Reset retry count on success
                
                // Special logging for problematic services
                if (service.id === 'solar-setup' || service.id === 'interior-designs') {
                  console.log(`[ServiceTile] ✅ Image loaded successfully for ${service.id} after ${retryCount} retries`);
                } else {
                  console.log(`[ServiceTile] Image loaded successfully for ${service.id}`);
                }
              }}
              onError={(error) => {
                const errorMsg = error.nativeEvent?.error || 'Unknown error';
                console.warn(`[ServiceTile] ❌ Failed to load image for ${service.id}:`, imageSource, errorMsg);
                
                // Special logging for problematic services
                if (service.id === 'solar-setup' || service.id === 'interior-designs') {
                  console.warn(`[ServiceTile] ⚠️ ${service.id} image failed. Retry count: ${retryCount}/3`);
                }
                
                handleImageError();
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

