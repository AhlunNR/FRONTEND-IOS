import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

const AuthContext = createContext(null);

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch profile via backend API (uses service role key, bypasses RLS)
  const fetchProfile = async (accessToken) => {
    try {
      const res = await fetch(`${API_URL}/auth/profile`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (!res.ok) {
        console.warn('Profile fetch failed:', res.status);
        return null;
      }

      const json = await res.json();
      return json.success ? json.data : null;
    } catch (err) {
      console.warn('Profile fetch error:', err?.message);
      return null;
    }
  };

  useEffect(() => {
    let mounted = true;

    const initSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error) {
          console.error('getSession error:', error.message);
          if (mounted) setLoading(false);
          return;
        }

        if (session?.user && mounted) {
          setUser(session.user);
          const prof = await fetchProfile(session.access_token);
          if (mounted) setProfile(prof);
        }
      } catch (err) {
        console.error('Session init error:', err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    initSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return;

        if (session?.user) {
          setUser(session.user);
          const prof = await fetchProfile(session.access_token);
          if (mounted) setProfile(prof);
        } else {
          setUser(null);
          setProfile(null);
        }
        setLoading(false);
      }
    );

    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, []);

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin + '/simulasi',
      },
    });
    if (error) throw error;
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
  };

  const getAccessToken = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    return session?.access_token || null;
  };

  const value = {
    user,
    profile,
    loading,
    isAdmin: profile?.role === 'admin',
    signInWithGoogle,
    signOut,
    getAccessToken,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
