'use client';

import { useState, useEffect } from 'react';
import ApiService, { UserSession } from '../services/api';

const SESSION_KEY = 'ph_session';

export function useAuth() {
  const [session, setSession] = useState<UserSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user session exists in localStorage
    if (typeof window !== 'undefined') {
      try {
        const storedSession = localStorage.getItem(SESSION_KEY);
        if (storedSession) {
          setSession(JSON.parse(storedSession));
        }
      } catch (err) {
        console.error('Failed to parse stored session:', err);
      } finally {
        setLoading(false);
      }
    }
  }, []);

  const login = async (url: string, email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const newSession = await ApiService.login(url, email, password);
      localStorage.setItem(SESSION_KEY, JSON.stringify(newSession));
      setSession(newSession);
      return newSession;
    } catch (err: any) {
      const msg = err.message || 'Login failed';
      setError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setSession(null);
  };

  return {
    session,
    isAuthenticated: !!session?.token,
    loading,
    error,
    login,
    logout,
  };
}
