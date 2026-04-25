import React from 'react';
import { useIsMobile } from '@/hooks/useIsMobile';
import ChapterPageMobile from './components/ChapterPageMobile';
import ChapterPageDesktop from './components/ChapterPageDesktop';

export default function ChapterPage() {
  const isMobile = useIsMobile();

  return isMobile ? <ChapterPageMobile /> : <ChapterPageDesktop />;
}
