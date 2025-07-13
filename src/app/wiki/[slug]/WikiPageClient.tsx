'use client';

import React, { useState } from 'react';
import MarkdownRenderer from '@/shared/components/MarkdownRenderer';
import ClientHeader from '@/shared/components/ClientHeader';
import type { SupportedLanguage } from '@/shared/lib/wikiLoader';

interface WikiPageClientProps {
  slug: string;
  allContent: Record<SupportedLanguage, string>;
}

const WikiPageClient: React.FC<WikiPageClientProps> = ({
  slug,
  allContent,
}) => {
  const [selectedLanguage, setSelectedLanguage] =
    useState<SupportedLanguage>('python');

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language as SupportedLanguage);
    console.log(`Language changed to: ${language}`);
  };

  // Get the current content based on selected language
  const currentContent = allContent[selectedLanguage] || allContent.python;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <ClientHeader
        selectedLanguage={selectedLanguage}
        onLanguageChange={handleLanguageChange}
        showLanguageSelector={true}
      />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8 transition-colors duration-300 border border-gray-200 dark:border-gray-700">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {slug
                .split('-')
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')}
            </h1>
            <div className="w-16 h-1 bg-blue-600 dark:bg-blue-400"></div>
          </div>

          <div className="prose prose-lg max-w-none text-gray-900 dark:text-gray-100">
            <MarkdownRenderer content={currentContent} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WikiPageClient;
