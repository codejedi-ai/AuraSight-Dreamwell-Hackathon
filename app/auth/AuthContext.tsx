"use client"

// AuthContext.js
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { signIn as amplifySignIn, signUp as amplifySignUp, signOut as amplifySignOut, getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth'

interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  accountType?: 'brand' | 'influencer';
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, firstName?: string, lastName?: string, accountType?: 'brand' | 'influencer') => Promise<void>;
  signOut: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      const currentUser = await getCurrentUser();
      const attributes = await fetchUserAttributes();
      
      setUser({
        id: currentUser.userId,
        email: attributes.email || '',
        firstName: attributes.given_name,
        lastName: attributes.family_name,
        accountType: attributes['custom:accountType'] as 'brand' | 'influencer',
      });
    } catch (error) {
      // User is not authenticated
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      await amplifySignIn({ username: email, password });
      await checkAuthState();
    } catch (error: any) {
      console.error('Sign in error:', error);
      setError(error.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, firstName?: string, lastName?: string, accountType?: 'brand' | 'influencer') => {
    setLoading(true);
    setError(null);

    try {
      const customAttributes = {
        ...(firstName && { given_name: firstName }),
        ...(lastName && { family_name: lastName }),
        ...(accountType && { 'custom:accountType': accountType }),
      };

      await amplifySignUp({
        username: email,
        password,
        options: {
          userAttributes: {
            email,
            ...customAttributes,
          },
        },
      });
    } catch (error: any) {
      console.error('Sign up error:', error);
      setError(error.message || 'Failed to sign up');
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    setError(null);

    try {
      await amplifySignOut();
      setUser(null);
    } catch (error: any) {
      console.error('Sign out error:', error);
      setError(error.message || 'Failed to sign out');
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, signIn, signUp, signOut, clearError }}>
      {children}
    </AuthContext.Provider>
  );
};
