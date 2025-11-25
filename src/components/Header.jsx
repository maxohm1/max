import React from 'react';
import { BarChart3 } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-black/40 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-8 py-5">
        <div className="flex items-center justify-center">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl blur-md opacity-50"></div>
              <div className="relative p-3 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl shadow-lg">
                <BarChart3 className="w-7 h-7 text-white" strokeWidth={2.5} />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Social Analyzer</h1>
              <p className="text-xs text-gray-400 font-medium tracking-wide">Content Intelligence Platform</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
