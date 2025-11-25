# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Development Commands

```bash
# Start development server (http://localhost:5173)
npm run dev

# Build for production (outputs to dist/)
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

## Architecture Overview

This is a **client-side only** React application that extracts text from documents and provides social media content analysis. All processing happens in the browser—no backend required.

### Data Flow

1. **File Upload** → `FileUpload.jsx` validates and passes file to `App.jsx`
2. **Text Extraction** → `textExtractor.js` routes to PDF.js or Tesseract.js based on file type
3. **Content Analysis** → `recommendationAnalyzer.js` generates metrics, sentiment, hashtags, and platform recommendations
4. **Display** → `AnalyticsDashboard.jsx` renders the analysis results

### Key Utilities

**`src/utils/textExtractor.js`**
- Uses `pdfjs-dist` for PDF text extraction (page-by-page)
- Uses `tesseract.js` for OCR on images
- PDF.js worker is loaded via Vite's `?url` import pattern

**`src/utils/recommendationAnalyzer.js`**
- `analyzeContent(text)` is the main entry point returning all analysis data
- Contains keyword-based sentiment analysis, content type detection, and platform character limit checks
- All analysis is rule-based (no external API calls)

### Component Structure

- `App.jsx` - Main state management (extracted text, recommendations, processing state)
- `FileUpload.jsx` - Drag-and-drop file upload with validation
- `AnalyticsDashboard.jsx` - Orchestrates display of all analysis sub-components
- `MetricsCard.jsx`, `SentimentGauge.jsx`, `Recommendations.jsx` - Display components
