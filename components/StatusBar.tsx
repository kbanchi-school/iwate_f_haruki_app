
import React from 'react';

interface StatusBarProps {
  label: string;
  value: number;
  color: string;
}

const StatusBar: React.FC<StatusBarProps> = ({ label, value, color }) => {
  const width = Math.max(0, Math.min(100, value));

  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-semibold text-brand-pink-800">{label}</span>
        <span className="text-sm font-bold text-brand-pink-600">{value}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
        <div
          className={`${color} h-4 rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${width}%` }}
        ></div>
      </div>
    </div>
  );
};

export default StatusBar;
   