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
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-500 to-indigo-600">
      <Header />
      
      <main className="max-w-7xl mx-auto px-8 py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Sidebar - Fixed */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24 space-y-6">
              <FileUpload onFileSelect={handleFileSelect} isProcessing={isProcessing} />

              {error && (
                <div className="p-5 bg-red-50/90 backdrop-blur-sm text-red-700 rounded-2xl border border-red-200 flex items-center gap-3 shadow-lg animate-in fade-in slide-in-from-top-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0 animate-pulse" />
                  <span className="text-sm font-medium">{error}</span>
                </div>
              )}
            </div>
          </div>

          {/* Main Content - Scrollable */}
          <div className="lg:col-span-2 space-y-6">
            {isProcessing && (
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl border border-white/40 shadow-xl p-12 text-center">
                <div className="relative inline-block mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-xl opacity-50"></div>
                  <div className="relative w-16 h-16 border-4 border-slate-200 border-t-purple-500 rounded-full animate-spin"></div>
                </div>
                <p className="text-slate-800 font-bold text-lg">Analyzing your content...</p>
                <p className="text-sm text-slate-500 mt-2">This may take a moment</p>
              </div>
            )}

            {!isProcessing && !recommendations && !extractedText && (
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl border border-white/40 shadow-xl p-12 text-center">
                <div className="relative inline-block mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 rounded-3xl blur-2xl opacity-30"></div>
                  <div className="relative w-20 h-20 bg-gradient-to-br from-purple-100 to-blue-100 rounded-3xl flex items-center justify-center">
                    <span className="text-5xl">📊</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">Ready to Analyze</h3>
                <p className="text-slate-600 max-w-md mx-auto leading-relaxed">
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
