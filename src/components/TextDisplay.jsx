import React from 'react';
import { Copy, Check } from 'lucide-react';

const TextDisplay = ({ text }) => {
    const [copied, setCopied] = React.useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (!text) return null;

    return (
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/40 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-gradient-to-r from-purple-50 to-blue-50">
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                    <span className="w-2 h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></span>
                    Extracted Content
                </h3>
                <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 rounded-lg transition-all shadow-md hover:shadow-lg"
                >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                    {copied ? 'Copied!' : 'Copy Text'}
                </button>
            </div>
            <div className="p-6 max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100">
                <pre className="whitespace-pre-wrap font-sans text-slate-700 leading-relaxed text-sm">
                    {text}
                </pre>
            </div>
        </div>
    );
};

export default TextDisplay;
