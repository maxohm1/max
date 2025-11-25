// Simple content analyzer for social media posts

export const analyzeContent = (text) => {
    if (!text || text.trim().length === 0) {
        return null;
    }

    const cleanText = text.trim();
    const words = cleanText.split(/\s+/);
    const wordCount = words.length;
    const charCount = cleanText.length;
    const sentences = cleanText.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const sentenceCount = sentences.length;

    const hashtags = getHashtags(cleanText);
    const sentiment = checkSentiment(cleanText);
    const platformRecommendations = checkPlatforms(charCount, wordCount);
    const contentType = getContentType(cleanText);
    const engagementTips = getTips(cleanText);
    const postingTimes = getPostingTimes(contentType);

    return {
        metrics: {
            wordCount,
            charCount,
            sentenceCount
        },
        hashtags,
        sentiment,
        contentType,
        platformRecommendations,
        engagementTips,
        postingTimes
    };
};

// Get hashtag suggestions from text
const getHashtags = (text) => {
    const words = text.toLowerCase().split(/\s+/);
    const stopWords = ['that', 'this', 'with', 'from', 'have', 'been', 'will', 'your', 'more', 'about', 'their', 'which'];
    
    // Count word frequency
    const wordCount = {};
    words.forEach(word => {
        const clean = word.replace(/[^a-z]/g, '');
        if (clean.length > 4 && !stopWords.includes(clean)) {
            wordCount[clean] = (wordCount[clean] || 0) + 1;
        }
    });

    // Get top 5 words
    const topWords = Object.keys(wordCount)
        .sort((a, b) => wordCount[b] - wordCount[a])
        .slice(0, 5)
        .map(word => '#' + word.charAt(0).toUpperCase() + word.slice(1));

    return topWords;
};

// Check if text is positive, negative, or neutral
const checkSentiment = (text) => {
    const positiveWords = ['good', 'great', 'excellent', 'amazing', 'wonderful', 'awesome', 'love', 'happy', 'best', 'perfect'];
    const negativeWords = ['bad', 'terrible', 'awful', 'horrible', 'worst', 'hate', 'sad', 'angry', 'problem', 'wrong'];

    const lower = text.toLowerCase();
    let positive = 0;
    let negative = 0;

    positiveWords.forEach(word => {
        if (lower.includes(word)) positive++;
    });

    negativeWords.forEach(word => {
        if (lower.includes(word)) negative++;
    });

    if (positive > negative) {
        return { type: 'positive', score: positive, description: 'Positive tone' };
    } else if (negative > positive) {
        return { type: 'negative', score: negative, description: 'Negative tone' };
    } else {
        return { type: 'neutral', score: 0, description: 'Neutral tone' };
    }
};

// Check if content fits different platforms
const checkPlatforms = (charCount, wordCount) => {
    return [
        {
            platform: 'Twitter/X',
            status: charCount <= 280 ? 'optimal' : 'too-long',
            recommendation: charCount <= 280 
                ? 'Good for Twitter!' 
                : `Too long for Twitter (max 280 chars)`,
            idealRange: 'Best: 71-100 characters'
        },
        {
            platform: 'Facebook',
            status: charCount <= 400 ? 'optimal' : 'acceptable',
            recommendation: charCount <= 80 
                ? 'Short posts work best on Facebook'
                : 'Okay for Facebook',
            idealRange: 'Best: 40-80 characters'
        },
        {
            platform: 'Instagram',
            status: charCount <= 2200 ? 'optimal' : 'too-long',
            recommendation: charCount <= 2200
                ? 'Works for Instagram'
                : 'Too long for Instagram',
            idealRange: 'Best: 138-150 characters'
        },
        {
            platform: 'LinkedIn',
            status: wordCount >= 50 && wordCount <= 100 ? 'optimal' : 'adjust',
            recommendation: wordCount < 50
                ? 'Add more content for LinkedIn'
                : 'Good for LinkedIn',
            idealRange: 'Best: 50-100 words'
        }
    ];
};

// Figure out what type of content this is
const getContentType = (text) => {
    const lowerText = text.toLowerCase();
    
    if (lowerText.match(/\b(sale|discount|offer|deal|buy|purchase|shop)\b/g)) {
        return { type: 'promotional', icon: '🎯', description: 'Promotional/Sales content' };
    } else if (lowerText.match(/\b(how to|guide|tutorial|learn|tips|steps)\b/g)) {
        return { type: 'educational', icon: '📚', description: 'Educational content' };
    } else if (lowerText.match(/\b(story|experience|journey|happened|moment)\b/g)) {
        return { type: 'storytelling', icon: '📖', description: 'Storytelling content' };
    } else if (lowerText.match(/\b(news|announced|update|breaking|report)\b/g)) {
        return { type: 'news', icon: '📰', description: 'News/Update content' };
    } else if (lowerText.match(/[?]/g)) {
        return { type: 'engagement', icon: '💬', description: 'Engagement/Question content' };
    } else {
        return { type: 'general', icon: '✍️', description: 'General content' };
    }
};

// Get tips to improve the post
const getTips = (text) => {
    const tips = [];

    // Check for questions
    if (!text.includes('?')) {
        tips.push({
            tip: 'Ask a question',
            description: 'Questions get more comments'
        });
    }

    // Check for call-to-action
    const hasAction = text.toLowerCase().includes('comment') || text.toLowerCase().includes('share') || text.toLowerCase().includes('like');
    if (!hasAction) {
        tips.push({
            tip: 'Add a call-to-action',
            description: 'Tell people to comment or share'
        });
    }

    // Check for emojis
    const hasEmoji = /[\u{1F300}-\u{1F9FF}]/u.test(text);
    if (!hasEmoji) {
        tips.push({
            tip: 'Use emojis',
            description: 'Emojis make posts more engaging'
        });
    }

    return tips.slice(0, 3);
};

// Suggest best times to post
const getPostingTimes = (contentType) => {
    const baseTimes = {
        promotional: ['9-11 AM', '1-2 PM (weekdays)'],
        educational: ['10 AM-12 PM', '7-9 PM'],
        news: ['8-9 AM', '5-6 PM'],
        engagement: ['12-1 PM', '5-6 PM'],
        general: ['9 AM-12 PM', '5-7 PM']
    };

    return {
        recommended: baseTimes[contentType.type] || baseTimes.general,
        note: 'Timing varies by audience. Test and adjust based on your analytics.'
    };
};
