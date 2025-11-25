import React from 'react';

const SentimentGauge = ({ sentiment }) => {
  if (!sentiment) return null;

  const getSentimentConfig = (type) => {
    switch (type) {
      case 'positive':
        return { 
          color: 'from-green-400 to-emerald-500', 
          emoji: '😊', 
          position: '75%',
          bgColor: 'bg-green-50',
          textColor: 'text-green-700'
        };
      case 'negative':
        return { 
          color: 'from-red-400 to-rose-500', 
          emoji: '😔', 
          position: '25%',
          bgColor: 'bg-red-50',
          textColor: 'text-red-700'
        };
      default:
        return { 
          color: 'from-slate-400 to-slate-500', 
          emoji: '😐', 
          position: '50%',
          bgColor: 'bg-slate-50',
          textColor: 'text-slate-700'
        };
    }
  };

  const config = getSentimentConfig(sentiment.type);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <h3 className="text-sm font-semibold text-slate-700 mb-4">Sentiment Analysis</h3>
      
      <div className="relative mb-6">
        {/* Gauge background */}
        <div className="h-3 bg-gradient-to-r from-red-300 via-slate-300 to-green-300 rounded-full" />
        
        {/* Indicator */}
        <div 
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 transition-all duration-500"
          style={{ left: config.position }}
        >
          <div className="w-6 h-6 bg-white rounded-full shadow-lg border-2 border-slate-200 flex items-center justify-center text-sm">
            {config.emoji}
          </div>
        </div>
      </div>

      <div className={`${config.bgColor} rounded-xl p-4`}>
        <div className={`font-semibold capitalize ${config.textColor} mb-1`}>
          {sentiment.type}
        </div>
        <p className="text-sm text-slate-600">{sentiment.description}</p>
      </div>
    </div>
  );
};

export default SentimentGauge;
