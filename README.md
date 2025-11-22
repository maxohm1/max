# Social Media Content Analyzer

A web application that extracts text from documents (PDFs and images) for content analysis and engagement improvement suggestions.

## Features

- **Document Upload**: Supports PDF and image files (PNG, JPG, WEBP)
- **Drag & Drop Interface**: Easy file upload with drag-and-drop or file picker
- **PDF Text Extraction**: Extracts text from PDF documents while maintaining formatting
- **OCR Technology**: Uses Tesseract.js for optical character recognition on image files
- **Real-time Processing**: Visual loading states and progress indicators
- **Error Handling**: Comprehensive error messages for better user experience
- **Copy to Clipboard**: Extracted text can be easily copied for further use

## Technologies Used

- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling and responsive design
- **Tesseract.js** - OCR for image text extraction
- **PDF.js** - PDF parsing and text extraction
- **Lucide React** - Icon library

## Installation & Setup

1. Clone the repository:
```bash
git clone https://github.com/maxohm1/max.git
cd max
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── FileUpload.jsx    # Handles file upload with drag-and-drop
│   └── TextDisplay.jsx   # Displays extracted text with copy feature
├── utils/
│   └── textExtractor.js  # Core logic for PDF and image text extraction
├── App.jsx               # Main application component
└── main.jsx             # Application entry point
```

## Approach

The application leverages client-side processing to extract text from documents without server dependencies. For PDFs, PDF.js parses the document structure and extracts embedded text. For images, Tesseract.js performs OCR by analyzing pixel patterns to recognize characters. The UI is built with React for state management and component reusability, while Tailwind CSS provides a modern, responsive design. Error boundaries catch processing failures, and loading states provide user feedback during potentially lengthy OCR operations. This architecture ensures privacy (files never leave the browser), reduces infrastructure costs, and delivers instant results.

## Usage

1. Upload a PDF or image file by dragging it onto the upload area or clicking to browse
2. Wait for the processing to complete (OCR may take a few seconds for images)
3. View the extracted text in the display panel
4. Copy the text using the "Copy Text" button for further analysis

## Error Handling

- Validates file types before processing
- Displays user-friendly error messages for unsupported formats
- Handles extraction failures gracefully
- Prevents multiple simultaneous uploads

## Future Enhancements

- Support for additional file formats (DOCX, TXT)
- Text analysis and sentiment detection
- Engagement score calculation
- Multi-language OCR support
- Batch file processing

## License

MIT
