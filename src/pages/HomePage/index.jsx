import React from 'react';
import { useIsMobile } from '@/hooks/useIsMobile';
import HomePageMobile from './components/HomePageMobile';
import HomePageDesktop from './components/HomePageDesktop';

export default function HomePage() {
  const isMobile = useIsMobile();

  return isMobile ? <HomePageMobile /> : <HomePageDesktop />;
}
