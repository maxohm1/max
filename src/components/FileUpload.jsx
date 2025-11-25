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
                    ? 'border-slate-300 bg-white/40 cursor-not-allowed opacity-70'
                    : 'border-white/60 bg-white/80 hover:bg-white hover:border-white hover:shadow-2xl cursor-pointer'
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
                    <h3 className="text-xl font-bold text-slate-800 mb-1">
                        {isProcessing ? 'Processing...' : 'Upload Document'}
                    </h3>
                    <p className="text-slate-600 text-sm font-medium">
                        Drag & drop or click to browse
                    </p>
                    <div className="flex items-center justify-center gap-2 mt-3">
                        <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">PDF</span>
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">PNG</span>
                        <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-semibold">JPG</span>
                    </div>
                </div>
            </label>
        </div>
    );
};

export default FileUpload;
