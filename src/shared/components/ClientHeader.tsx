'use client';

import React from 'react';
import Link from 'next/link';
import { LanguageSelector, AuthButton } from '@/features/auth';
import AdvancedThemeSelector from '@/shared/components/AdvancedThemeSelector';
import { Logo, Navigation, MobileNavigation } from '@/shared/components';

interface ClientHeaderProps {
  selectedLanguage?: string;
  onLanguageChange?: (language: string) => void;
  showLanguageSelector?: boolean;
}

const ClientHeader: React.FC<ClientHeaderProps> = ({
  selectedLanguage = 'python',
  onLanguageChange = () => {},
  showLanguageSelector = false,
}) => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center space-x-8">
            <Link href="/" className="hover:opacity-80 transition-opacity">
              <Logo size="lg" />
            </Link>
            <Navigation />
          </div>
          <div className="flex items-center space-x-4">
            {showLanguageSelector && (
              <LanguageSelector
                selectedLanguage={selectedLanguage}
                onLanguageChange={onLanguageChange}
              />
            )}
            <AdvancedThemeSelector />
            <AuthButton />
            <MobileNavigation />
          </div>
        </div>
      </div>
    </header>
  );
};

export default ClientHeader;
