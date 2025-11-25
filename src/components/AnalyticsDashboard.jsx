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
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Hash className="w-4 h-4 text-blue-500" />
              <h3 className="text-sm font-semibold text-slate-700">Suggested Hashtags</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {hashtags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 rounded-lg text-sm font-medium border border-blue-100 hover:scale-105 transition-transform cursor-pointer"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Platform Recommendations */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <h3 className="text-sm font-semibold text-slate-700 mb-4">Platform Fit Analysis</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {platformRecommendations.map((platform, index) => (
            <div
              key={index}
              className={`p-4 rounded-xl border-2 transition-all ${
                platform.status === 'optimal'
                  ? 'border-green-200 bg-green-50'
                  : platform.status === 'too-long'
                  ? 'border-red-200 bg-red-50'
                  : 'border-orange-200 bg-orange-50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-slate-800">{platform.platform}</span>
                <span
                  className={`text-xs font-bold px-2 py-1 rounded-full ${
                    platform.status === 'optimal'
                      ? 'bg-green-200 text-green-800'
                      : platform.status === 'too-long'
                      ? 'bg-red-200 text-red-800'
                      : 'bg-orange-200 text-orange-800'
                  }`}
                >
                  {platform.status === 'optimal' ? '✓ Optimal' : platform.status === 'too-long' ? '✗ Too Long' : '⚠ Review'}
                </span>
              </div>
              <p className="text-sm text-slate-600">{platform.recommendation}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Engagement Tips */}
      {engagementTips.length > 0 && (
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-5 h-5 text-amber-500" />
            <h3 className="text-sm font-semibold text-slate-700">Engagement Tips</h3>
          </div>
          <div className="space-y-3">
            {engagementTips.map((tip, index) => (
              <div key={index} className="flex gap-3 items-start">
                <div className="w-6 h-6 rounded-full bg-amber-200 flex items-center justify-center text-xs font-bold text-amber-800 flex-shrink-0">
                  {index + 1}
                </div>
                <div>
                  <span className="font-medium text-slate-800">{tip.tip}: </span>
                  <span className="text-slate-600">{tip.description}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Posting Times */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-purple-500" />
          <h3 className="text-sm font-semibold text-slate-700">Optimal Posting Times</h3>
        </div>
        <div className="flex flex-wrap gap-2 mb-3">
          {postingTimes.recommended.map((time, index) => (
            <span
              key={index}
              className="px-4 py-2 bg-purple-50 text-purple-700 rounded-xl text-sm font-medium border border-purple-100"
            >
              {time}
            </span>
          ))}
        </div>
        <p className="text-xs text-slate-500 italic">{postingTimes.note}</p>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
