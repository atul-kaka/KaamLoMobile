import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Pressable,
  Share,
  Linking,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const whatsappIcon = require('../assets/images/whatsapp.png');
const facebookIcon = require('../assets/images/facebook.png');
const instagramIcon = require('../assets/images/instagraam.png');

interface ShareModalProps {
  visible: boolean;
  onClose: () => void;
  serviceName?: string;
}

const ShareModal: React.FC<ShareModalProps> = ({ visible, onClose, serviceName }) => {
  const shareMessage = serviceName
    ? `Check out ${serviceName} service on KaamLo - Your trusted partner for all local service needs!\n\nVisit: https://kaamlo.com`
    : `Check out KaamLo - Your trusted partner for all local service needs!\n\nVisit: https://kaamlo.com`;

  const handleShare = async () => {
    try {
      await Share.share({
        message: shareMessage,
        title: 'KaamLo',
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleWhatsApp = () => {
    const url = `whatsapp://send?text=${encodeURIComponent(shareMessage)}`;
    Linking.openURL(url).catch(() => {
      // Fallback to web WhatsApp
      Linking.openURL(`https://wa.me/?text=${encodeURIComponent(shareMessage)}`);
    });
  };

  const handleFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://kaamlo.com')}`;
    Linking.openURL(url);
  };

  const handleInstagram = () => {
    // Instagram doesn't support direct sharing via URL scheme
    // Copy to clipboard and show message
    Share.share({
      message: shareMessage,
    });
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
      presentationStyle="overFullScreen"
      statusBarTranslucent={true}
    >
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <View 
          style={styles.modalContent}
          onStartShouldSetResponder={() => true}
        >
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Share KaamLo</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Icon name="close" size={24} color="#111827" />
            </TouchableOpacity>
          </View>

          <View style={styles.shareOptions}>
            <TouchableOpacity style={styles.shareOption} onPress={handleShare}>
              <View style={styles.shareIconContainer}>
                <Icon name="share" size={32} color="#111827" />
              </View>
              <Text style={styles.shareOptionText}>Share</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.shareOption} onPress={handleWhatsApp}>
              <View style={styles.shareIconContainer}>
                <Image 
                  source={whatsappIcon} 
                  style={styles.shareIconImage}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.shareOptionText}>Share on WhatsApp</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.shareOption} onPress={handleFacebook}>
              <View style={styles.shareIconContainer}>
                <Image 
                  source={facebookIcon} 
                  style={styles.shareIconImage}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.shareOptionText}>Share on Facebook</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.shareOption} onPress={handleInstagram}>
              <View style={styles.shareIconContainer}>
                <Image 
                  source={instagramIcon} 
                  style={styles.shareIconImage}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.shareOptionText}>Share on Instagram</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
    zIndex: 9999,
    elevation: 9999,
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 40,
    zIndex: 10000,
    elevation: 10000,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  closeButton: {
    padding: 4,
  },
  shareOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  shareOption: {
    width: '48%',
    alignItems: 'center',
    marginBottom: 24,
  },
  shareIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    overflow: 'hidden',
  },
  shareIconImage: {
    width: 40,
    height: 40,
  },
  shareOptionText: {
    fontSize: 14,
    color: '#374151',
    textAlign: 'center',
  },
});

export default ShareModal;

