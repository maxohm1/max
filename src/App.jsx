import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import TextDisplay from './components/TextDisplay';
import { extractTextFromFile } from './utils/textExtractor';
import { FileText, Sparkles } from 'lucide-react';

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
          <div className="inline-flex items-center justify-center p-3 bg-white rounded-2xl shadow-sm mb-6 border border-slate-100">
            <div className="bg-blue-600 p-2 rounded-xl text-white mr-3">
              <FileText size={24} />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Social Media Content Analyzer
            </h1>
          </div>
          <p className="text-slate-500 max-w-lg mx-auto text-lg">
            Upload your documents or images to instantly extract and analyze text content.
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
            <div className="text-center py-12 animate-pulse">
              <div className="inline-block p-4 bg-white rounded-full shadow-sm mb-4">
                <Sparkles className="text-blue-500 animate-spin" size={32} />
              </div>
              <p className="text-slate-500 font-medium">Analyzing your document...</p>
              <p className="text-slate-400 text-sm mt-1">This might take a moment</p>
            </div>
          )}

          <TextDisplay text={extractedText} />
        </main>

        <footer className="mt-20 text-center text-slate-400 text-sm">
          <p>© 2024 Social Media Analyzer. Built with React & Tailwind.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
