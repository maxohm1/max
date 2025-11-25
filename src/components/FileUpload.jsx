import React from 'react';
import { Upload, FileType, Image as ImageIcon } from 'lucide-react';

const FileUpload = ({ onFileSelect, isProcessing }) => {
    const handleDrop = (e) => {
        e.preventDefault();
        if (isProcessing) return;

        const file = e.dataTransfer.files[0];
        if (file) validateAndPass(file);
    };

    const handleChange = (e) => {
        if (isProcessing) return;
        const file = e.target.files[0];
        if (file) validateAndPass(file);
    };

    const validateAndPass = (file) => {
        const validTypes = ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
        if (validTypes.includes(file.type)) {
            onFileSelect(file);
        } else {
            alert('Invalid file type. Please upload a PDF or Image.');
        }
    };

    return (
        <div
            className={`border-2 border-dashed rounded-2xl p-10 text-center transition-all duration-300 backdrop-blur-sm ${isProcessing
                    ? 'border-white/20 bg-white/5 cursor-not-allowed opacity-70'
                    : 'border-white/30 bg-white/5 hover:bg-white/10 hover:border-white/50 hover:shadow-2xl cursor-pointer'
                }`}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
        >
            <input
                type="file"
                id="file-upload"
                className="hidden"
                accept=".pdf,image/*"
                onChange={handleChange}
                disabled={isProcessing}
            />
            <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center gap-5">
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-xl opacity-50"></div>
                    <div className="relative p-5 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl shadow-lg">
                        <Upload size={36} className="text-white" strokeWidth={2} />
                    </div>
                </div>
                <div>
                    <h3 className="text-xl font-bold text-white mb-1">
                        {isProcessing ? 'Processing...' : 'Upload Document'}
                    </h3>
                    <p className="text-gray-300 text-sm font-medium">
                        Drag & drop or click to browse
                    </p>
                    <div className="flex items-center justify-center gap-2 mt-3">
                        <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs font-semibold border border-purple-500/30">PDF</span>
                        <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-semibold border border-blue-500/30">PNG</span>
                        <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-xs font-semibold border border-indigo-500/30">JPG</span>
                    </div>
                </div>
            </label>
        </div>
    );
};

export default FileUpload;
