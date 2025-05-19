// src/features/auth/api.ts

import axios from 'axios';

/**
 * Defines the structure of login credentials expected by the backend
 */
export interface LoginCredentials {
  email: string;
  password: string;
}

/**
 * Sends a login request to the backend and returns the JWT token on success
 * @param credentials - User login input (email and password)
 * @returns A promise that resolves with the JWT token string
 */
export const loginUser = async (credentials: LoginCredentials): Promise<string> => {
  const response = await axios.post<{ token: string }>(
    'http://localhost:3000/api/auth/login',
    credentials
  );

  return response.data.token;
};
