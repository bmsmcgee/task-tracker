// src/pages/LoginPage.tsx

import type { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { loginUser } from '../features/auth/api';

/**
 * Defines the structure of form input fields for login
 */
type LoginFormInputs = {
  email: string;
  password: string;
};

const LoginPage: FC = () => {
  // Initialize the useForm hook with types
  const {
    register, // Function that attaches react-hook-form to an input
    handleSubmit, // Function that wraps submit logic (adds validation before submit)
    formState: { errors }, // Object storing any validation errors for each field
  } = useForm<LoginFormInputs>();

  const navigate = useNavigate()
  const { login } = useAuth()

  /**
   * Called when the login form is submitted with valid values
   * Sends credentials to backend, stores JWT on success, and redirects to /tasks
   */
  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const token = await loginUser(data);    // Send login request to backend
      login(token)
      navigate('/tasks')
    } catch (error) {
      console.error('Login failed:', error)
      alert('Invalid email or password')    // TODO: replace with a UI error
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-md"
      >
        <h1 className="text-2xl font-bold text-white mb-6 text-center">Login</h1>

        {/* Email Label */}
        <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-1">
          Email Address
        </label>

        {/* Email Input Field */}
        <input
          type="email"
          id="email"
          autoComplete="email"
          placeholder="you@example.com"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^\S+@\S+$/i,
              message: 'Invalid email address',
            },
          })}
          className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        {/* Email Field Error Message */}
        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}

        {/* Password Label */}
        <label htmlFor="password" className="block text-sm font-medium text-gray-200 mt-4 mb-1">
          Password
        </label>

        {/* Password Input Field */}
        <input
          type="password"
          id="password"
          autoComplete="current-password"
          placeholder="••••••••"
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters',
            },
          })}
          className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        {/* Password Field Error Message */}
        {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}

        {/* Submit Button */}
        <button
        type='submit'
        className='w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition-colors'>
          Sign In
        </button>
      </form>
    </main>
  );
};

export default LoginPage;
