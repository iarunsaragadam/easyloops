import React from 'react';
import { QuestionSelectorProps } from '@/types';
import QuestionSelector from './QuestionSelector';

const Header: React.FC<QuestionSelectorProps> = (questionSelectorProps) => {
  return (
    <div className="bg-white border-b border-gray-200 px-4 md:px-6 py-3 md:py-4">
      <div className="flex flex-col space-y-3 md:space-y-0 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center justify-between md:justify-start md:space-x-4">
          <div className="flex items-center space-x-2 md:space-x-4">
            <h1 className="text-lg md:text-xl font-semibold text-gray-900">🧠 EasyLoops</h1>
            <span className="hidden sm:inline text-sm text-gray-500">Practice Problems</span>
          </div>
          
          {/* Language selector - Mobile version (top right) */}
          <div className="flex md:hidden items-center space-x-1">
            <span className="text-xs text-gray-600">Lang:</span>
            <select className="text-xs border border-gray-300 rounded px-1 py-1 bg-white">
              <option>Python3</option>
              <option>JavaScript</option>
              <option>Java</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between md:justify-end md:space-x-4">
          <div className="flex-1 md:flex-none">
            <QuestionSelector {...questionSelectorProps} />
          </div>
          
          {/* Language selector - Desktop version */}
          <div className="hidden md:flex items-center space-x-2">
            <span className="text-sm text-gray-600">Language:</span>
            <select className="text-sm border border-gray-300 rounded px-2 py-1 bg-white">
              <option>Python3</option>
              <option>JavaScript</option>
              <option>Java</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header; 