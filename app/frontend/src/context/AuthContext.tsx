// src/AuthContext.tsx

import { createContext, useContext, useState, type ReactNode } from 'react';

/**
 * Define the shape of the Auth context object
 */
interface AuthContextType {
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

// Create the context with an undefined default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * AuthProvider component wraps around the app and provides auth state
 */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Initialize token state from localStorage if available
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('token');
  });

  /**
   * Called on login: stores token in state and localStorage
   * @param newToken - The JWT token received from backend
   */
  const login = (newToken: string) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  /**
   * Called on logout: clears token from state and localStorage
   */
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  /**
   * Derived boolean based on presence of token
   */
  const isAuthenticated = Boolean(token);

  return (
    <AuthContext.Provider value={{ token, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * useAuth is a convenience hook to consume the AuthContext
 * Throws an error if used outside of AuthProvide
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
