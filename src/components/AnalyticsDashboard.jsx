import React from 'react';
import { FileText, Hash, Type, MessageSquare, Clock, Lightbulb, Target } from 'lucide-react';
import MetricsCard from './MetricsCard';
import SentimentGauge from './SentimentGauge';

const AnalyticsDashboard = ({ recommendations }) => {
  if (!recommendations) return null;

  const { metrics, hashtags, sentiment, contentType, platformRecommendations, engagementTips, postingTimes } = recommendations;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricsCard
          icon={Type}
          title="Word Count"
          value={metrics.wordCount}
          subtitle="Total words"
          color="blue"
        />
        <MetricsCard
          icon={FileText}
          title="Characters"
          value={metrics.charCount}
          subtitle="Including spaces"
          color="purple"
        />
        <MetricsCard
          icon={MessageSquare}
          title="Sentences"
          value={metrics.sentenceCount}
          subtitle="Detected"
          color="green"
        />
        <MetricsCard
          icon={Target}
          title="Content Type"
          value={contentType.icon}
          subtitle={contentType.description}
          color="orange"
        />
      </div>

      {/* Sentiment and Hashtags Row */}
      <div className="grid md:grid-cols-2 gap-6">
        <SentimentGauge sentiment={sentiment} />

        {/* Hashtags */}
        {hashtags.length > 0 && (
          <div className="bg-white/5 rounded-2xl border border-white/10 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Hash className="w-4 h-4 text-blue-400" />
              <h3 className="text-sm font-semibold text-white">Suggested Hashtags</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {hashtags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 bg-blue-500/20 text-blue-300 rounded-lg text-sm font-medium border border-blue-500/30 hover:scale-105 hover:bg-blue-500/30 transition-all cursor-pointer"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Platform Recommendations */}
      <div className="bg-white/5 rounded-2xl border border-white/10 p-6 shadow-sm">
        <h3 className="text-sm font-semibold text-white mb-4">Platform Fit Analysis</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {platformRecommendations.map((platform, index) => (
            <div
              key={index}
              className={`p-4 rounded-xl border-2 transition-all ${
                platform.status === 'optimal'
                  ? 'border-green-500/30 bg-green-500/10'
                  : platform.status === 'too-long'
                  ? 'border-red-500/30 bg-red-500/10'
                  : 'border-orange-500/30 bg-orange-500/10'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-white">{platform.platform}</span>
                <span
                  className={`text-xs font-bold px-2 py-1 rounded-full ${
                    platform.status === 'optimal'
                      ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                      : platform.status === 'too-long'
                      ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                      : 'bg-orange-500/20 text-orange-300 border border-orange-500/30'
                  }`}
                >
                  {platform.status === 'optimal' ? '✓ Optimal' : platform.status === 'too-long' ? '✗ Too Long' : '⚠ Review'}
                </span>
              </div>
              <p className="text-sm text-gray-300">{platform.recommendation}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Engagement Tips */}
      {engagementTips.length > 0 && (
        <div className="bg-amber-500/10 rounded-2xl border border-amber-500/30 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-5 h-5 text-amber-400" />
            <h3 className="text-sm font-semibold text-white">Engagement Tips</h3>
          </div>
          <div className="space-y-3">
            {engagementTips.map((tip, index) => (
              <div key={index} className="flex gap-3 items-start">
                <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center text-xs font-bold text-amber-300 flex-shrink-0 border border-amber-500/30">
                  {index + 1}
                </div>
                <div>
                  <span className="font-medium text-white">{tip.tip}: </span>
                  <span className="text-gray-300">{tip.description}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Posting Times */}
      <div className="bg-white/5 rounded-2xl border border-white/10 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-purple-400" />
          <h3 className="text-sm font-semibold text-white">Optimal Posting Times</h3>
        </div>
        <div className="flex flex-wrap gap-2 mb-3">
          {postingTimes.recommended.map((time, index) => (
            <span
              key={index}
              className="px-4 py-2 bg-purple-500/20 text-purple-300 rounded-xl text-sm font-medium border border-purple-500/30"
            >
              {time}
            </span>
          ))}
        </div>
        <p className="text-xs text-gray-400 italic">{postingTimes.note}</p>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
