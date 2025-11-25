import React from 'react';

const Recommendations = ({ recommendations }) => {
    if (!recommendations) return null;

    const { metrics, hashtags, sentiment, contentType, platformRecommendations, engagementTips, postingTimes } = recommendations;

    const getSentimentColor = (type) => {
        if (type === 'positive') return 'green';
        if (type === 'negative') return 'red';
        return 'gray';
    };

    return (
        <div className="mt-8 bg-white rounded-lg border border-gray-300 p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">📊 Content Analysis</h2>

            {/* Basic Stats */}
            <div className="mb-6 p-4 bg-gray-50 rounded border border-gray-200">
                <h3 className="font-semibold mb-3">Basic Stats:</h3>
                <div className="text-sm space-y-1">
                    <div><strong>Words:</strong> {metrics.wordCount}</div>
                    <div><strong>Characters:</strong> {metrics.charCount}</div>
                    <div><strong>Sentences:</strong> {metrics.sentenceCount}</div>
                    <div><strong>Sentiment:</strong> <span style={{color: getSentimentColor(sentiment.type)}} className="capitalize font-semibold">{sentiment.type}</span> - {sentiment.description}</div>
                </div>
            </div>

            {/* Content Type */}
            <div className="mb-6">
                <h3 className="font-semibold mb-2">Content Type: {contentType.icon} {contentType.description}</h3>
            </div>

            {/* Hashtags */}
            {hashtags.length > 0 && (
                <div className="mb-6">
                    <h3 className="font-semibold mb-2">Suggested Hashtags:</h3>
                    <div className="flex flex-wrap gap-2">
                        {hashtags.map((tag, index) => (
                            <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded text-sm">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Platform Recommendations */}
            <div className="mb-6">
                <h3 className="font-semibold mb-3">Platform Recommendations:</h3>
                <div className="space-y-2">
                    {platformRecommendations.map((platform, index) => (
                        <div key={index} className="border border-gray-300 rounded p-3 bg-gray-50">
                            <div className="font-medium mb-1">{platform.platform}: 
                                <span className={platform.status === 'optimal' ? 'text-green-600' : platform.status === 'too-long' ? 'text-red-600' : 'text-orange-500'}>
                                    {' '}{platform.status === 'optimal' ? '✓ Good' : platform.status === 'too-long' ? '✗ Too long' : '⚠ Check'}
                                </span>
                            </div>
                            <div className="text-sm text-gray-600">{platform.recommendation}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Tips */}
            {engagementTips.length > 0 && (
                <div className="mb-6">
                    <h3 className="font-semibold mb-2">💡 Tips to Improve Engagement:</h3>
                    <ul className="list-disc list-inside space-y-2 text-sm">
                        {engagementTips.map((tip, index) => (
                            <li key={index}>
                                <strong>{tip.tip}:</strong> {tip.description}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Posting Times */}
            <div>
                <h3 className="font-semibold mb-2">⏰ Best Times to Post:</h3>
                <div className="text-sm">
                    <div className="mb-1">{postingTimes.recommended.join(', ')}</div>
                    <div className="text-gray-600 text-xs italic">{postingTimes.note}</div>
                </div>
            </div>
        </div>
    );
};

export default Recommendations;
