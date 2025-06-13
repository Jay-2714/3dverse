"use client";
import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSession } from '@/lib/auth-client';
import { initializeAuth, setCredentials, clearCredentials, verifyToken } from '../../redux/auth/authSlice';
import { RootState, AppDispatch } from '../../redux/store';

interface AuthContextType {
  isAuthenticated: boolean;
  user: any;
  isLoading: boolean;
  error: string | null;
  role: 'admin' | 'user' | 'creator';
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: session, isPending } = useSession();
  
  const { 
    isAuthenticated, 
    user, 
    isLoading, 
    error, 
    role, 
    token 
  } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    // Initialize auth state from localStorage
    dispatch(initializeAuth());
  }, [dispatch]);

  useEffect(() => {
    // Handle better-auth session
    if (session?.user) {
      dispatch(setCredentials({
        user: {
          id: session.user.id,
          username: session.user.name || session.user.email,
          email: session.user.email,
          createdAt: session.user.createdAt?.toISOString() || new Date().toISOString(),
          isCreator: false // Default value, can be updated based on actual user data
        },
        token: session.session?.token || '' // better-auth handles tokens internally
      }));
    } else if (!isPending && !session) {
      // Only clear credentials if we're not loading and there's no session
      const storedToken = localStorage.getItem('authToken');
      if (!storedToken) {
        dispatch(clearCredentials());
      }
    }
  }, [session, isPending, dispatch]);

  useEffect(() => {
    // Verify stored token on app start
    const storedToken = localStorage.getItem('authToken');
    if (storedToken && !isAuthenticated && !session) {
      dispatch(verifyToken(storedToken));
    }
  }, [dispatch, isAuthenticated, session]);

  const contextValue: AuthContextType = {
    isAuthenticated: isAuthenticated || !!session,
    user: user || session?.user,
    isLoading: isLoading || isPending,
    error,
    role
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
