import React from 'react';

const AdPlaceholder: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`w-full h-full flex items-center justify-center bg-gray-200 rounded-lg p-4 ${className}`}>
      <div className="text-center text-gray-500">
        <h3 className="font-bold text-gray-600">Ad Placement</h3>
        <p className="text-sm">This space is reserved for ads.</p>
      </div>
    </div>
  );
};

export default AdPlaceholder;