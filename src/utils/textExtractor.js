import Tesseract from 'tesseract.js';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';

// Set worker for PDF.js - using unpkg CDN for legacy build
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://unpkg.com/pdfjs-dist@5.4.394/legacy/build/pdf.worker.min.mjs';

export const extractTextFromFile = async (file) => {
    if (file.type === 'application/pdf') {
        return extractFromPdf(file);
    } else if (file.type.startsWith('image/')) {
        return extractFromImage(file);
    } else {
        throw new Error('Unsupported file type. Please upload a PDF or an image.');
    }
};

const extractFromPdf = async (file) => {
    try {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        let fullText = '';

        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            const pageText = textContent.items.map((item) => item.str).join(' ');
            fullText += `--- Page ${i} ---\n${pageText}\n\n`;
        }

        if (!fullText.trim()) {
            return 'No text found in PDF. The PDF might be image-based or empty.';
        }

        return fullText;
    } catch (error) {
        console.error("PDF Extraction Error:", error);
        console.error("Error details:", error.message, error.stack);
        throw new Error(`Failed to extract text from PDF: ${error.message}`);
    }
};

const extractFromImage = async (file) => {
    try {
        const result = await Tesseract.recognize(file, 'eng', {
            logger: (m) => console.log(m), // Optional logger
        });
        return result.data.text;
    } catch (error) {
        console.error("OCR Error:", error);
        throw new Error("Failed to extract text from image.");
    }
};
