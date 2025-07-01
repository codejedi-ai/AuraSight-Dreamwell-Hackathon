// AuthContext.js
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // user = { email: ... } or null
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Dummy sign-in function (replace with your API call)
  const signIn = async (email) => {
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
