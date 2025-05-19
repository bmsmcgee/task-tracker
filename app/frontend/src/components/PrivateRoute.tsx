// src/components/PrivateRoute.tsx

import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { JSX } from 'react';

/**
 * PrivateRoute checks if the user is authenticated.
 * If not, it redirects to the /login page.
 * If authenticated, it renders the requested component.
 *
 * @param children - The protected content to render
 */

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth();

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Otherwise, render the child route/component
  return children;
};

export default PrivateRoute;
