/* eslint-disable react-hooks/rules-of-hooks */
import { useGetConfigConsent } from '../consent/useGetConfigConsent';

export const handleCacheGlobalData = async () => {
  const consentData = await useGetConfigConsent();
};
