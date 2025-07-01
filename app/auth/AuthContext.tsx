"use client"

// AuthContext.js
import React, { createContext, useContext, useState, ReactNode } from "react";

interface User {
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string) => Promise<void>;
  signOut: () => void;
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Dummy sign-in function (replace with your API call)
  const signIn = async (email: string) => {
    setLoading(true);
    setError(null);
    try {
      // Replace with your real API call
      // await api.sendMagicLink(email);
      setUser({ email });
    } catch (err) {
      setError("Failed to sign in.");
    } finally {
      setLoading(false);
    }
  };

  const signOut = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, loading, error, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
