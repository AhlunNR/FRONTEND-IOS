import React from 'react';
import { useIsMobile } from '@/hooks/useIsMobile';
import LandingPageMobile from './components/LandingPageMobile';
import LandingPageDesktop from './components/LandingPageDesktop';

export default function LandingPage() {
  const isMobile = useIsMobile();

  return isMobile ? <LandingPageMobile /> : <LandingPageDesktop />;
}
