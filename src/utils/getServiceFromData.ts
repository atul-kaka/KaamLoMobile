/**
 * Service Data Utility
 * 
 * Converts the data-driven service structure to the format expected by components.
 * Applies localization at runtime using the translation utility.
 */

import type { Service } from '../types';
import type { Language } from '../i18n/translations';
import { SERVICES_DATA, SERVICE_ORDER } from '../data/servicesData';
import { getTranslatedService } from './getTranslatedService';
import { CONTACT_INFO } from '../constants';

/**
 * Convert ServiceData to Service format
 */
const convertServiceDataToService = (serviceData: typeof SERVICES_DATA[string]): Service => {
  return {
    id: serviceData.id,
    name: serviceData.title,
    description: serviceData.subtitle,
    icon: serviceData.icon,
    tileImage: serviceData.tileImage,
    images: serviceData.images,
    whatWeDo: serviceData.whatWeDo,
    faq: serviceData.faq,
    serviceArea: serviceData.serviceArea,
    assetFolder: serviceData.assetFolder,
    websites: serviceData.websites,
    contact: serviceData.contact || {
      phone: CONTACT_INFO.phone,
      email: CONTACT_INFO.email
    }
  };
};

/**
 * Get a service object with runtime localization
 */
export const getServiceFromData = (serviceId: string, language: Language = 'en'): Service | null => {
  const serviceData = SERVICES_DATA[serviceId];
  
  if (serviceData) {
    const baseService = convertServiceDataToService(serviceData);
    return getTranslatedService(baseService, language);
  }

  return null;
};

/**
 * Get all services with runtime localization, in the correct order
 */
export const getAllServicesFromData = (language: Language = 'en'): Service[] => {
  return SERVICE_ORDER
    .map(id => {
      const serviceData = SERVICES_DATA[id];
      if (serviceData) {
        return getServiceFromData(id, language);
      }
      return null;
    })
    .filter((service): service is Service => service !== null);
};
