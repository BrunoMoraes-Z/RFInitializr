import { Terminal } from 'lucide-react';
import React, { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

interface HeaderProps {
  children?: ReactNode;
}

const Header: React.FC<HeaderProps> = ({ children }) => {
  const { t } = useTranslation();

  return (
    <header className="bg-[#2B2B2B] text-white py-4 px-6 shadow-md">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between">
        <div className="flex items-center mb-4 sm:mb-0">
          <Terminal size={28} className="text-[#3592C4] mr-2" />
          <h1 className="text-xl font-semibold">{t('header.title')}</h1>
        </div>
        <div className="flex items-center space-x-6">
          {children}
          <nav className="flex space-x-6">
            <a
              href="https://robotframework.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors duration-200"
            >
              {t('header.documentation')}
            </a>
            <a
              href="https://github.com/robotframework/robotframework"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors duration-200"
            >
              {t('header.github')}
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
