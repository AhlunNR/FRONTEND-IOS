import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import ChapterPage from './pages/ChapterPage';
import NotFoundPage from './pages/NotFoundPage';
import HistoryPage from './pages/HistoryPage';
import StaggeredMenu from './components/StaggeredMenu';

const menuItems = [
  { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
  { label: 'Simulasi', ariaLabel: 'Pilih simulasi bab', link: '/simulasi' },
  { label: 'History', ariaLabel: 'Lihat riwayat kuis', link: '/history' },
];

const socialItems = [
  { label: 'Instagram', link: 'https://www.instagram.com/lelouch.ln?igsh=c2FhdHd1NGd6azk1' },
  { label: 'LinkedIn', link: 'https://www.linkedin.com/in/ahlun-najarrudin' }
];

const ReactLogo = () => (
  <svg width="28" height="28" viewBox="-10.5 -9.45 21 18.9" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="0" cy="0" r="2" fill="#3b82f6"/>
    <g stroke="#3b82f6" strokeWidth="1" fill="none">
      <ellipse rx="10" ry="4.5"/>
      <ellipse rx="10" ry="4.5" transform="rotate(60)"/>
      <ellipse rx="10" ry="4.5" transform="rotate(120)"/>
    </g>
  </svg>
);

function GlobalMenu() {
  const location = useLocation();
  const isQuizPage = location.pathname.startsWith('/chapter');

  if (isQuizPage) return null;

  return (
    <StaggeredMenu
      position="right"
      items={menuItems}
      socialItems={socialItems}
      displaySocials={true}
      displayItemNumbering={true}
      menuButtonColor="#a1a1aa"
      openMenuButtonColor="#fff"
      changeMenuColorOnOpen={true}
      colors={['#18181b', '#09090b']}
      logoNode={<ReactLogo />}
      accentColor="#3b82f6"
      isFixed={true}
    />
  );
}

function App() {
  return (
    <BrowserRouter>
      {/* Global Menu */}
      <GlobalMenu />
      
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/simulasi" element={<HomePage />} />
        <Route path="/chapter/:id" element={<ChapterPage />} />
        <Route path="/history" element={<HistoryPage />} />
        {/* Catch-all route for 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
