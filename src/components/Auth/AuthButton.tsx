import React from 'react';
import { useAuth } from '@/hooks/useAuth';

const AuthButton: React.FC = () => {
  const { user, loading, login, logout } = useAuth();

  if (loading) {
    return (
      <button className="px-3 py-1 bg-gray-400 text-white text-sm rounded cursor-not-allowed">
        Loading...
      </button>
    );
  }

  if (user) {
    return (
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-600">{user.email}</span>
        <button
          onClick={logout}
          className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={login}
      className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
    >
      Login with Google
    </button>
  );
};

export default AuthButton;
