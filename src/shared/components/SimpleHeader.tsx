'use client';

import React from 'react';
import Link from 'next/link';
import { LanguageSelector, AuthButton } from '@/features/auth';
import ThemeToggle from '@/shared/components/ThemeToggle';

interface SimpleHeaderProps {
  selectedLanguage?: string;
  onLanguageChange?: (language: string) => void;
  showLanguageSelector?: boolean;
}

const SimpleHeader: React.FC<SimpleHeaderProps> = ({
  selectedLanguage = 'python',
  onLanguageChange = () => {},
  showLanguageSelector = false,
}) => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-2xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              🧠 EasyLoops
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {showLanguageSelector && (
              <LanguageSelector
                selectedLanguage={selectedLanguage}
                onLanguageChange={onLanguageChange}
              />
            )}
            <ThemeToggle />
            <AuthButton />
          </div>
        </div>
      </div>
    </header>
  );
};

export default SimpleHeader;
