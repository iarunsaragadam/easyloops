import React from 'react';
import { QuestionSelectorProps } from '@/shared/types';
import { QuestionSelector } from '@/features/question';
import { LanguageSelector, AuthButton } from '@/features/auth';
import ThemeToggle from '@/shared/components/ThemeToggle';

interface HeaderProps extends QuestionSelectorProps {
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  selectedLanguage,
  onLanguageChange,
  ...questionSelectorProps
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 md:px-6 py-3 md:py-4 transition-colors">
      <div className="flex flex-col space-y-3 md:space-y-0 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center justify-between md:justify-start md:space-x-4">
          <div className="flex items-center space-x-2 md:space-x-4">
            <h1 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">
              🧠 EasyLoops
            </h1>
            <span className="hidden sm:inline text-sm text-gray-500 dark:text-gray-400">
              Practice Problems
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <QuestionSelector {...questionSelectorProps} />
          <LanguageSelector
            selectedLanguage={selectedLanguage}
            onLanguageChange={onLanguageChange}
          />
          <ThemeToggle />
          <AuthButton />
        </div>
      </div>
    </div>
  );
};

export default Header;
