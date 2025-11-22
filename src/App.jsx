import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import TextDisplay from './components/TextDisplay';
import { extractTextFromFile } from './utils/textExtractor';

function App() {
  const [extractedText, setExtractedText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handleFileSelect = async (file) => {
    setIsProcessing(true);
    setError(null);
    setExtractedText('');

    try {
      const text = await extractTextFromFile(file);
      setExtractedText(text);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 text-slate-900 font-sans selection:bg-blue-100">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <header className="text-center mb-12">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">
            Social Media Content Analyzer
          </h1>
          <p className="text-slate-600 max-w-lg mx-auto">
            Upload your documents or images to extract text content.
          </p>
        </header>

        <main className="space-y-8">
          <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-200">
            <FileUpload onFileSelect={handleFileSelect} isProcessing={isProcessing} />
          </div>

          {error && (
            <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
              <div className="w-2 h-2 bg-red-500 rounded-full" />
              {error}
            </div>
          )}

          {isProcessing && (
            <div className="text-center py-12">
              <div className="inline-block w-12 h-12 border-4 border-slate-300 border-t-blue-500 rounded-full animate-spin mb-4"></div>
              <p className="text-slate-600">Processing...</p>
            </div>
          )}

          <TextDisplay text={extractedText} />
        </main>
      </div>
    </div>
  );
}

export default App;
