import React from 'react';
import { SUPPORTED_LANGUAGES } from '@/constants';
import { useAuth } from '@/hooks/useAuth';

interface LanguageSelectorProps {
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  selectedLanguage,
  onLanguageChange,
}) => {
  const { user, loading, isAuthorizedForGo } = useAuth();

  // Debug logging
  console.log('LanguageSelector Debug:', {
    user: user?.email,
    loading,
    isAuthorizedForGo,
    SUPPORTED_LANGUAGES,
    selectedLanguage
  });

  // Filter languages based on user authorization
  const availableLanguages = SUPPORTED_LANGUAGES.filter(lang => {
    if (lang.value === 'go') {
      return isAuthorizedForGo;
    }
    return true; // Python is always available
  });

  console.log('Available languages:', availableLanguages);

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-gray-600">Language:</span>
      <select 
        value={selectedLanguage}
        onChange={(e) => onLanguageChange(e.target.value)}
        className="text-sm border border-gray-300 rounded px-2 py-1 bg-white"
      >
        {availableLanguages.map(lang => (
          <option key={lang.value} value={lang.value}>
            {lang.label}
          </option>
        ))}
      </select>
      {selectedLanguage === 'go' && !isAuthorizedForGo && (
        <div className="text-xs text-red-600">
          Go requires authentication
        </div>
      )}
      {/* Debug info */}
      <div className="text-xs text-gray-500">
        Auth: {loading ? 'Loading...' : user ? user.email : 'Not logged in'} | 
        Go Access: {isAuthorizedForGo ? 'Yes' : 'No'}
      </div>
    </div>
  );
};

export default LanguageSelector; 