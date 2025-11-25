import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const MetricsCard = ({ title, value, subtitle, trend, icon: Icon, color = 'blue' }) => {
  const colorClasses = {
    blue: 'bg-blue-500/20 text-blue-300 border border-blue-500/30',
    green: 'bg-green-500/20 text-green-300 border border-green-500/30',
    purple: 'bg-purple-500/20 text-purple-300 border border-purple-500/30',
    orange: 'bg-orange-500/20 text-orange-300 border border-orange-500/30',
    pink: 'bg-pink-500/20 text-pink-300 border border-pink-500/30',
  };

  const getTrendIcon = () => {
    if (trend === 'up') return <TrendingUp className="w-4 h-4 text-green-400" />;
    if (trend === 'down') return <TrendingDown className="w-4 h-4 text-red-400" />;
    return <Minus className="w-4 h-4 text-gray-400" />;
  };

  return (
    <div className="bg-white/5 rounded-2xl border border-white/10 p-5 shadow-sm hover:shadow-md hover:bg-white/10 transition-all">
      <div className="flex items-start justify-between mb-3">
        <div className={`p-2.5 rounded-xl ${colorClasses[color]}`}>
          {Icon && <Icon className="w-5 h-5" />}
        </div>
        {trend && getTrendIcon()}
      </div>
      <div className="text-2xl font-bold text-white mb-1">{value}</div>
      <div className="text-sm font-medium text-gray-200">{title}</div>
      {subtitle && <div className="text-xs text-gray-400 mt-1">{subtitle}</div>}
    </div>
  );
};

export default MetricsCard;
