import React from 'react';

const platforms = [
  { id: 'instagram', name: 'Instagram', icon: '📸', color: 'from-pink-500 to-purple-500' },
  { id: 'twitter', name: 'X (Twitter)', icon: '𝕏', color: 'from-slate-700 to-slate-900' },
  { id: 'linkedin', name: 'LinkedIn', icon: '💼', color: 'from-blue-600 to-blue-800' },
  { id: 'facebook', name: 'Facebook', icon: '👤', color: 'from-blue-500 to-blue-700' },
  { id: 'tiktok', name: 'TikTok', icon: '🎵', color: 'from-slate-900 to-pink-500' },
];

const PlatformSelector = ({ selectedPlatforms, onToggle }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <h3 className="text-sm font-semibold text-slate-700 mb-4">Target Platforms</h3>
      <div className="flex flex-wrap gap-3">
        {platforms.map((platform) => {
          const isSelected = selectedPlatforms.includes(platform.id);
          return (
            <button
              key={platform.id}
              onClick={() => onToggle(platform.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                isSelected
                  ? `bg-gradient-to-r ${platform.color} text-white shadow-md scale-105`
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <span className="text-lg">{platform.icon}</span>
              {platform.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PlatformSelector;
