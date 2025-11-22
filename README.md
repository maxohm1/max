# Social Media Content Analyzer

A web application that extracts text from documents (PDFs and images) for content analysis and engagement improvement suggestions.

## Features

- **Document Upload**: Supports PDF and image files (PNG, JPG, WEBP)
- **Drag & Drop Interface**: Easy file upload with drag-and-drop or file picker
- **PDF Text Extraction**: Extracts text from PDF documents while maintaining formatting
- **OCR Technology**: Uses Tesseract.js for optical character recognition on image files
- **Real-time Processing**: Visual loading states and progress indicators
- **Error Handling**: Comprehensive error messages for better user experience


## TechStack Used

- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling and responsive design
- **Tesseract.js** - OCR for image text extraction
- **PDF.js** - PDF parsing and text extraction
- **Lucide React** - Icon library

## My Approach
I built a client-side application that processes documents entirely in the browser for zero server costs. PDF.js extracts text from PDFs while Tesseract.js handles OCR for images and scanned documents. React manages state and component structure, while Tailwind CSS provides modern, responsive styling.
The app features drag-and-drop uploads, loading indicators for OCR processing, error handling, and copy-to-clipboard functionality. Since everything runs locally in the browser, files never leave the user's device, processing is instant, and there's no infrastructure overhead. This approach prioritizes user privacy, simplicity, and a smooth experience without backend dependencies.

## Usage

1. Upload a PDF or image file by dragging it onto the upload area or clicking to browse
2. Wait for the processing to complete (OCR may take a few seconds for images)
3. View the extracted text in the display panel
4. Copy the text using the "Copy Text" button for further analysis

