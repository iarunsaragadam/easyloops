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
  const { isAuthorizedForGo } = useAuth();

  // Languages that require authentication
  const AUTH_REQUIRED_LANGUAGES = ['go', 'c', 'cpp', 'java', 'rust'];

  // Filter languages based on user authorization
  const availableLanguages = SUPPORTED_LANGUAGES.filter(lang => {
    if (AUTH_REQUIRED_LANGUAGES.includes(lang.value)) {
      return isAuthorizedForGo;
    }
    return true; // Python and JavaScript are always available
  });

  const isAuthRequired = AUTH_REQUIRED_LANGUAGES.includes(selectedLanguage as 'go' | 'c' | 'cpp' | 'java' | 'rust');

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
      {isAuthRequired && !isAuthorizedForGo && (
        <div className="text-xs text-red-600">
          {selectedLanguage.toUpperCase()} requires authentication
        </div>
      )}
    </div>
  );
};

export default LanguageSelector; 