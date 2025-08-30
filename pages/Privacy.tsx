import React from 'react';

const PageContainer: React.FC<{title: string, onBack: () => void, children: React.ReactNode}> = ({ title, onBack, children }) => (
    <div className="w-full max-w-3xl text-left p-6 md:p-8 bg-white rounded-lg shadow-md animate-fade-in">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-600 mb-4">{title}</h1>
        <div className="prose prose-lg text-gray-700">
            {children}
        </div>
        <button 
            onClick={onBack}
            className="mt-8 px-5 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-500"
        >
            &larr; Back to Game
        </button>
    </div>
);

const PrivacyPolicy: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  return (
    <PageContainer title="Privacy Policy" onBack={onBack}>
        <p>This Privacy Policy describes how your personal information is handled in the Mystic Square game.</p>
        <h2 className="text-xl font-bold mt-4">Information We Collect</h2>
        <p>We do not collect any personally identifiable information from our users. The game state, such as your current puzzle layout, can be stored in your browser's URL hash for the "share" functionality, but this information is not sent to or stored on our servers.</p>
        <h2 className="text-xl font-bold mt-4">Third-Party Services</h2>
        <p>This application may display advertisements from third-party networks. These services may use cookies and other tracking technologies to collect information about your activities on this and other websites to provide you targeted advertising based upon your interests.</p>
        <h2 className="text-xl font-bold mt-4">Changes to This Policy</h2>
        <p>We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page. You are advised to review this Privacy Policy periodically for any changes.</p>
    </PageContainer>
  );
};

export default PrivacyPolicy;