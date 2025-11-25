import React, { useState } from 'react';
import Header from './components/Header';
import FileUpload from './components/FileUpload';
import TextDisplay from './components/TextDisplay';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import { extractTextFromFile } from './utils/textExtractor';
import { analyzeContent } from './utils/recommendationAnalyzer';

function App() {
  const [extractedText, setExtractedText] = useState('');
  const [recommendations, setRecommendations] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handleFileSelect = async (file) => {
    setIsProcessing(true);
    setError(null);
    setExtractedText('');
    setRecommendations(null);

    try {
      const text = await extractTextFromFile(file);
      setExtractedText(text);
      
      // Generate recommendations based on extracted text
      const analysis = analyzeContent(text);
      setRecommendations(analysis);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsProcessing(false);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100">
      <Header />
      
      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-2">
              <FileUpload onFileSelect={handleFileSelect} isProcessing={isProcessing} />
            </div>

            {error && (
              <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0" />
                <span className="text-sm">{error}</span>
              </div>
            )}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {isProcessing && (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
                <div className="inline-block w-12 h-12 border-4 border-slate-200 border-t-blue-500 rounded-full animate-spin mb-4"></div>
                <p className="text-slate-600 font-medium">Analyzing your content...</p>
                <p className="text-sm text-slate-400 mt-1">This may take a moment</p>
              </div>
            )}

            {!isProcessing && !recommendations && !extractedText && (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">📊</span>
                </div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">Ready to Analyze</h3>
                <p className="text-slate-500 max-w-sm mx-auto">
                  Upload a PDF or image of your social media post to get detailed analysis and recommendations.
                </p>
              </div>
            )}

            <TextDisplay text={extractedText} />
            <AnalyticsDashboard recommendations={recommendations} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
