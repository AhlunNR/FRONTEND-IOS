import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import HomePage from './pages/HomePage';
import ChapterPage from './pages/ChapterPage';
import NotFoundPage from './pages/NotFoundPage';
import HistoryPage from './pages/HistoryPage';
import AdminPage from './pages/AdminPage';
import ProtectedRoute from './components/ProtectedRoute';
import StaggeredMenu from './components/StaggeredMenu';

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
  const { user, signOut } = useAuth();
  const isQuizPage = location.pathname.startsWith('/chapter');
  const isAdminPage = location.pathname.startsWith('/admin');
  const isLoginPage = location.pathname === '/login';

  if (isQuizPage || isAdminPage || isLoginPage) return null;

  const menuItems = [
    { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
    { label: 'Simulasi', ariaLabel: 'Pilih simulasi bab', link: '/simulasi' },
    { label: 'History', ariaLabel: 'Lihat riwayat kuis', link: '/history' },
  ];

  // Add profile link for logged-in users
  if (user) {
    menuItems.push({ label: 'Profil', ariaLabel: 'Lihat profil', link: '/profile' });
  }

  // Add login/logout to menu
  if (user) {
    menuItems.push({
      label: 'Logout',
      ariaLabel: 'Keluar dari akun',
      link: '#',
      onClick: (e) => { e.preventDefault(); signOut(); },
    });
  } else {
    menuItems.push({ label: 'Login', ariaLabel: 'Masuk ke akun', link: '/login' });
  }

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

function AppRoutes() {
  return (
    <>
      <GlobalMenu />
      
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/simulasi" element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        } />
        <Route path="/chapter/:id" element={
          <ProtectedRoute>
            <ChapterPage />
          </ProtectedRoute>
        } />
        <Route path="/history" element={
          <ProtectedRoute>
            <HistoryPage />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        } />
        <Route path="/admin" element={
          <ProtectedRoute requiredRole="admin">
            <AdminPage />
          </ProtectedRoute>
        } />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
