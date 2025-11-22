import React, { useCallback } from 'react';
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
            className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${isProcessing
                    ? 'border-gray-300 bg-gray-50 cursor-not-allowed opacity-70'
                    : 'border-blue-400 hover:border-blue-600 hover:bg-blue-50 cursor-pointer'
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
            <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center gap-4">
                <div className="p-4 bg-blue-100 rounded-full text-blue-600">
                    <Upload size={32} />
                </div>
                <div>
                    <h3 className="text-xl font-semibold text-gray-800">
                        {isProcessing ? 'Processing...' : 'Upload your document'}
                    </h3>
                    <p className="text-gray-500 mt-2">
                        Drag and drop or click to browse
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                        Supports PDF, PNG, JPG
                    </p>
                </div>
            </label>
        </div>
    );
};

export default FileUpload;
