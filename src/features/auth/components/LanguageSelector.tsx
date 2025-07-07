import React, { useState, useRef, useEffect } from 'react';
import { SUPPORTED_LANGUAGES } from '@/shared/constants';
import { useAuth } from '@/features/auth';

interface LanguageSelectorProps {
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  selectedLanguage,
  onLanguageChange,
}) => {
  const { isAuthorizedForGo } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Languages that require authentication
  const AUTH_REQUIRED_LANGUAGES = ['go', 'c', 'cpp', 'java', 'rust'];

  // Filter languages based on user authorization
  const availableLanguages = SUPPORTED_LANGUAGES.filter((lang) => {
    if (AUTH_REQUIRED_LANGUAGES.includes(lang.value)) {
      return isAuthorizedForGo;
    }
    return true; // Python and JavaScript are always available
  });

  const isAuthRequired = AUTH_REQUIRED_LANGUAGES.includes(
    selectedLanguage as 'go' | 'c' | 'cpp' | 'java' | 'rust'
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedLabel =
    availableLanguages.find((lang) => lang.value === selectedLanguage)?.label ||
    'Select Language';

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen((open) => !open)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 min-w-[140px]"
        aria-label="Select language"
        disabled={availableLanguages.length === 0}
      >
        <span className="text-sm font-medium truncate max-w-[100px]">
          {selectedLabel}
        </span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {isOpen && availableLanguages.length > 0 && (
        <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
          <div className="py-1">
            {availableLanguages.map((lang) => (
              <button
                key={lang.value}
                onClick={() => {
                  onLanguageChange(lang.value);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors truncate ${
                  selectedLanguage === lang.value
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                    : 'text-gray-700 dark:text-gray-200'
                }`}
              >
                <span className="text-sm truncate">{lang.label}</span>
                {selectedLanguage === lang.value && (
                  <svg
                    className="w-4 h-4 ml-auto"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
      {isAuthRequired && !isAuthorizedForGo && (
        <div className="text-xs text-red-600 mt-1">
          {selectedLanguage.toUpperCase()} requires authentication
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
