/* eslint-disable react-hooks/rules-of-hooks */
import { useGetAllCategories } from '../consent/useGetConfigConsent';

export const handleCacheGlobalData = async () => {
  const consentData = await useGetAllCategories(); 
  return consentData;
};
