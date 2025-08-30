import React from 'react';
import type { Page } from '../types';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

const FooterLink: React.FC<{onClick: () => void, children: React.ReactNode}> = ({ onClick, children }) => (
    <button onClick={onClick} className="text-gray-500 hover:text-blue-500 transition-colors duration-200">
        {children}
    </button>
);

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full mt-8 py-6 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 text-center text-gray-500">
        <div className="flex justify-center space-x-4 md:space-x-6 mb-4">
            <FooterLink onClick={() => onNavigate('about')}>About</FooterLink>
            <FooterLink onClick={() => onNavigate('terms')}>Terms of Use</FooterLink>
            <FooterLink onClick={() => onNavigate('privacy')}>Privacy Policy</FooterLink>
        </div>
        <p>&copy; {new Date().getFullYear()} Mystic Square by Hamza Benhadou using AI. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;